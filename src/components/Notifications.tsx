import React from "react";

interface NotificationsProps {
  messageType: "success" | "error" | "warning" | null;
  message: string;
}

const Notifications: React.FC<NotificationsProps> = ({
  messageType,
  message,
}) => {
  if (!message) return null;

  const baseClasses =
    "max-w-md mx-auto mb-4 mt-2.5 px-4 py-3 rounded-md text-center font-semibold transition-colors";

  let colorClasses = "";
  switch (messageType) {
    case "success":
      colorClasses =
        "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      break;
    case "error":
      colorClasses =
        "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
      break;
    case "warning":
      colorClasses =
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
      break;
    default:
      colorClasses =
        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }

  return <div className={`${baseClasses} ${colorClasses}`}>{message}</div>;
};

export default Notifications;
