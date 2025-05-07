export interface Story {
  id: string;
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  project: string; // Project ID
  creationDate: Date;
  state: "to-do" | "in-progress" | "done";
  owner: string; // User ID
}
