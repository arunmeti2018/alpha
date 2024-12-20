import logger from "../loggers/winston.js";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs"
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

        const newUser = await User.create({
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
        res.status(201).json({
            success: true,
            message: "user created successfully",
            fullName: newUser.fullName,
            email: newUser.email
        })

    } catch (error) {

        logger.error("signup error " + error.message)
        res.status(500).json({
            success: false,
            message: "signup failed"


        })
    }
}

export { signup }