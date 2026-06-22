import User from "../models/User.js";

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

  const existingUser = await User.findOne({
    email: userData.email,
    _id: { $ne: _id },
  });

  if (existingUser) {
    throw new Error("user with this email already exists");
  }

  const updatedUser = await User.findByIdAndUpdate(_id, userData, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) throw Error("User not found");

  return updatedUser;
};

export { createUser, updateUserById };
