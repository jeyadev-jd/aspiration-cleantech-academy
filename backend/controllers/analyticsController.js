import Lead from '../models/Lead.js';
import Service from '../models/Service.js';
import Academy from '../models/Academy.js';

// @desc    Get dashboard summary analytics
// @route   GET /api/analytics/summary
// @access  Private/Admin
export const getAnalyticsSummary = async (req, res, next) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const totalServices = await Service.countDocuments();
    const activeServices = await Service.countDocuments({ status: 'active' });
    const totalCourses = await Academy.countDocuments();
    const publishedCourses = await Academy.countDocuments({ isPublished: true });

    // Recent leads
    const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      summary: {
        totalLeads,
        totalServices,
        activeServices,
        totalCourses,
        publishedCourses
      },
      recentLeads
    });
  } catch (error) {
    next(error);
  }
};
