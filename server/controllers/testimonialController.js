// controllers/testimonialController.js
import Testimonial from "../models/Testimonial.js";
import User from "../models/User.js";

// الحصول على التقييمات
export const getTestimonials = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * limit;

        const testimonials = await Testimonial.find()
            .populate('user', 'name image')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Testimonial.countDocuments();
        const hasMore = page * limit < total;

        res.json({ 
            success: true, 
            testimonials,
            hasMore,
            currentPage: page
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// إضافة تقييم جديد
export const addTestimonial = async (req, res) => {
    try {
        const { testimonial, rating, } = req.body;

        if (!testimonial || !rating ) {
            return res.json({ success: false, message: 'All fields are required' });
        }

        // التأكد من أن المستخدم مسجل دخول
        if (!req.user) {
            return res.json({ success: false, message: 'You must log in first' });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.json({ success: false, message: 'User not found'  });
        }

        const newTestimonial = await Testimonial.create({
            name: user.name,
            // location,
            image: user.image,
            testimonial,
            rating,
            user: user._id
        });

        res.json({ 
            success: true, 
            message: 'Testimonial added successfully',
            testimonial: newTestimonial 
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};