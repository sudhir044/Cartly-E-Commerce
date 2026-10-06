import User from "./model/User.js"
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";


const generateToken = (userId) => {
    return JWT.sign({
        _id: userId
    }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
}

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // TODOS : HASH the password before saving to the database 
        // TODOS : implement JWT token generation for the authentication 
        //TODOS: OTP sending and verification for the email 
        // TODOS : WELCOME mail


        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const user = User.create({ name, email, hashPassword });
        if (user) {
            const opt = Math.floor(100000 + Math.random() * 900000).toString();

            const message = `
            wellcome ${user.name}, 
            welcome to our Cartly website. 
            Your OTP is ${opt}. please verify yourself`

            await sendEmail(user.email, "OTP Verification", message);
            res.status(200).json({
                success: true,
                message: "User registered successfully, please verify your email",
                token: generateToken(user._id),
                user: user
            })
        }
        else {
            res.status(400).json({
                success: false,
                message: "Failed to register user"
            })
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: generateToken(user._id),
            user: user
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const getUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        if (!users) {
            return res.status(404).json({
                message: "No user found"
            })
        }
        res.status(200).json({
            success: true,
            users
        })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

module.export = {
    registerUser,
    loginUser,
    getUser
}