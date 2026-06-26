import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Academy from './models/Academy.js';

dotenv.config();

const courses = [
  {
    title: 'HVAC',
    description: 'Hands-on HVAC installation, maintenance, and repair training over 3 months (12 weeks), covering residential and commercial systems.',
    price: 25000,
    category: 'Technical',
    imageUrl: '/img/service/hvac.jpg'
  },
  {
    title: 'Entrepreneurship',
    description: 'A 2-month (8 week) program covering business planning, funding, and go-to-market strategy for first-time founders.',
    price: 18000,
    category: 'Business',
    imageUrl: '/img/academy/entrepreneur.jpg'
  },
  {
    title: 'Digital Marketing',
    description: 'Practical digital marketing training across SEO, paid ads, and social media, spanning 2.5 months (10 weeks).',
    price: 20000,
    category: 'Marketing',
    imageUrl: '/img/academy/digitalmarketing.jpg'
  },
  {
    title: 'Sales Executive',
    description: 'A focused 6-week sales training program covering pitching, negotiation, and CRM tools for entry-level sales roles.',
    price: 12000,
    category: 'Sales',
    imageUrl: '/img/academy/sales-executive.webp'
  },
  {
    title: 'Business Development',
    description: 'A 2-month (8 week) program building skills in partnerships, lead generation, and account growth strategy.',
    price: 18000,
    category: 'Business',
    imageUrl: '/img/academy/business-development.webp'
  }
];

const seedAcademy = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/aspire');
    console.log('Connected to DB');

    await Academy.deleteMany({});
    await Academy.insertMany(courses);

    console.log(`Seeded ${courses.length} academy courses.`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding academy courses:', error);
    process.exit(1);
  }
};

seedAcademy();
