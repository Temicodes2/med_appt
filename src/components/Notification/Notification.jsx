import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  useEffect(() => {
    // Expose notification system globally for app-wide visibility
    window.showNotification = addNotification;
    return () => {
      window.showNotification = undefined;
    };
  }, []);

  return (
    <>
      {children}
      <div className="notification-container">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`notification notification--${n.type}`}
            role="alert"
          >
            {n.message}
          </div>
        ))}
      </div>
    </>
  );
};

export default Notification;
