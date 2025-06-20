import { Field } from "./IField";
import { UserRole } from "./UserRole";

export const registerFields: Field[] = [
  { name: "email", label: "Email", type: "text", required: true },
  { name: "password", label: "Password", type: "text", required: true },
  { name: "name", label: "Name", type: "text" },
  { name: "surname", label: "Surname", type: "text" },
  { name: "age", label: "Age", type: "number" },
  { name: "description", label: "Description", type: "text" },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: Object.entries(UserRole)
      .filter(([, value]) => typeof value === "number")
      .map(([key, value]) => ({ label: key, value: value as number })),
  },
];
