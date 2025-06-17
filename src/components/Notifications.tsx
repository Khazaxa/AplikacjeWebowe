import React from "react";

interface NotificationsProps {
  messageType: "success" | "error" | "warning" | null;
  message: string;
}

const Notifications: React.FC<NotificationsProps> = ({ message }) => {
  return <div>{message && <div>{message}</div>}</div>;
};

export default Notifications;
