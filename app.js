import express from "express";
import { createServer } from "http"
import cors from "cors"
import { rateLimit } from "express-rate-limit"
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/MessageRoutes.js"
import cookieParser from "cookie-parser"
const app = express();
const httpServer = createServer(app);



// Rate limiter to avoid misuse of the service and avoid cost spikes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5000, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    keyGenerator: (req, res) => {
        return req.clientIp; // IP address from requestIp.mw(), as opposed to req.ip
    },
    handler: (_, __, ___, options) => {
        throw new ApiError(
            options.statusCode || 500,
            `There are too many requests. You are only allowed ${options.max
            } requests per ${options.windowMs / 60000} minutes`
        );
    },
});
app.use(express.json())
app.use(limiter)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(cors({
    origin: 'http://locahost:5500',  // Frontend origin (update if needed) // Allowed methods
    credentials: true,  // Allow cookies to be sent with requests
}));

app.use("/auth", authRoutes);
app.use("/message", messageRoutes)
app.get("/", (req, res) => {
    res.redirect("signup")
})

export { httpServer }