import { apiRequest } from "./api";
import { API_ENDPOINTS } from "../constants/apiEnpoints";

export const register = async (userData) => {
  return await apiRequest(API_ENDPOINTS.REGISTER, {
    method: "POST",
    body: { userData },
  });
};
