/**
 * The above functions handle user authentication, retrieving users for a sidebar, fetching messages
 * between users, and sending messages with optional images.
 * @param {Request} req - `req` is an object representing the HTTP request. It contains information
 * about the request made by the client, such as headers, parameters, body, etc. In the provided code
 * snippets, `req` is of type `Request`, which is from the Express.js library and provides additional
 * functionalities for handling
 * @param {Response} res - The `res` parameter in the functions `getUsersForSidebar`, `getMessages`,
 * and `sendMessage` stands for the response object in Express. It is used to send a response back to
 * the client making the request. In these functions, `res` is used to send JSON responses with status
 */
import cloudinary from "../lib/cloudinary";
import { getReceiverSocketId, io } from "../lib/socket";
import Message from "../models/message.model";
import User from "../models/user.model";
import { Request, Response } from "express";

export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user?._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error: any) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user?._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error: any) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { text, image } = req.body;

    const { id: receiverId } = req.params;

    const senderId = req.user?._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error: any) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
