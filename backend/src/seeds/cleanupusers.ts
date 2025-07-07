import { config } from "dotenv";
import { connectDB } from "../lib/db";
import User from "../models/user.model";
import mongoose from "mongoose";

config();

const cleanupUsers = async (): Promise<void> => {
  try {
    await connectDB();

    const deleted = await User.deleteMany({});
    console.log(`Deleted ${deleted.deletedCount} users`);
  } catch (error) {
    console.error("Error cleaning up users:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  }
};

cleanupUsers();
