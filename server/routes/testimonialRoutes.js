// routes/testimonialRoutes.js
import express from 'express';
import { getTestimonials, addTestimonial } from '../controllers/testimonialController.js';
import { protect } from '../middleware/auth.js';

const testimonialRouter = express.Router();

testimonialRouter.get('/', getTestimonials);
testimonialRouter.post('/', protect, addTestimonial); // محمي - يحتاج تسجيل دخول

export default testimonialRouter;