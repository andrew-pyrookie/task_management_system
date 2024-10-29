// src/components/TaskCalendar.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styling for react-calendar
import axios from 'axios';

function TaskCalendar() {
    const [tasks, setTasks] = useState([]);
    const [date, setDate] = useState(new Date());

    // Fetch tasks from API
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tasks/')
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error fetching tasks:", error));
    }, []);

    // Check if a task exists on a specific date
    const hasTaskOnDate = (date) => {
        return tasks.some(task => new Date(task.created_at).toDateString() === date.toDateString());
    };

    return (
        <div className="task-calendar">
            <Calendar
                onChange={setDate}
                value={date}
                tileContent={({ date, view }) => 
                    view === 'month' && hasTaskOnDate(date) ? (
                        <span role="img" aria-label="task">📌</span>
                    ) : null
                }
            />
        </div>
    );
}

export default TaskCalendar;
