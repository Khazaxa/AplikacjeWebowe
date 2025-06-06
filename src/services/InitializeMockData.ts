import {
  mockProjects,
  mockStories,
  mockTasks,
  mockUsers,
} from "../models/Mocks";

export const initializeMockData = () => {
  if (!localStorage.getItem("projects")) {
    console.log("Initializing mock projects...");
    localStorage.setItem("projects", JSON.stringify(mockProjects));
  }

  if (!localStorage.getItem("stories")) {
    localStorage.setItem("stories", JSON.stringify(mockStories));
  }

  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", JSON.stringify(mockTasks));
  }

  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(mockUsers));
  }
};
