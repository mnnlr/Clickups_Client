import React, { useState } from 'react'
import { axiosPrivate } from '../CustomAxios/customAxios';
import Cookies from "js-cookie"

export default function useUpdateProject({ projects, setProjects, closeEditModal, showToast, projectData, currentProject, selectedTeams }) {

    const token = Cookies.get("User");

    const updateProject = async () => {
        const updatedProjects = projects.map((proj) =>
            proj.id === currentProject.id
                ? { ...projectData, id: currentProject.id, teams: selectedTeams }
                : proj
        );

        const updateData = {
            ...currentProject,
            projectName: projectData.projectName,
            description: projectData.description,
            owner: projectData.owner,
            dueDate: projectData.dueDate,
            status: projectData.status,
            teams: selectedTeams.map(team => team.id)
        };

        try {
            const response = await axiosPrivate.patch(`/api/projects/${currentProject.id}`, updateData, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                showToast("Project updated successfully.", "success");
                setProjects(updatedProjects);
                closeEditModal();
            }
        } catch (err) {
            console.log(err);
            alert("Something went wrong: " + err.response.data.message || err);
        }
    };

    return { updateProject }
}
