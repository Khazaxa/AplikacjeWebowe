import React, { useState } from "react";
import { Task } from "../models/Task";

interface Props {
  task: Task;
  onSave: (task: Task) => void;
}

const TaskDetails: React.FC<Props> = ({ task, onSave }) => {
  const [assignedTo, setAssignedTo] = useState(task.assignedTo);

  const handleAssign = () => {
    if (!assignedTo) return;

    onSave({
      ...task,
      assignedTo,
      state: "in-progress",
      startDate: task.startDate ?? new Date(),
    });
  };

  const markAsDone = () => {
    if (!task.assignedTo) return;
    onSave({
      ...task,
      state: "done",
      endDate: new Date(),
    });
  };

  return (
    <div>
      <h2>Task: {task.name}</h2>
      <p>{task.description}</p>
      <p>Assigned To: {task.assignedTo || "None"}</p>
      <input
        placeholder="User ID"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />
      <button onClick={handleAssign}>Assign</button>
      <button onClick={markAsDone}>Mark as Done</button>
      <p>Start: {task.startDate?.toString() || "-"}</p>
      <p>End: {task.endDate?.toString() || "-"}</p>
    </div>
  );
};

export default TaskDetails;
