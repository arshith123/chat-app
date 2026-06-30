import { STATUS_CODES } from "../constants/statusCodes.js";
import { createUser, updateUserById, getUserById, loginUser } from "../services/userServices.js";
import { ApiError } from "../utils/ApiError.js";

const createOrUpdateUser = async (req, res, next) => {
  try {
    const { userData } = req.body;

    if (!userData) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, "User data is required");
    }

    const errors = [];

    if (!userData._id) {
      // Creation: Name, Email, and Password are all required
      if (!userData.name?.trim()) {
        errors.push("Name is required");
      }
      if (!userData.email?.trim()) {
        errors.push("Email is required");
      }
      if (!userData.password?.trim()) {
        errors.push("Password is required");
      }
    } else {
      // Update: If fields are passed, they must not be empty
      if (userData.hasOwnProperty("name") && !userData.name?.trim()) {
        errors.push("Name cannot be empty");
      }
      if (userData.hasOwnProperty("email") && !userData.email?.trim()) {
        errors.push("Email cannot be empty");
      }
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


const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, "User ID is required");
    }

    const user = await getUserById(id);

    return res.status(STATUS_CODES.OK).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error.message === "User not found") {
      return next(new ApiError(STATUS_CODES.NOT_FOUND, "User not found"));
    }
    if (error.name === "CastError") {
      return next(new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid User ID format"));
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, "Email and password are required");
    }

    const { user, token } = await loginUser(email, password);

    return res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Login successful",
      data: { user, token },
    });
  } catch (error) {
    if (error.message === "Invalid email or password") {
      return next(new ApiError(STATUS_CODES.UNAUTHORIZED, "Invalid email or password"));
    }
    next(error);
  }
};

export { createOrUpdateUser, getUser, login };



