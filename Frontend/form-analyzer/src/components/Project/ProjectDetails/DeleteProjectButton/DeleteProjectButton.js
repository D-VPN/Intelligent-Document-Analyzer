import React from 'react'
import { AwesomeButton } from "react-awesome-button";
import axios from '../../../../helper/axios';
import { useNavigate } from 'react-router-dom';
export default function DeleteProjectButton({ projectId, setLoading }) {
    const navigate = useNavigate();

    const deleteProject = async () => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                setLoading(true);
                const { data } = await axios.delete(`/delete-project/`,
                    {
                        params: {
                            project_id: projectId,
                        },
                    }
                );
                navigate(-1);
            } catch (e) {
                setLoading(false);
            }
        }
    }

    return (
        <AwesomeButton type="primary"
            style={{ "margin": "10px", "color": "red" }}
            onPress={() => {
                deleteProject();
            }}
        >
            Delete Project
        </AwesomeButton>
    )
}
