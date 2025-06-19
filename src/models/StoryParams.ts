import { Field } from "./IField";
import { Priority } from "./Priority";
import { State } from "./State";

export const storyFields: Field[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "description", label: "Description", type: "text" },
  {
    name: "priority",
    label: "Priority",
    type: "select",
    options: Object.values(Priority).map(String),
  },
  { name: "projectId", label: "Project ID", type: "number" },
  {
    name: "state",
    label: "State",
    type: "select",
    options: Object.values(State).map(String),
  },
];
