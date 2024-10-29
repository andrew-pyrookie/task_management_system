import React from 'react';
import ProjectCollaboration from './ProjectCollaboration';

const ProjectDetail = ({ project, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <small>Created at: {new Date(project.created_at).toLocaleString()}</small>
                <ProjectCollaboration projectId={project.id} />
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ProjectDetail;
