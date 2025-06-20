import api from "../config/ApiConfig";

export const ProjectService = {
  getAll: () => api.get("/projects"),
  getById: (id: string) => api.get(`/project/${id}`),
  create: (data: any) => api.post("/project", data),
  update: (id: string, data: any) => api.put(`/project/${id}`, data),
  delete: (id: string) => api.delete(`/project/${id}`),
};
