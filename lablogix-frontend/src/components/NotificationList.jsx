import React, { useEffect, useState } from "react";
import api from "../../api";

export default function NotificationList() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    };
    fetchNotifications();
  }, []);

  return (
    <div className="mb-4">
      <h2 className="text-xl">Notifications</h2>
      <ul>
        {notifications.map((n) => (
          <li key={n._id} className={n.read ? "text-gray-400" : "font-bold"}>
            {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
