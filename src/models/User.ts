export interface User {
  id: string;
  name: string;
  surname: string;
  role: "admin" | "devops" | "developer";
  description: string;
}
