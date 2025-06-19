export interface Field {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "date" | "select";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: number }[];
}
