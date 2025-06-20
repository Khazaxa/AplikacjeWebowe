import api from "../config/ApiConfig";

export const TaskService = {
  getAll: () => api.get("/tasks"),
  getByStoryId: (storyId: string) => api.get(`/story/${storyId}/tasks`),
  getById: (id: string) => api.get(`/task/${id}`),
  create: (data: any) => api.post("/task", data),
  update: (id: string, data: any) => api.put(`/task/${id}`, data),
  delete: (id: string) => api.delete(`/task/${id}`),
  start: (id: string) => api.put(`/task/${id}/start`),
  complete: (id: string) => api.put(`/task/${id}/complete`),
  assign: (id: string, userId: string) =>
    api.put(`/task/${id}/assign?userId=${userId}`),
};
