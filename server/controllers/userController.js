import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Car from "../models/Car.js"

import mongoose from 'mongoose'; // ⚠️ زيد هادي لفوق


// generate jwt token
const generateToken = (userId)=>{
    const payload = userId
    return jwt.sign(payload, process.env.JWT_SECRET)
}

// register user
// register user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, rentalBusinessName, rentalAddress } = req.body

        if (!name || !email || !password || password.length < 8) {
            return res.json({ success: false, message: 'fill all the fields' })
        }

        // If registering as owner, validate business fields
        if (role === 'owner') {
            if (!rentalBusinessName || !rentalAddress) {
                return res.json({ success: false, message: 'Rental business name and address are required for owners' })
            }
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.json({ success: false, message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const userData = {
            name, 
            email, 
            password: hashedPassword,
            role: role || 'user'
        }

        // Add rental business info if registering as owner
        if (role === 'owner') {
            userData.rentalBusinessName = rentalBusinessName
            userData.rentalAddress = rentalAddress
        }

        const user = await User.create(userData)
        const token = generateToken(user._id.toString())
        res.json({success: true, token})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// login user
export const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.json({success: false, message: "User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false, message: "invalid credentials"})
        }
        const token = generateToken(user._id.toString())
        res.json({success: true, token})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// get user data using token (JWT)
export const getUserData = async (req,res)=>{
    try{
        const {user} = req;
        res.json({success: true, user})
    } catch (error){
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// get all cars for th frontend
export const getCars = async (req,res)=>{
    try {
        const cars = await Car.find({isAvaliable: true})
        res.json({success: true, cars})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// api to update user name
export const updateUserName = async (req, res) => {
    try {
        const { _id } = req.user;
        const { name } = req.body;

        if (!name) {
            return res.json({ success: false, message: 'Name is required' });
        }

        await User.findByIdAndUpdate(_id, { name });
        res.json({ success: true, message: 'Name updated successfully' });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
// get car by id
export const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);
        
        if (!car) {
            return res.json({ success: false, message: 'Car not found' });
        }

        res.json({ success: true, car });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
// api to update user password
export const updateUserPassword = async (req, res) => {
    try {
        const { _id } = req.user;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.json({ success: false, message: 'All password fields are required' });
        }

        if (newPassword.length < 8) {
            return res.json({ success: false, message: 'New password must be at least 8 characters long' });
        }

        const user = await User.findById(_id);
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(_id, { password: hashedPassword });

        res.json({ success: true, message: 'Password updated successfully' });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        
        console.log('Fetching user with ID:', id); // Debug
        
        // تحقق إذا الID صحيح
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({ success: false, message: 'Invalid user ID' });
        }

        const user = await User.findById(id).select('-password');
        
        if (!user) {
            console.log('User not found in database');
            return res.json({ success: false, message: 'User not found' });
        }

        console.log('User found:', user.name);
        res.json({ success: true, user });
    } catch (error) {
        console.log('Error in getUserById:', error.message);
        res.json({ success: false, message: error.message });
    }
}

// Get all owners
export const getAllOwners = async (req, res) => {
    try {
        const owners = await User.find({ role: 'owner' })
            .select('-password')
            .sort({ createdAt: -1 });

        console.log('Found owners:', owners.length);
        res.json({ success: true, owners });
    } catch (error) {
        console.log('Error in getAllOwners:', error.message);
        res.json({ success: false, message: error.message });
    }
}

// Get owner's cars
export const getOwnerCars = async (req, res) => {
    try {
        const { ownerId } = req.params;
        
        console.log('Fetching cars for owner:', ownerId);
        
        if (!mongoose.Types.ObjectId.isValid(ownerId)) {
            return res.json({ success: false, message: 'Invalid owner ID' });
        }

        const cars = await Car.find({ 
            owner: ownerId, 
            isAvaliable: true 
        }).sort({ createdAt: -1 });
        
        console.log('Found cars:', cars.length);
        res.json({ success: true, cars });
    } catch (error) {
        console.log('Error in getOwnerCars:', error.message);
        res.json({ success: false, message: error.message });
    }
}