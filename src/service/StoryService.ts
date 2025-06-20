import api from "../config/ApiConfig";

export const StoryService = {
  getAll: () => api.get("/stories"),
  getByProjectId: (projectId: string) =>
    api.get(`/project/${projectId}/stories`),
  getById: (id: string) => api.get(`/story/${id}`),
  create: (data: any) => api.post("/story", data),
  update: (id: string, data: any) => api.put(`/story/${id}`, data),
  delete: (id: string) => api.delete(`/story/${id}`),
};
