import { STATUS_CODES } from "../constants/statusCodes.js";
import { createUser, updateUserById } from "../services/userServices.js";

const createOrUpdateUser = async (req, res) => {
  try {
    const { userData } = req.body;

    if (!userData) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "User data is required",
      });
    }

    const errors = [];

    if (!userData.name?.trim()) {
      errors.push("Name is required");
    }

    if (!userData.email?.trim()) {
      errors.push("Email is required");
    }

    if (!userData._id && !userData.password?.trim()) {
      errors.push("Password is required");
    }

    if (errors.length > 0) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ success: false, errors });
    }

    let user;

    if (userData._id) {
      user = await updateUserById(userData);
    } else {
      user = await createUser(userData);
    }

    return res.status(STATUS_CODES.OK).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "user with this email already exits",
      });
    }

    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export { createOrUpdateUser };
