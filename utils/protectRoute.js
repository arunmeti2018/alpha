import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).send({
            success: false,
            message: 'Unauthorized'
        })
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;

        next();
    } catch (error) {
        logger.error("token verification failed", error)
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid or expired token",
        });
    }
}

export default protectRoute