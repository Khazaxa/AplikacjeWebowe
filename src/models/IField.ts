export interface Field {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "textarea"
    | "date"
    | "select"
    | "email"
    | "password";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: number | string }[];
}
