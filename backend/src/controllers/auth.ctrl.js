import { STATUS_CODES } from "../constants/statusCodes.js";
import { loginUser } from "../services/auth.service.js";
import { ApiError } from "../utils/ApiError.js";
import logger from "../config/logger.js";

/**
 * Controller to handle POST request for User Login
 */
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
    if (
      error.message === "Invalid email or password" ||
      error.message === "No user found on this Email"
    ) {
      return next(new ApiError(STATUS_CODES.UNAUTHORIZED, error.message));
    }
    next(error);
  }
};

export { login };
