// src/components/NotificationSettingsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NotificationSettingsPage() {
    const [settings, setSettings] = useState({
        emailNotifications: false,
        smsNotifications: false,
        frequency: 'daily',
    });

    // Fetch current settings from backend
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/notification-settings/');
                setSettings(response.data);
            } catch (error) {
                console.error("Error fetching settings:", error);
            }
        };

        fetchSettings();
    }, []);

    // Update settings on form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://127.0.0.1:8000/api/notification-settings/', settings);
            alert("Settings updated successfully");
        } catch (error) {
            console.error("Error updating settings:", error);
        }
    };

    return (
        <div className="notification-settings-page">
            <h2>Notification Settings</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={() => setSettings(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
                    />
                    Email Notifications
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={settings.smsNotifications}
                        onChange={() => setSettings(prev => ({ ...prev, smsNotifications: !prev.smsNotifications }))}
                    />
                    SMS Notifications
                </label>
                <label>
                    Frequency:
                    <select
                        value={settings.frequency}
                        onChange={(e) => setSettings(prev => ({ ...prev, frequency: e.target.value }))}
                    >
                        <option value="instant">Instant</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                    </select>
                </label>
                <button type="submit">Save Settings</button>
            </form>
        </div>
    );
}

export default NotificationSettingsPage;
