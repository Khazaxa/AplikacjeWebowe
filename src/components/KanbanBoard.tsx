import React from "react";
import {
  DndContext,
  closestCenter,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { Task } from "./Details/StoryDetails";
import DetailsBtn from "./Buttons/DetailsBtn";
import EditBtn from "./Buttons/EditBtn";
import DelBtn from "./Buttons/DelBtn";
import { useNavigate } from "react-router-dom";

interface KanbanBoardProps {
  tasks: Task[];
  onStatusChange: (taskId: number, newState: number) => void;
  onEditTask: (taskId: number) => void;
  onViewTaskDetails?: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

const columns = [
  { id: 0, title: "To Do" },
  { id: 1, title: "In Progress" },
  { id: 2, title: "Done" },
];

function DroppableColumn({
  columnId,
  title,
  children,
}: {
  columnId: number;
  title: string;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({ id: columnId.toString() });

  const columnColors: Record<number, string> = {
    0: "bg-indigo-50 dark:bg-indigo-900",
    1: "bg-yellow-50 dark:bg-yellow-900",
    2: "bg-green-50 dark:bg-green-900",
  };

  return (
    <div
      ref={setNodeRef}
      className={`w-full md:w-1/3 p-2 rounded shadow-sm ${columnColors[columnId]} min-h-[400px]`}
    >
      <div className="text-center font-semibold mb-2 text-lg md:text-xl">
        {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function DraggableTask({
  task,
  onEdit,
  onDetails,
  onDelete,
}: {
  task: Task;
  onEdit: (taskId: number) => void;
  onDetails: (taskId: number) => void;
  onDelete: (taskId: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString(),
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
      className="p-2 bg-white dark:bg-gray-800 rounded shadow cursor-grab text-gray-900 dark:text-gray-100"
    >
      <p className="font-medium">{task.name}</p>
      <p className="text-sm mb-2">{task.description}</p>

      <div className="flex flex-col gap-1 items-center">
        <DetailsBtn onClick={() => onDetails(task.id)} aria-label="Details" />
        <EditBtn onClick={() => onEdit(task.id)} aria-label="Edit" />
        <DelBtn onClick={() => onDelete(task.id)} aria-label="Delete" />
      </div>
    </div>
  );
}

export default function KanbanBoard({
  tasks,
  onStatusChange,
  onEditTask,
  onDeleteTask,
}: KanbanBoardProps) {
  const navigate = useNavigate();

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = parseInt(active.id);
    const newState = parseInt(over.id);

    const task = tasks.find((t) => t.id === taskId);
    if (task && task.state !== newState) {
      onStatusChange(taskId, newState);
    }
  };

  const handleViewDetails = (taskId: number) => {
    navigate(`/task/${taskId}`);
  };

  const handleEdit = (taskId: number) => {
    onEditTask(taskId);
  };

  const handleDelete = (taskId: number) => {
    onDeleteTask(taskId);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        {columns.map((col) => (
          <DroppableColumn key={col.id} columnId={col.id} title={col.title}>
            {tasks
              .filter((task) => task.state === col.id)
              .map((task) => (
                <DraggableTask
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDetails={handleViewDetails}
                  onDelete={handleDelete}
                />
              ))}
          </DroppableColumn>
        ))}
      </div>
    </DndContext>
  );
}
