import jwt from "jsonwebtoken"

export const generateToken = async (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_KEY, { expiresIn: "7d" });

        res.cookie("token", token, {

            maxAge: 3 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        })
        return token
    } catch (error) {
        console.error("Error generating token:", error);
        res.status(500).send("Internal server error");
    }
}

