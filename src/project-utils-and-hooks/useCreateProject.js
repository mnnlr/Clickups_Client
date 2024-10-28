import Cookies from "js-cookie"
import { axiosPrivate } from "../CustomAxios/customAxios";
import { toast } from 'react-toastify';

export default function useCreateProject({ projects, projectData, selectedTeams, setProjects, closeModal }) {

    const token = Cookies.get("User");

    const createProject = async () => {
        const newProject = {
            id: `proj${projects.length + 1}`,
            ...projectData,
            teams: selectedTeams,
        };

        // const MembersIds = selectedTeams.map(id => ({ teamData: id }));

        try {
            if (projectData) {

                const dataForBackend = {
                    projectName: projectData.projectName,
                    description: projectData.description,
                    dueDate: projectData.dueDate,
                    owner: projectData.owner,
                    status: projectData.status
                };

                const projectResponse = await axiosPrivate.post("/api/projects", dataForBackend, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                });

                // console.log("responce: ", projectResponse)


                if (projectResponse.status === 201) {
                    toast.success("Project Created ")
                    setProjects([...projects, newProject]);

                    closeModal();
                }
            }
        } catch (err) {
            console.log(err);
            alert("Something went wrong. ( Try to change project title and description )");
        }
    };

    return { createProject }
}
