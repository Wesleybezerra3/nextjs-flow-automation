'use client';
import React, { useEffect } from "react";
import "./style.css"; // Estilo para as notificações
import { useFlow } from "@/context/AppProvider";

const Notifications = () => {
  const { notifications, removeNotification } = useFlow();

  useEffect(() => {
    const timers = notifications.map((notification) =>
      setTimeout(() => removeNotification(notification.id), 5000) // Remove após 5 segundos
    );

    return () => timers.forEach((timer) => clearTimeout(timer)); // Limpa os timers ao desmontar
  }, [notifications, removeNotification]);

  return (
    <div className="notifications-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
        >
          {notification.message}
          <button
            className="close-button"
            onClick={() => removeNotification(notification.id)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;