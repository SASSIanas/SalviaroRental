// models/Testimonial.js
import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    
    image: { type: String, default: '' },
    testimonial: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;