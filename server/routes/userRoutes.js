// فـuserRoutes.js
import express from 'express'
import { 
    getCarById, 
    getCars, 
    getUserData, 
    loginUser, 
    registerUser, 
    updateUserName, 
    updateUserPassword,
    getUserById,      // تأكد أن هادي موجودة
    getAllOwners,     // وهادي كمان
    getOwnerCars      // وهادي
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', protect, getUserData)
userRouter.get('/cars/:id', getCarById) 
userRouter.get('/cars', getCars)
userRouter.put('/update-name', protect, updateUserName)
userRouter.put('/update-password', protect, updateUserPassword)

// ⚠️ تأكد أن هاد Routes موجودين
userRouter.get('/:id', getUserById)                    // هادي خاصها تكون موجودة
userRouter.get('/owners/all', getAllOwners)           // وهادي
userRouter.get('/owner-cars/:ownerId', getOwnerCars)  // وهادي

export default userRouter;