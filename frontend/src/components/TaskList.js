// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import TaskForm from './TaskForm';
import FilterOptions from './FilterOptions';
import { MdDashboard } from "react-icons/md";
import { FaTasks, FaCalendarAlt } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";
import { IoIosSettings } from "react-icons/io";
import logo from "../assets/logo.png";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [filters, setFilters] = useState({ status: '', category: '' });

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/tasks/');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSave = () => {
        fetchTasks();
        setSelectedTask(null);
        setIsFormVisible(false);
    };

    // Filter tasks by their status
    const filterTasksByStatus = (status) => {
        return tasks.filter(task => (status ? task.status === status : true));
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
    };

    const filteredTasks = filterTasksByStatus(filters.status);

    // Handle row click to fetch task details
    const handleRowClick = (task) => {
        setSelectedTask(task);
    };

    return (
        <div className="task-page">
            <div className="left-column">
                <h1>
                    <img src={logo} alt="Taskly Logo" width="40" height="40" /> Taskly
                </h1>
                <ul>
                    <li>
                        <NavLink to="/dashboard" activeClassName="active">
                            <MdDashboard /> Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/tasks" activeClassName="active">
                            <FaTasks /> My Tasks
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/calendar" activeClassName="active">
                            <FaCalendarAlt /> Calendar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/statistics" activeClassName="active">
                            <FcStatistics /> Statistics
                        </NavLink>
                    </li>
                </ul>
                <li className="settings">
                    <NavLink to="/settings" activeClassName="active">
                        <IoIosSettings /> Settings
                    </NavLink>
                </li>
            </div>

            <div className="center-column">
                <h1>Task Management Board</h1>
                <button onClick={() => { setSelectedTask(null); setIsFormVisible(true); }}>
                    Create New Task
                </button>
                <FilterOptions filters={filters} onFilterChange={handleFilterChange} />

                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Task Name</th>
                            <th>Deadlines</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>User</th>
                            <th>Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map(task => (
                            <tr key={task.id} onClick={() => handleRowClick(task)}>
                                <td>{task.title}</td>
                                <td>{task.due_date}</td>
                                <td>{task.status}</td>
                                <td>{new Date(task.created_at).toLocaleDateString()}</td>
                                <td>{task.user}</td>
                                <td>
                                    <input type="checkbox" checked={task.done} readOnly />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isFormVisible && (
                    <TaskForm existingTask={selectedTask} onSave={handleSave} onClose={() => setIsFormVisible(false)} />
                )}
            </div>

            <div className="right-column">
                {selectedTask && (
                    <div className="task-details">
                        <h2>Task Details</h2>
                        <p><strong>Title:</strong> {selectedTask.title}</p>
                        <p><strong>Description:</strong> {selectedTask.description}</p>
                        <p><strong>Status:</strong> {selectedTask.status}</p>
                        <p><strong>Created At:</strong> {new Date(selectedTask.created_at).toLocaleString()}</p>
                        <p><strong>Due Date:</strong> {new Date(selectedTask.due_date).toLocaleDateString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskList;
