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
  const [errorTasks, setErrorTasks] = useState<string | null>(null);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!storyId) return;

    fetchStory();
    fetchTasks();
  }, [storyId]);

  useEffect(() => {
    if (errorTasks) {
      const timer = setTimeout(() => setErrorTasks(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorTasks]);

  useEffect(() => {
    if (submitError) {
      const timer = setTimeout(() => setSubmitError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitError]);

  useEffect(() => {
    if (storyError) {
      const timer = setTimeout(() => setStoryError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [storyError]);

  async function fetchTasks() {
    if (!storyId) return;

    setErrorTasks(null);

    try {
      const res = await TaskService.getByStoryId(storyId);
      setTasks(res.data);
    } catch {
      setErrorTasks("Failed to load tasks.");
    }
  }

  async function fetchStory() {
    if (!storyId) return;

    setLoadingStory(true);
    setStoryError(null);

    try {
      const res = await StoryService.getById(storyId);
      setStory(res.data);
    } catch {
      setStoryError("Failed to load story details.");
    } finally {
      setLoadingStory(false);
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
      assignedToId: data.assignedToId ? Number(data.assignedToId) : null,
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
      const transformedData = transformTaskData(data);
      await TaskService.create(transformedData);
      await fetchTasks();
    } catch {
      setSubmitError("Failed to add task.");
    }
  };

  const handleEditSubmit = async (data: Omit<Task, "id">) => {
    if (!editingTask) return;

    try {
      const transformedData = transformTaskData(data);
      await TaskService.update(editingTask.id.toString(), transformedData);
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
      setErrorTasks("Failed to delete task.");
    }
  };

  async function handleStatusChange(taskId: number, newState: number) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      await TaskService.update(taskId.toString(), { ...task, state: newState });
      await fetchTasks();
    } catch {
      setErrorTasks("Failed to update task state.");
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

      <div className="flex flex-col items-center justify-start p-4 space-y-4 w-full max-w-3xl mx-auto">
        <ReturnBtn />

        <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 py-4 rounded shadow w-full max-w-xl text-center">
          {loadingStory && <p>Loading story...</p>}

          {story && (
            <>
              <p className="text-2xl font-bold text-indigo-600">{story.name}</p>
              <p className="text-base mt-2 text-gray-700 dark:text-gray-300">
                {story.description}
              </p>
              <p className="text-sm mt-2">Priority: {story.priority}</p>
              <p className="text-sm mt-1">State: {story.state}</p>
            </>
          )}

          {storyError && (
            <Notifications messageType="error" message={storyError} />
          )}
          {submitError && (
            <Notifications messageType="error" message={submitError} />
          )}
          {errorTasks && (
            <Notifications messageType="error" message={errorTasks} />
          )}
        </div>

        {tasks.length > 0 && (
          <>
            <KanbanBoard
              tasks={tasks.filter((task) => [0, 1, 2].includes(task.state))}
              onStatusChange={handleStatusChange}
            />

            {tasks.some((task) => ![0, 1, 2].includes(task.state)) && (
              <List
                title="Tasks outside Kanban"
                items={tasks.filter((task) => ![0, 1, 2].includes(task.state))}
                itemType="task"
                onEdit={(id) => {
                  const taskToEdit = tasks.find((t) => t.id === id);
                  if (taskToEdit) setEditingTask(taskToEdit);
                }}
                onDelete={handleDeleteTask}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
