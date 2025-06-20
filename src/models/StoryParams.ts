import { Field } from "./IField";
import { Priority } from "./Priority";
import { State } from "./State";

export const storyFields: Field[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  {
    name: "priority",
    label: "Priority",
    type: "select",
    options: Object.entries(Priority)
      .filter(([key]) => isNaN(Number(key)))
      .map(([key, value]) => ({
        label: key,
        value: value as number,
      })),
  },
  {
    name: "state",
    label: "State",
    type: "select",
    options: Object.entries(State)
      .filter(([key]) => isNaN(Number(key)))
      .map(([key, value]) => ({
        label: key,
        value: value as number,
      })),
  },
];
