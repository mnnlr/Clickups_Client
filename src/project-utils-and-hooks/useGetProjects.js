import { useEffect, useState } from 'react'
import { mockProjects } from './mockProjects';
import Cookies from "js-cookie";
import { axiosPrivate } from '../CustomAxios/customAxios';

export default function useGetProjects() {
    const [projects, setProjects] = useState(mockProjects);
    const [loading, setLoading] = useState(false);

    const token = Cookies.get("User");

    useEffect(() => {
        getProjects();
    }, [token]);

    const getProjects = async () => {
        try {
            setLoading(true);
            const response = await axiosPrivate.get("/api/projects", {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
            });

            const responseData = response.data.Data.length === 0
                ? mockProjects
                : response.data.Data.map((project) => {
                    console.log("Processing project:", project);

                    // Safely handle teams
                    const teams = project.teams ? {
                        teamIDs: Array.isArray(project.teams.teamIDs)
                            ? project.teams.teamIDs.map((team) => ({
                                id: team._id,
                                name: team.teamName,
                            }))
                            : [],  // Return empty array if teamIDs is not an array
                        memberIDs: Array.isArray(project.teams.memberIDs)
                            ? project.teams.memberIDs.map((member) => ({
                                id: member._id,
                                name: member.name,
                                email: member.email,
                            }))
                            : [],  // Return empty array if memberIDs is not an array
                    } : {
                        teamIDs: [],
                        memberIDs: [],
                    };

                    return {
                        id: project._id,
                        projectName: project.projectName,
                        description: project.description,
                        teams: teams,  // Add the processed teams
                        owner: project.owner._id,  // Return more details if needed
                        dueDate: project.dueDate,
                        status: project.status,
                    };
                });

            setProjects(responseData);
            setLoading(false);
        } catch (err) {
            console.error("Error's from useGetProjects while fetching projects:", err);
            setLoading(false);
        }
    };

    return { projects, setProjects, loading, getProjects }
}
