import { Task } from "../models/Task";
import ApiClient from "../config/ApiClient";

const api = new ApiClient("myapp");

export const TaskService = {
  getAll: async (): Promise<Task[]> => {
    return api.get<Task[]>("tasks");
  },

  getById: async (id: string): Promise<Task | undefined> => {
    const all = await api.get<Task[]>("tasks");
    return all.find((t) => t.id === id);
  },

  create: async (task: Task): Promise<Task> => {
    return api.post<Task>("tasks", task);
  },

  update: async (task: Task): Promise<Task> => {
    return api.put<Task>("tasks", task.id, task);
  },

  remove: async (id: string): Promise<void> => {
    return api.delete<void>("tasks", id);
  },
};
