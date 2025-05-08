import { Project } from "./Project";
import { Story } from "./Story";
import { Task } from "./Task";
import { User } from "./User";

export const mockTasks: Task[] = [
  {
    id: "task-1",
    name: "Implement authentication",
    description: "Develop the authentication module for the application.",
    priority: "high",
    storyId: "1",
    estimatedTime: 8,
    state: "to-do",
    creationDate: new Date("2025-05-01"),
    startDate: null,
    endDate: null,
    assignedTo: "2",
  },
  {
    id: "task-2",
    name: "Set up CI/CD pipeline",
    description: "Configure the CI/CD pipeline for automated deployments.",
    priority: "medium",
    storyId: "2",
    estimatedTime: 5,
    state: "in-progress",
    creationDate: new Date("2025-05-03"),
    startDate: new Date("2025-05-05"),
    endDate: null,
    assignedTo: "3",
  },
  {
    id: "task-3",
    name: "Write unit tests",
    description: "Create unit tests for the core modules.",
    priority: "low",
    storyId: "3",
    estimatedTime: 3,
    state: "done",
    creationDate: new Date("2025-04-28"),
    startDate: new Date("2025-04-29"),
    endDate: new Date("2025-05-01"),
    assignedTo: "2",
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    surname: "Admin",
    role: "admin",
    description: "Administrator with full access.",
  },
  {
    id: "2",
    name: "Developer User",
    surname: "Dev",
    role: "dev",
    description: "Developer with access to development tasks.",
  },
  {
    id: "3",
    name: "DevOps User",
    surname: "Ops",
    role: "devops",
    description: "DevOps engineer with access to deployment tasks.",
  },
];

export const mockStories: Story[] = [
  {
    id: "1",
    name: "Write unit tests",
    description: "Create unit tests for the core modules.",
    priority: "low",
    project: "1",
    creationDate: new Date("2025-04-28"),
    state: "to-do",
    owner: "2",
  },
  {
    id: "2",
    name: "Set up CI/CD pipeline",
    description: "Configure the CI/CD pipeline for automated deployments.",
    priority: "medium",
    project: "1",
    creationDate: new Date("2025-05-03"),
    state: "in-progress",
    owner: "3",
  },
  {
    id: "3",
    name: "Implement authentication",
    description: "Develop the authentication module for the application.",
    priority: "high",
    project: "1",
    creationDate: new Date("2025-05-01"),
    state: "done",
    owner: "2",
  },
];

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Project Alpha",
    description: "This is the first project.",
  },
  {
    id: "2",
    name: "Project Beta",
    description: "This is the second project.",
  },
];

// Default user
export const loggedInUser = mockUsers[0]; // Admin
