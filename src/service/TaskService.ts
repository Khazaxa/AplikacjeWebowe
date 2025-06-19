import api from "../config/ApiConfig";

export const TaskService = {
  getAll: () => api.get("/tasks"),
  getByStoryId: (storyId: string) => api.get(`/story/${storyId}/tasks`),
  getById: (id: string) => api.get(`/task/${id}`),
  create: (data: any) => api.post("/task", data),
  update: (id: string, data: any) => api.put(`/task/${id}`, data),
  delete: (id: string) => api.delete(`/task/${id}`),
};
