import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Service to login user and generate a JWT token
 */
const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Find the user and explicitly select the password field
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("No user found on this Email");
  }

  // Compare passwords using the schema method defined in User.js
  const isMatch = await user.comparepassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Convert mongoose document to plain object and remove password
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return { user: userWithoutPassword, token };
};

export { loginUser };
