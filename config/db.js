import mongoose from "mongoose";
import logger from "../loggers/winston.js";



const connectionDb = async () => {
    try {

        const connectionInstance = await mongoose.connect(
            `${process.env.MONGO_URl}/${process.env.DB_NAME}`);

        logger.info(`\n☘️  MongoDB Connected! Db host: ${connectionInstance.connection.host}\n`);
    } catch (error) {
        logger.error("❌ MongoDB connection failed. Error: " + error.message);
        process.exit(1);
       
    }
};



export default connectionDb 