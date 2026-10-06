import express from 'express';
import {
    registerUser,
    loginUser,
    getUser
} from '../controller/authController.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', protect, admin, getUser);




export default router;

