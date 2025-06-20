import { useState, useEffect } from "react";
import { TaskService } from "../../service/TaskService";
import Notifications from "../Notifications";

interface BtnProps {
  taskId: number;
  onSuccess?: () => void;
}

interface AssignBtnProps extends BtnProps {
  userId: string;
}

function useNotification() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | null
  >(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  function showNotification(
    type: "success" | "error" | "warning",
    msg: string
  ) {
    setMessageType(type);
    setMessage(msg);
  }

  return { loading, setLoading, message, messageType, showNotification };
}

export function StartBtn({ taskId, onSuccess }: BtnProps) {
  const { loading, setLoading, message, messageType, showNotification } =
    useNotification();

  const handleStart = async () => {
    setLoading(true);
    try {
      await TaskService.start(taskId.toString());
      showNotification("success", "Task started successfully.");
      onSuccess?.();
    } catch {
      showNotification("error", "Failed to start task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleStart}
        disabled={loading}
        className="
          px-6 py-2 rounded-lg
          bg-green-600 hover:bg-green-700
          text-white font-semibold
          shadow-md transition duration-200 ease-in-out
          disabled:bg-green-300 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
        "
        aria-label="Start Task"
      >
        {loading ? "Starting..." : "Start"}
      </button>
      <Notifications messageType={messageType} message={message} />
    </>
  );
}

export function CompleteBtn({ taskId, onSuccess }: BtnProps) {
  const { loading, setLoading, message, messageType, showNotification } =
    useNotification();

  const handleComplete = async () => {
    setLoading(true);
    try {
      await TaskService.complete(taskId.toString());
      showNotification("success", "Task completed successfully.");
      onSuccess?.();
    } catch {
      showNotification("error", "Failed to complete task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleComplete}
        disabled={loading}
        className="
          px-6 py-2 rounded-lg
          bg-blue-600 hover:bg-blue-700
          text-white font-semibold
          shadow-md transition duration-200 ease-in-out
          disabled:bg-blue-300 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        "
        aria-label="Complete Task"
      >
        {loading ? "Completing..." : "Complete"}
      </button>
      <Notifications messageType={messageType} message={message} />
    </>
  );
}

export function AssignBtn({ taskId, userId, onSuccess }: AssignBtnProps) {
  const { loading, setLoading, message, messageType, showNotification } =
    useNotification();

  const handleAssign = async () => {
    setLoading(true);
    try {
      await TaskService.assign(taskId.toString(), userId);
      showNotification("success", "Task assigned successfully.");
      onSuccess?.();
    } catch {
      showNotification("error", "Failed to assign task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleAssign}
        disabled={loading}
        className="
          px-6 py-2 rounded-lg
          bg-orange-600 hover:bg-orange-700
          text-white font-semibold
          shadow-md transition duration-200 ease-in-out
          disabled:bg-orange-300 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
        "
        aria-label="Assign To Me"
      >
        {loading ? "Assigning..." : "Assign"}
      </button>
      <Notifications messageType={messageType} message={message} />
    </>
  );
}
