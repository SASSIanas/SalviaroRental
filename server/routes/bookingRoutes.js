import express from 'express'
import { changeBookingStatus, checkAvailabilityOfCar, createBooking, getOwnerBookings, getUserBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const bookingRouer = express.Router();

bookingRouer.post('/check-availability', checkAvailabilityOfCar)
bookingRouer.post('/create', protect, createBooking)
bookingRouer.get('/user', protect, getUserBookings)
bookingRouer.get('/owner', protect, getOwnerBookings)
bookingRouer.post('/change-status', protect, changeBookingStatus)

export default bookingRouer;