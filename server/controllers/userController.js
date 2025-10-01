import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Car from "../models/Car.js"

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