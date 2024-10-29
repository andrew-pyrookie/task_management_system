import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { MdDashboard } from "react-icons/md";
import { FaTasks, FaCalendarAlt, FaUser } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";
import { IoIosSettings, IoIosAddCircle, IoMdSearch } from "react-icons/io";
import { MdOutlineNotificationsNone, MdNotificationsActive } from "react-icons/md";
import logo from "../assets/logo.png";

const Dashboard = ({ username }) => {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notificationsAvailable, setNotificationsAvailable] = useState(false);  // For notifications
    const [userProfilePicture, setUserProfilePicture] = useState(null);          // For user profile picture

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch tasks and projects
                const tasksResponse = await axios.get('http://127.0.0.1:8000/api/tasks/');
                const projectsResponse = await axios.get('http://127.0.0.1:8000/api/projects/');
                setTasks(tasksResponse.data);
                setProjects(projectsResponse.data);

                // Fetch user profile details
                const userResponse = await axios.get('http://127.0.0.1:8000/api/user-profile/');
                setUserProfilePicture(userResponse.data.profile_picture);
                setNotificationsAvailable(userResponse.data.notifications.length > 0); // If there are notifications

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;

    // Date handling for tasks
    const today = new Date();
    const todayISOString = today.toISOString().split('T')[0];

    const upcomingTasks = tasks.filter(task => new Date(task.due_date) > today);
    const todayTasks = tasks.filter(task => new Date(task.due_date).toISOString().split('T')[0] === todayISOString);
    const overdueTasks = tasks.filter(task => new Date(task.due_date) < today && task.status !== 'completed');
    const inProgressTasks = tasks.filter(task => task.status === 'in_progress');

    return (
        <div className="dashboard">
            <div className="background-overlay" /> {/* Add this div for the background blur */}
            <div className="left-column">
                <h1>
                    <img src={logo} alt="Taskly Logo" width="40" height="40" /> Taskly
                </h1>
                <ul>
                    <li>
                        <NavLink to="/dashboard" activeClassName="active">
                            <MdDashboard /><i className="icon-dashboard" /> Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/tasks" activeClassName="active">
                            <FaTasks /><i className="icon-tasks" /> My Tasks
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/calendar" activeClassName="active">
                            <FaCalendarAlt /><i className="icon-calendar" /> Calendar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/statistics" activeClassName="active">
                            <FcStatistics /><i className="icon-statistics" /> Statistics
                        </NavLink>
                    </li>
                    
                </ul>
                <li className="settings">
                        <NavLink to="/settings" activeClassName="active">
                            <IoIosSettings /><i className="icon-settings" /> Settings
                        </NavLink>
                </li>
            </div>

            <div className="right-column">
                <div className="header-row">
                    <h2>Hi {username}</h2>
                    <div className="header-buttons">
                        <button className="create-button">
                            <IoIosAddCircle /><span>Create</span>
                        </button>
                        <button className="icon-button">
                            <IoMdSearch />
                        </button>
                        <button className="icon-button">
                            {notificationsAvailable ? <MdNotificationsActive /> : <MdOutlineNotificationsNone />}
                        </button>
                        <button className="icon-button">
                            {userProfilePicture ? (
                                <img src={userProfilePicture} alt="User Profile" className="user-profile-pic" />
                            ) : (
                                <FaUser />
                            )}
                        </button>
                    </div>
                </div>

                <div className="main-content">
                    <div className="row">
                    <div className="card">
                        <h2>Upcoming Tasks</h2>
                            <p>Total: {upcomingTasks.length}</p>
                            <ul>
                                {upcomingTasks.map(task => (
                                <li key={task.id}>{task.title}</li>
                                ))}
                            </ul>
                    </div>
                    <div className="card">
                        <h2>Today's Tasks</h2>
                        <p>Total: {todayTasks.length}</p>
                        <ul>
                            {todayTasks.map(task => (
                                <li key={task.id}>{task.title}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="card">
                        <h2>Tasks in Progress</h2>
                        <p>Total: {inProgressTasks.length}</p>
                        <ul>
                            {inProgressTasks.map(task => (
                                <li key={task.id}>{task.title}</li>
                            ))}
                        </ul>
                    </div>
                    </div>

                    <div className="row">
                        <div className="card overdue-centered">
                            <h2>Overdue Tasks</h2>
                            <p>Total: {overdueTasks.length}</p>
                            <ul>
                                {overdueTasks.map(task => (
                                    <li key={task.id}>{task.title}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className="card">
                            <h2>Last Projects</h2>
                            <ul>
                                {projects.map(project => (
                                    <li key={project.id}>{project.title}</li>
                                ))}
                            </ul>
                        </div>
                    <div className="card">
                        <h2>Last Activity</h2>
                        <p>No recent activity recorded.</p> {/* Placeholder */}
                    </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
