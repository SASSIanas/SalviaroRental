import express from 'express';
import "dotenv/config";
import cors from "cors";
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouer from './routes/bookingRoutes.js';
import contactRouter from './routes/contactRouter.js';
// server.js (إضافة هذا السطر مع باقي الـ imports)
import testimonialRouter from './routes/testimonialRoutes.js';

// instalize ecpress app
const app = express()

// connect db
await connectDB()

// midleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=> res.send("Server is running"))
app.use('/api/user', userRouter)
app.use('/api/owner', ownerRouter)
app.use('/api/bookings', bookingRouer)
app.use('/api/contact', contactRouter)


// إضافة هذا السطر مع باقي الـ app.use
app.use('/api/testimonials', testimonialRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));