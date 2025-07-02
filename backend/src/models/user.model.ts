import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, require: true, trim: true, unique: true },
    fullName: { type: String, require: true, trim: true },
    password: {
      type: String,
      require: true,
      trim: true,
      minLength: 6,
    },
    profilePic: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
