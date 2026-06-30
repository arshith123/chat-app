import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createUser = async (userData) => {
  const existingUser = await User.findOne({
    email: userData.email,
  });

  if (existingUser) {
    throw new Error("user with this email already exists");
  }

  return await User.create(userData);
};

const updateUserById = async (userData) => {
  const _id = userData._id;

  if (userData.email) {
    const existingUser = await User.findOne({
      email: userData.email,
      _id: { $ne: _id },
    });

    if (existingUser) {
      throw new Error("user with this email already exists");
    }
  }

  const updatedUser = await User.findByIdAndUpdate(_id, userData, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) throw Error("User not found");

  return updatedUser;
};

const getUserById = async (_id, selectFields) => {
  let query = User.findById(_id);

  if (selectFields) {
    let projection = selectFields;

    if (typeof selectFields === "string") {
      try {
        // Attempt to parse JSON string (e.g. '{"name":1}' or '["name"]')
        projection = JSON.parse(selectFields);
      } catch (err) {
        // Fallback to standard string (convert comma-separated to space-separated)
        projection = selectFields.replace(/,/g, " ");
      }
    }

    if (Array.isArray(projection)) {
      projection = projection.join(" ");
    }
    query = query.select(projection);
  } else {
    query = query.select("-password");
  }

  const user = await query;

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};


const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparepassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return { user: userWithoutPassword, token };
};

export { createUser, updateUserById, getUserById, loginUser };

