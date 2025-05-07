export interface Task {
  id: string;
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  storyId: string; // Story ID
  estimatedTime: number;
  state: "to-do" | "in-progress" | "done";
  creationDate: Date;
  startDate: Date | null; // Nullable if not started yet
  endDate: Date | null; // Nullable if not completed yet
  assignedTo: string; // User ID
}
