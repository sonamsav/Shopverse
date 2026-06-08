import express from 'express';
import { login, register, reVerify, verify, logout, forgetPassword, verifyOtp, changePassword, allUser, getUserById, updateUser, getCurrentUser } from '../controller/userController.js';
import { isAuthenticated , isAdmin} from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

router.post('/register', register)
router.post('/verify', verify)
router.post('/reverify', reVerify)
router.post('/login', login)
router.post('/logout', isAuthenticated, logout)
router.post('/forgot-password', forgetPassword)
router.post('/verify-otp/:email', verifyOtp)
router.post('/change-password/:email', changePassword)
router.get('/all-users', isAuthenticated, isAdmin, allUser)
router.put('/update/:id',isAuthenticated, singleUpload, updateUser)
router.get("/me", isAuthenticated, getCurrentUser);














export default router;