import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Task } from "../models/Task";
import styles from "./TaskBoard.module.css";

interface Props {
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const columns = ["to-do", "in-progress", "done"] as const;

const TaskBoard: React.FC<Props> = ({ tasks, onUpdate, onDelete, onEdit }) => {
  const grouped = {
    "to-do": [] as Task[],
    "in-progress": [] as Task[],
    done: [] as Task[],
  };

  tasks.forEach((task) => {
    grouped[task.state].push(task);
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const movedTask = tasks.find((t) => t.id === draggableId);
    if (movedTask) {
      const updated: Task = {
        ...movedTask,
        state: destination.droppableId as Task["state"],
        startDate:
          destination.droppableId === "in-progress" && !movedTask.startDate
            ? new Date()
            : movedTask.startDate,
        endDate:
          destination.droppableId === "done" ? new Date() : movedTask.endDate,
      };
      onUpdate(updated);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board}>
        {columns.map((col) => (
          <Droppable droppableId={col} key={col}>
            {(provided) => (
              <div
                className={styles.column}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2>{col.toUpperCase()}</h2>
                {grouped[col].map((task, index) => (
                  <Draggable draggableId={task.id} index={index} key={task.id}>
                    {(provided) => (
                      <div
                        className={styles.card}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h3>{task.name}</h3>
                        <p>{task.description}</p>
                        <small>Priority: {task.priority}</small>
                        <br />
                        <button onClick={() => onEdit(task)}>Edit</button>
                        <button onClick={() => onDelete(task.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
