export interface Field {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "select"
    | "textarea";
  placeholder?: string;
  required?: boolean;
  options?: string[];
}
