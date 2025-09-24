import express from 'express';
import "dotenv/config";
import cors from "cors";
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouer from './routes/bookingRoutes.js';

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

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));