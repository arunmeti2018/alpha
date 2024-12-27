import Message from "../models/messageModel.js"
import User from "../models/userModel.js";
import logger from "../loggers/winston.js"
const getUsersForSidebar = async (req, res) => {
    try {
        const myId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: myId } }).select("-password")

        if (!filteredUsers || filteredUsers.length === 0) {
            return res.status(404).json({ success: false, message: "No users found" })
        }
        res.status(200).json({
            success: true,
            message: "fetched all the users ",
            users: filteredUsers
        })
    } catch (error) {
        logger.error("error in getuserfor sidebar controller" + error.message)
        res.json(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}
const getMessage = async (req, res) => {
    try {
        const { id: chatToSendId } = req.params;
        if (!chatToSendId) {
            return res.status(400).json({ success: false, message: "Chat id is required" });
        }
        const myId = req.user._id;
        logger.info(chatToSendId, myId)

        const messages = await Message.find({
            $or: [
                { receiverId: chatToSendId, senderId: myId },
                { receiverId: myId, senderId: chatToSendId }
            ]
        });

        if (!messages) {
            return res.status(404).json({
                success: false,
                message: "No messages found"
            });
        }

        res.status(200).json({
            success: true,
            message: "all messages fetched succesfully",
            messages: messages
        })
    } catch (error) {
        logger.error("error in getmessage controller " + error.message)
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }


}

const sendMessage = async (req, res) => {
    try {
        const { id: chatToSendId } = req.params;
        const myId = req.user._id
        const { text, image } = req.body
        let imageUrl;
        if (image) {

            const imageUpload = await cloudinary.uploader.upload(image)
            imageUrl = imageUpload.secure_url
        }
        if (!text && !image) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            })
        }

        const message = new Message({
            senderId: myId,
            receiverId: chatToSendId,
            text,
            image: imageUrl
        })
        await message.save();
        if (!message) {
            return res.status(502).json({
                success: false,
                message: "Message not sent"
            })
        }

        //todo realtime messages sockets
        res.status(200).json({
            success: true,
            message: "message sent successfully",
            message
        })
    } catch (error) {
        logger.error("error in sendmessage controller " + error.message)
        req.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}


export { getUsersForSidebar, getMessage, sendMessage }