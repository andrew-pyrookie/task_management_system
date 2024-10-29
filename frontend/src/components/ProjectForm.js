import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectForm = ({ projectId, onClose, onProjectSaved }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');

    useEffect(() => {
        if (projectId) {
            // Fetch existing project data for editing
            const fetchProject = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/projects/${projectId}/`);
                    const project = response.data;
                    setTitle(project.title);
                    setDescription(project.description);
                    setStatus(project.status);
                } catch (error) {
                    console.error('Error fetching project:', error);
                }
            };

            fetchProject();
        }
    }, [projectId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectData = {
            title,
            description,
            status,
        };

        try {
            if (projectId) {
                // Update existing project
                await axios.put(`http://127.0.0.1:8000/api/projects/${projectId}/`, projectData);
            } else {
                // Create new project
                await axios.post('http://127.0.0.1:8000/api/projects/', projectData);
            }
            onProjectSaved(); // Call the callback to refresh the project list
            onClose(); // Close the form
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{projectId ? 'Edit Project' : 'Create Project'}</h2>
                <form onSubmit={handleSubmit}>
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
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <button type="submit">{projectId ? 'Update' : 'Create'}</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;
