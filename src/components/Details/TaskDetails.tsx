import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReturnBtn from "../Buttons/ReturnBtn";
import { TaskService } from "../../service/TaskService";
import { State } from "../../models/State";
import { StartBtn, CompleteBtn, AssignBtn } from "../Buttons/TaskBtns";

interface Task {
  id: number;
  name: string;
  description: string;
  priority: number;
  state: number;
}

function priorityToString(priority: number): string {
  switch (priority) {
    case 0:
      return "Low";
    case 1:
      return "Medium";
    case 2:
      return "High";
    default:
      return "Unknown";
  }
}

function stateToString(state: number): string {
  switch (state) {
    case State.ToDo:
      return "To Do";
    case State.InProgress:
      return "In Progress";
    case State.Done:
      return "Done";
    default:
      return "Unknown";
  }
}

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = localStorage.getItem("userId");

  const fetchTask = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await TaskService.getById(id);
      setTask(res.data);
    } catch {
      setError("Failed to load task details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-6 px-6 transition-all duration-500 ease-in-out">
      <ReturnBtn />

      <div
        className="
          bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-70
          rounded-lg shadow-md overflow-hidden
          transition-all duration-500 ease-in-out flex flex-col gap-6
          max-w-4xl w-full
          px-6 sm:px-8 lg:px-12
          py-8
          text-center
          break-words
        "
        style={{ minWidth: 0 }}
      >
        {loading ? (
          <p className="text-gray-700 dark:text-gray-300">Loading task...</p>
        ) : error ? (
          <p className="text-red-600 dark:text-red-400">{error}</p>
        ) : task ? (
          <>
            <div className="text-indigo-600 font-extrabold text-3xl mb-4">
              {task.name}
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              {task.description}
            </div>
            <p className="text-base">
              <span className="font-semibold">Priority:</span>{" "}
              {priorityToString(task.priority)}
            </p>
            <p className="text-base mb-4">
              <span className="font-semibold">State:</span>{" "}
              {stateToString(task.state)}
            </p>

            <div className="flex justify-center gap-4">
              {task.state === State.ToDo && (
                <StartBtn taskId={task.id} onSuccess={fetchTask} />
              )}
              {task.state === State.InProgress && (
                <CompleteBtn taskId={task.id} onSuccess={fetchTask} />
              )}
              {userId && (
                <AssignBtn
                  taskId={task.id}
                  userId={userId}
                  onSuccess={fetchTask}
                />
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">
            No task data available.
          </p>
        )}
      </div>
    </div>
  );
}
