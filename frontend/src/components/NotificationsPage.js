// src/components/NotificationsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);

    // Fetch notifications from backend
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/notifications/');
                setNotifications(response.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="notifications-page">
            <h2>Notifications</h2>
            <ul className="notification-list">
                {notifications.map(notification => (
                    <li key={notification.id} className="notification-item">
                        <p>{notification.message}</p>
                        <span>{new Date(notification.timestamp).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NotificationsPage;
