import { error } from "console";
import imagekit from "../configs/imageKit.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from 'fs'
import Booking from "../models/Booking.js";

// api to change role of user
export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: "owner" })
        res.json({ success: true, message: "Now you can list cars" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


// api to update car details
export const updateCar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId, ...updateData } = JSON.parse(req.body.carData || '{}');
        const imageFile = req.file;

        // Find the car
        const car = await Car.findById(carId);

        // Check if car exists and belongs to the user
        if (!car) {
            return res.json({ success: false, message: 'Car not found' });
        }

        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: 'Unauthorized' });
        }

        // Prepare update object
        const updateObject = { ...updateData };

        // If there's a new image, upload and update
        if (imageFile) {
            const fileBuffer = fs.readFileSync(imageFile.path);
            const response = await imagekit.upload({
                file: fileBuffer,
                fileName: imageFile.originalname,
                folder: '/cars'
            });

            var optimizedImageUrl = imagekit.url({
                path: response.filePath,
                transformation: [
                    { width: '1280' },
                    { quality: 'auto' },
                    { format: 'webp' }
                ]
            });

            updateObject.image = optimizedImageUrl;
        }

        // Update the car
        const updatedCar = await Car.findByIdAndUpdate(
            carId,
            updateObject,
            { new: true } // Return the updated document
        );

        res.json({ 
            success: true, 
            message: 'Car updated successfully',
            car: updatedCar 
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// api to list car
export const addCar = async (req, res) => {
    try {
        const { _id } = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        // Get user to include rental business info
        const user = await User.findById(_id);
        
        // upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })

        // optimization through imagekit url transformation
        var optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '1280' },// width resizing
                { quality: 'auto' },// auto compression
                { format: 'webp' }// convert to moderd format
            ]
        });

        const image = optimizedImageUrl;
        
        // Include rental business name and address
        await Car.create({ 
            ...car, 
            owner: _id, 
            image,
            rentalBusinessName: user.rentalBusinessName || 'Private Owner',
            rentalAddress: user.rentalAddress || '' // إضافة العنوان
        })

        res.json({ success: true, message: 'Car Added' })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
// api to list owner car

export const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user;
        const cars = await Car.find({ owner: _id })
        res.json({ success: true, cars })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
// api to toggle car availability
export const toggleCarAvailability = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body
        const car = await Car.findById(carId)

        //cheking is car belongs to the user
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: 'Unauthorized' })
        }
        car.isAvaliable = !car.isAvaliable;
        await car.save()

        res.json({ success: true, message: 'Availability Toggled' })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
// api to delete a car

export const deleteCar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body
        const car = await Car.findById(carId)

        //cheking is car belongs to the user
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: 'Unauthorized' })
        }

        car.owner = null;
        car.isAvaliable = false;

        await car.save()

        res.json({ success: true, message: 'Car Removed' })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to get dashboard data
export const getDashboardData = async (req, res) => {
    try {
        const { _id, role } = req.user;
        if (role !== 'owner') {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const cars = await Car.find({ owner: _id });
        const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 });

        const pendingBookings = await Booking.find({ owner: _id, 
        status: "pending" })
        const completedBookings = await Booking.find({ owner: _id, 
        status: "confirmed" })

        // calculate monthlyrevenue from bookings where status is confirmed
        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking) => acc + booking.price, 0)

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0,3),
            monthlyRevenue,
        }
        res.json({success: true, dashboardData });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//api to update user image

export const updateUserImage = async (req,res)=>{
    try {
        const {_id} = req.user;

        const imageFile = req.file;

        // upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })

        // optimization through imagekit url transformation
        var optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '400' },// width resizing
                { quality: 'auto' },// auto compression
                { format: 'webp' }// convert to moderd format
            ]
        });

        const image = optimizedImageUrl;

        await User.findByIdAndUpdate(_id,{image});
        res.json({success: true, message: 'Image Updated'})
        

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to update business info
export const updateBusinessInfo = async (req, res) => {
    try {
        const { _id } = req.user;
        const { rentalBusinessName, rentalAddress } = req.body;

        if (!rentalBusinessName) {
            return res.json({ success: false, message: 'Business name is required' });
        }

        // Update user business info
        await User.findByIdAndUpdate(_id, { 
            rentalBusinessName,
            rentalAddress 
        });

        // Update all cars belonging to this owner with new business info
        await Car.updateMany(
            { owner: _id },
            { 
                rentalBusinessName,
                rentalAddress 
            }
        );

        res.json({ success: true, message: 'Business information updated successfully for all your cars' });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}