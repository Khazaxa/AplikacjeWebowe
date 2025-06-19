import { Field } from "./IField";
import { Priority } from "./Priority";
import { State } from "./State";

export const taskFields: Field[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "description", label: "Description", type: "text" },
  {
    name: "priority",
    label: "Priority",
    type: "select",
    options: Object.values(Priority).map(String),
  },
  { name: "storyId", label: "Story ID", type: "number" },
  {
    name: "estimatedCompletionDate",
    label: "Estimated Completion Date",
    type: "date",
  },
  {
    name: "state",
    label: "State",
    type: "select",
    options: Object.values(State).map(String),
  },
  { name: "createdAt", label: "Created At", type: "date" },
  { name: "startedAt", label: "Started At", type: "date" },
  { name: "endDate", label: "End Date", type: "date" },
  { name: "assignedToId", label: "Assigned To ID", type: "number" },
];
