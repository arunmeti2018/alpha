import logger from "../loggers/winston.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"

import { generateToken } from "../utils/generateToken.js";
const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "please fill in all fields"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "password should be at least 6 characters long"
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "user already exists"
            })
        }

        const newUser = new User({
            fullName,
            email,
            password

        })
        if (!newUser) {
            return res.status(400).json({
                success: false,
                message: "Failed to create user"
            })
        }
        generateToken(newUser._id, res);
        newUser.save();
        res.status(201).json({
            success: true,
            message: "user created successfully",
            fullName: newUser.fullName,
            email: newUser.email,
            profile: newUser.profile
        })

    } catch (error) {

        logger.error("signup error " + error.message)
        res.status(500).json({
            success: false,
            message: "signup failed"


        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(406).json({
                success: false,
                message: "All fields  are required"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        user.password = null;
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "invalid  Credentials"
            })
        }

        generateToken(user._id, res);
        res.status(200).json({
            success: true,
            message: "login successfull",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profile: user.profile
            }
        })

    } catch (error) {
        logger.error("login route failed " + error.message);
        res.status(500).json({
            success: false,
            message: "login failed"
        })
    }
}

const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(0), // Clear cookie
    });

    res.status(200).json({
        success: true,
        message: "Logout successful",
    });
};


export { signup, login ,logout}