import { apiRequest } from "./api";
import { API_ENDPOINTS } from "../constants/apiEnpoints";

export const register = async (userData) => {
  return await apiRequest(API_ENDPOINTS.REGISTER, {
    method: "POST",
    body: { userData },
  });
};

export const login = async (email, password) => {
  return await apiRequest(API_ENDPOINTS.LOGIN, {
    method: "POST",
    body: { email, password },
  });
};
