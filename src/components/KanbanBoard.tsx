import React from "react";
import { Task } from "./Details/StoryDetails";
import DetailsBtn from "./Buttons/DetailsBtn";
import EditBtn from "./Buttons/EditBtn";
import DelBtn from "./Buttons/DelBtn";
import { useNavigate } from "react-router-dom";

interface KanbanViewProps {
  tasks: Task[];
  onEditTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

const columns = [
  { id: "ToDo", title: "To Do", bgColor: "bg-indigo-50 dark:bg-indigo-900" },
  {
    id: "InProgress",
    title: "In Progress",
    bgColor: "bg-yellow-50 dark:bg-yellow-900",
  },
  { id: "Done", title: "Done", bgColor: "bg-green-50 dark:bg-green-900" },
];

function Column({
  title,
  bgColor,
  children,
}: {
  columnId: string;
  title: string;
  bgColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`w-full md:w-1/3 p-2 rounded shadow-sm ${bgColor} min-h-[400px]`}
    >
      <div className="text-center font-semibold mb-2 text-lg md:text-xl">
        {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function TaskCard({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit: (taskId: number) => void;
  onDelete: (taskId: number) => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="p-2 bg-white dark:bg-gray-800 rounded shadow cursor-default text-gray-900 dark:text-gray-100">
      <p className="font-medium">{task.name}</p>
      <p className="text-sm mb-2">{task.description}</p>

      <div className="flex flex-col gap-1 items-center">
        <DetailsBtn
          onClick={() => navigate(`/task/${task.id}`)}
          aria-label="Details"
        />
        <EditBtn onClick={() => onEdit(task.id)} aria-label="Edit" />
        <DelBtn onClick={() => onDelete(task.id)} aria-label="Delete" />
      </div>
    </div>
  );
}

export default function KanbanView({
  tasks,
  onEditTask,
  onDeleteTask,
}: KanbanViewProps) {
  const handleEdit = (taskId: number) => {
    onEditTask(taskId);
  };

  const handleDelete = (taskId: number) => {
    onDeleteTask(taskId);
  };

  const stateToColumnId = (state: number): string => {
    switch (state) {
      case 1:
        return "ToDo";
      case 2:
        return "InProgress";
      case 3:
        return "Done";
      default:
        return "ToDo";
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      {columns.map((col) => (
        <Column
          key={col.id}
          columnId={col.id}
          title={col.title}
          bgColor={col.bgColor}
        >
          {tasks
            .filter((task) => stateToColumnId(task.state) === col.id)
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
        </Column>
      ))}
    </div>
  );
}
