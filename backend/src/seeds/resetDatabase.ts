import { config } from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../lib/db";

config();

const resetDatabase = async (): Promise<void> => {
  try {
    await connectDB();

    // ✅ Prevent in production
    if (process.env.NODE_ENV === "production") {
      console.log("❌ Cannot reset database in production!");
      process.exit(1);
    }

    // ✅ Drop entire database
    await mongoose.connection.dropDatabase();

    console.log("✅ Database reset successfully (all collections dropped).");
  } catch (error) {
    console.error("❌ Error resetting database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
    process.exit(0);
  }
};

resetDatabase();
