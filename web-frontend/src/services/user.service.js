import { API_ENDPOINTS } from "@/constants";
import { apiRequest } from "./api";

/**
 * Fetch user profile information by ID.
 * @param {string} userId - The ID of the user to fetch.
 * @param {string} [token] - Optional authentication JWT token.
 * @returns {Promise<{ success: boolean, data: object }>}
 */
export const getUserById = async (userId, token, selectFields) => {
  let query = "";
  if (selectFields) {
    const value =
      typeof selectFields === "object"
        ? JSON.stringify(selectFields)
        : selectFields;
    query = `?select=${encodeURIComponent(value)}`;
  }
  return await apiRequest(`${API_ENDPOINTS.PROFILE}/${userId}${query}`, {
    method: "GET",
    token,
  });
};