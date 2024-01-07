import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserType } from "../shared/types";

// Define the schema for users
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// Middleware function to hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  // Check if the password field is modified, then hash the password
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Create a Mongoose model for users using the userSchema
const User = mongoose.model<UserType>("User", userSchema);

// Export the User model
export default User;
