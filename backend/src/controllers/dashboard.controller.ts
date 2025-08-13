import { Request, Response } from "express";
import User from "../models/user.model";
import Message from "../models/message.model";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalMessages = await Message.countDocuments();

    // Example: count single vs group chats
    const singleChatsCount = await Message.countDocuments({
      isGroup: false,
    }).catch(() => 0);
    const groupChatsCount = await Message.countDocuments({
      isGroup: true,
    }).catch(() => 0);

    // Messages per day (last 7 days)
    const last7Days = [...Array(7)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().slice(0, 10);
    });

    const messagesPerDay = await Promise.all(
      last7Days.map(async (day) => {
        const count = await Message.countDocuments({
          createdAt: {
            $gte: new Date(`${day}T00:00:00.000Z`),
            $lte: new Date(`${day}T23:59:59.999Z`),
          },
        });
        return { day, count };
      })
    );

    // Fetch latest messages
    const messages = await Message.find()
      .populate("senderId", "name avatar") // ✅ correct field
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      totalUsers,
      totalMessages,
      singleChatsCount,
      groupChatsCount,
      messagesPerDay,
      messages,
    });
  } catch (error: any) {
    console.log("Error in getDashboardStats:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
