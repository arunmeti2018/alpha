import logger from "../loggers/winston.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"

import { generateToken } from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js";
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

const updateProfile = async (req, res) => {

    try {
        const { profilePic } = req.body;

        if (!profilePic) {
            return res.status(400).json({
                success: false,
                message: "Please upload a profile picture"
            })
        }
        const uploadedResponse = await cloudinary.uploader.upload(profilePic, {
            resource_type: "image", // Ensure only images are uploaded
            folder: "Alpha", // Optional: organize uploads into folders
        });
        if (!uploadedResponse || !uploadedResponse.secure_url) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload image to Cloudinary"
            });
        }
        const updatedUser = await User.findByIdAndUpdate(req.user._id, { profilePic: uploadedResponse.secure_url }, { new: true }).select("-password")


        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        })


    } catch (error) {
        logger.error("uploading profiled pic failed" + error.message)
        res.status(500).json({
            success: false,
            message: "Failed to update profile"
        })
    }

}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "user found",
            user: user
        })

    } catch (error) {
        logger.error("failed to get user " + error.message)
        res.status(500).json({
            success: false,
            message: "Failed to get user"
        })
    }
}
export { signup, login, logout, updateProfile, getUser }