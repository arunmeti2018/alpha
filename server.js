
import { httpServer } from "./app.js"
import connectionDb from "./config/db.js";
import logger from "./loggers/winston.js"
import dotenv from "dotenv"



dotenv.config({
    path: "./.env"
})


const PORT = process.env.PORT || 3000;
//database connected
connectionDb();


httpServer.listen(PORT, (err) => {
    if (!err)
        logger.info("Server is running on port " + PORT);
    else
        logger.error("server connection failed");
})