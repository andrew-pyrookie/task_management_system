import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectDetail from './ProjectDetail';
import ProjectForm from './ProjectForm'; // Import the ProjectForm component

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/projects/');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    const openForm = (projectId = null) => {
        setCurrentProjectId(projectId);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setCurrentProjectId(null);
    };

    const handleProjectSaved = () => {
        // Refresh the project list after saving
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/projects/');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    };

    return (
        <div>
            <h2>Project List</h2>
            <button onClick={() => openForm()}>Create New Project</button>
            <ul>
                {projects.map((project) => (
                    <li key={project.id} onClick={() => handleProjectClick(project)}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <small>Created at: {new Date(project.created_at).toLocaleString()}</small>
                        <button onClick={() => openForm(project.id)}>Edit</button>
                    </li>
                ))}
            </ul>

            {selectedProject && (
                <ProjectDetail project={selectedProject} onClose={closeModal} />
            )}

            {isFormOpen && (
                <ProjectForm
                    projectId={currentProjectId}
                    onClose={closeForm}
                    onProjectSaved={handleProjectSaved}
                />
            )}
        </div>
    );
};

export default ProjectList;
