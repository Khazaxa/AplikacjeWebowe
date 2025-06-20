import api from "../config/ApiConfig";

export const UserService = {
  getAll: () => api.get("/users"),
};
