export interface User {
  id: string;
  name: string;
  surname: string;
  role: "admin" | "devops" | "dev";
  description: string;
}
