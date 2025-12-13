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
    getUserById,      
    getAllOwners,    
    getOwnerCars     
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


userRouter.get('/:id', getUserById)                   
userRouter.get('/owners/all', getAllOwners)       
userRouter.get('/owner-cars/:ownerId', getOwnerCars) 

export default userRouter;