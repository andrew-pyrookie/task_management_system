import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectCollaboration = ({ projectId }) => {
    const [collaborators, setCollaborators] = useState([]);
    const [userIdToAdd, setUserIdToAdd] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCollaborators = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/projects/${projectId}/collaborators/`);
                setCollaborators(response.data.collaborators);
            } catch (error) {
                console.error('Error fetching collaborators:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCollaborators();
    }, [projectId]);

    const handleAddCollaborator = async () => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/projects/${projectId}/add_collaborator/`, { user_id: userIdToAdd });
            setCollaborators([...collaborators, userIdToAdd]);
            setUserIdToAdd('');
        } catch (error) {
            console.error('Error adding collaborator:', error);
        }
    };

    const handleRemoveCollaborator = async (userId) => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/projects/${projectId}/remove_collaborator/`, { user_id: userId });
            setCollaborators(collaborators.filter(id => id !== userId));
        } catch (error) {
            console.error('Error removing collaborator:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h3>Collaborators</h3>
            <ul>
                {collaborators.map(userId => (
                    <li key={userId}>
                        {userId} <button onClick={() => handleRemoveCollaborator(userId)}>Remove</button>
                    </li>
                ))}
            </ul>
            <input 
                type="text" 
                value={userIdToAdd} 
                onChange={(e) => setUserIdToAdd(e.target.value)} 
                placeholder="User ID to add" 
            />
            <button onClick={handleAddCollaborator}>Add Collaborator</button>
        </div>
    );
};

export default ProjectCollaboration;
