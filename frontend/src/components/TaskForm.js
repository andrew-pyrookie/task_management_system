// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ existingTask, onSave, onClose }) => {
    const [title, setTitle] = useState(existingTask ? existingTask.title : '');
    const [description, setDescription] = useState(existingTask ? existingTask.description : '');
    const [status, setStatus] = useState(existingTask ? existingTask.status : 'pending');

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const taskData = { title, description, status };
        try {
            if (existingTask) {
                // Update existing task
                await axios.put(`http://127.0.0.1:8000/api/tasks/${existingTask.id}/`, taskData);
            } else {
                // Create a new task
                await axios.post('http://127.0.0.1:8000/api/tasks/', taskData);
            }
            onSave(); // Callback to refresh the task list
            onClose(); // Close the form after saving
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <div className="task-form-popup">
            <button className="close-button" onClick={onClose} aria-label="Close">
                ❌
            </button>
            <form onSubmit={handleSubmit}>
                <h2>{existingTask ? 'Edit Task' : 'Create New Task'}</h2>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button type="submit">{existingTask ? 'Update Task' : 'Create Task'}</button>
            </form>
        </div>
    );
};

export default TaskForm;
