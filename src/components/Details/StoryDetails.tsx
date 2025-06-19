import { useEffect, useState } from "react";
import ReturnBtn from "../Buttons/ReturnBtn";
import ExpandableForm from "../ExpandableForm";
import { useParams } from "react-router-dom";
import { TaskService } from "../../service/TaskService";
import { StoryService } from "../../service/StoryService";
import { Story } from "./ProjectDetails";
import Notifications from "../Notifications";
import KanbanBoard from "../KanbanBoard";
import List from "../List";

export interface Task {
  id: number;
  name: string;
  description: string;
  priority: number;
  storyId: number;
  estimatedCompletionDate: string;
  state: number;
  startedAt: string | null;
  endDate: string | null;
  assignedToId: number | null;
}

export default function StoryDetails() {
  const { id: storyId } = useParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [loadingStory, setLoadingStory] = useState(false);
  const [storyError, setStoryError] = useState<string | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksError, setTasksError] = useState<string | null>(null);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!storyError && !tasksError && !submitError) return;
    const timer = setTimeout(() => {
      setStoryError(null);
      setTasksError(null);
      setSubmitError(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [storyError, tasksError, submitError]);

  useEffect(() => {
    if (!storyId) return;
    fetchStory();
    fetchTasks();
  }, [storyId]);

  async function fetchStory() {
    setLoadingStory(true);
    setStoryError(null);
    try {
      const res = await StoryService.getById(storyId!);
      setStory(res.data);
    } catch {
      setStoryError("Failed to load story details.");
    } finally {
      setLoadingStory(false);
    }
  }

  async function fetchTasks() {
    setTasksError(null);
    try {
      const res = await TaskService.getByStoryId(storyId!);
      setTasks(res.data);
    } catch {
      setTasksError("Failed to load tasks.");
    }
  }

  function transformTaskData(data: Omit<Task, "id" | "storyId">): Omit<
    Task,
    "id" | "storyId"
  > & {
    assignedToId: number | null;
    storyId: number;
  } {
    return {
      ...data,
      priority: Number(data.priority),
      state: Number(data.state),
      assignedToId:
        data.assignedToId !== null && data.assignedToId !== undefined
          ? Number(data.assignedToId)
          : null,
      storyId: storyId ? Number(storyId) : 0,
    };
  }

  const handleAddTask = async (data: Omit<Task, "id" | "storyId">) => {
    setSubmitError(null);
    if (!storyId) {
      setSubmitError("Missing storyId in URL");
      return;
    }

    try {
      const transformed = transformTaskData(data);
      await TaskService.create(transformed);
      await fetchTasks();
    } catch {
      setSubmitError("Failed to add task.");
    }
  };

  const handleEditSubmit = async (data: Omit<Task, "id">) => {
    if (!editingTask) return;
    try {
      const transformed = transformTaskData(data);
      await TaskService.update(editingTask.id.toString(), transformed);
      await fetchTasks();
      setEditingTask(null);
    } catch {
      setSubmitError("Failed to update task.");
    }
  };

  const handleFormSubmit = async (data: Omit<Task, "id" | "storyId">) => {
    if (editingTask) {
      await handleEditSubmit({
        ...data,
        id: editingTask.id,
        storyId: Number(storyId),
      } as Omit<Task, "id">);
    } else {
      await handleAddTask(data);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await TaskService.delete(id.toString());
      await fetchTasks();
    } catch {
      setTasksError("Failed to delete task.");
    }
  };

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
      case 0:
        return "To Do";
      case 1:
        return "In Progress";
      case 2:
        return "Done";
      default:
        return "Unknown";
    }
  }

  return (
    <>
      <ExpandableForm
        formType="task"
        onSubmit={handleFormSubmit}
        onCollapse={() => setEditingTask(null)}
        initialData={editingTask ?? undefined}
      />

      <div className="relative min-h-screen flex flex-col items-center justify-start bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-6 px-6 transition-all duration-500 ease-in-out">
        <ReturnBtn />
        <div
          className="
    bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-70
    rounded-lg shadow-md text-center overflow-hidden
    transition-all duration-500 ease-in-out flex flex-col gap-6
    max-w-6xl w-full
    px-6 sm:px-8 lg:px-12
    py-8
  "
          style={{ minWidth: 0 }}
        >
          <section>
            {loadingStory && (
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Loading story...
              </p>
            )}

            {story && (
              <>
                <h1 className="text-3xl font-extrabold text-indigo-600 mb-2">
                  {story.name}
                </h1>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {story.description}
                </p>
                <div className="flex justify-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
                  <p>
                    <span className="font-semibold">Priority:</span>{" "}
                    {priorityToString(story.priority)}
                  </p>
                  <p>
                    <span className="font-semibold">State:</span>{" "}
                    {stateToString(story.state)}
                  </p>
                </div>
              </>
            )}

            {(storyError || submitError || tasksError) && (
              <>
                {storyError && (
                  <Notifications messageType="error" message={storyError} />
                )}
                {submitError && (
                  <Notifications messageType="error" message={submitError} />
                )}
                {tasksError && (
                  <Notifications messageType="error" message={tasksError} />
                )}
              </>
            )}
          </section>

          {tasks.length > 0 ? (
            <>
              <KanbanBoard
                tasks={tasks.filter((task) => [0, 1, 2].includes(task.state))}
                onEditTask={(id) => {
                  const task = tasks.find((t) => t.id === id);
                  if (task) setEditingTask(task);
                }}
                onDeleteTask={handleDeleteTask}
              />

              {tasks.some((task) => ![0, 1, 2].includes(task.state)) && (
                <List
                  title="Tasks outside Kanban"
                  items={tasks.filter(
                    (task) => ![0, 1, 2].includes(task.state)
                  )}
                  itemType="task"
                  onEdit={(id) => {
                    const taskToEdit = tasks.find((t) => t.id === id);
                    if (taskToEdit) setEditingTask(taskToEdit);
                  }}
                  onDelete={handleDeleteTask}
                />
              )}
            </>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
              No tasks yet. Add one above to get started!
            </p>
          )}
        </div>
      </div>
    </>
  );
}
