import { STATUS_CODES } from "../constants/statusCodes.js";
import { createUser, updateUserById } from "../services/userServices.js";
import { ApiError } from "../utils/ApiError.js";

const createOrUpdateUser = async (req, res, next) => {
  try {
    const { userData } = req.body;

    if (!userData) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, "User data is required");
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
      throw new ApiError(
        STATUS_CODES.BAD_REQUEST,
        "Validation failed",
        errors
      );
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
      return next(
        new ApiError(
          STATUS_CODES.BAD_REQUEST,
          "User with this email already exists"
        )
      );
    }
    next(error);
  }
};

export { createOrUpdateUser };

