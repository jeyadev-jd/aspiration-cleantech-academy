import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import logger from '../utils/logger.js';

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '12h',
  });
};

async function verifyTurnstile(token, ip) {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    // Not configured yet: skip verification rather than lock admins out.
    return true;
  }
  if (!token) return false;

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }),
    });
    const data = await res.json();
    return data.success === true;
  } catch (error) {
    logger.error(`Turnstile verification request failed: ${error.message}`);
    return false;
  }
}

export const loginAdmin = async (req, res, next) => {
  const { email, password, turnstileToken } = req.body;

  try {
    const captchaOk = await verifyTurnstile(turnstileToken, req.ip);
    if (!captchaOk) {
      logger.warn(`Turnstile verification failed for login attempt: ${email} - ${req.ip}`);
      res.status(400);
      return next(new Error('Captcha verification failed. Please try again.'));
    }

    const admin = await Admin.findOne({ email });

    // Always run a bcrypt comparison even when the admin doesn't exist, so response
    // timing doesn't leak whether an email is registered (timing-attack resistance).
    const isMatch = admin ? await admin.comparePassword(password) : await Promise.resolve(false);

    if (!admin) {
      res.status(401);
      return next(new Error('Invalid email or password'));
    }

    if (admin.isLocked()) {
      const minutesLeft = Math.ceil((admin.lockUntil.getTime() - Date.now()) / 60000);
      logger.warn(`Login attempt on locked admin account: ${email} - ${req.ip}`);
      res.status(423);
      return next(new Error(`Account locked due to repeated failed logins. Try again in ${minutesLeft} minute(s).`));
    }

    if (!isMatch) {
      admin.failedLoginAttempts += 1;
      if (admin.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
        admin.lockUntil = new Date(Date.now() + LOCK_DURATION_MS);
        admin.failedLoginAttempts = 0;
        logger.warn(`Admin account locked after repeated failed logins: ${email} - ${req.ip}`);
      }
      await admin.save();
      res.status(401);
      return next(new Error('Invalid email or password'));
    }

    // Successful login: reset failure tracking
    admin.failedLoginAttempts = 0;
    admin.lockUntil = null;
    await admin.save();

    logger.info(`Admin login success: ${email} - ${req.ip}`);
    res.json({
      _id: admin._id,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } catch (error) {
    next(error);
  }
};
