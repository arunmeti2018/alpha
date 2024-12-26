import express from "express";
import { createServer } from "http"
import cors from "cors"
import { rateLimit } from "express-rate-limit"
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/MessageRoutes.js"
import cookieParser from "cookie-parser"
import ejs from "ejs"
import path from "path"
import { fileURLToPath } from 'url';
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

app.use(limiter)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser())
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));

app.use(cors({
    origin: '*',  // Frontend origin (update if needed) // Allowed methods
    credentials: true,  // Allow cookies to be sent with requests
}));

app.use("/auth", authRoutes);
app.use("/message", messageRoutes)
app.get("*", (req, res) => {
    res.render("404")
})

export { httpServer }