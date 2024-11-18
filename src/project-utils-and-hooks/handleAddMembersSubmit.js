import { axiosPrivate } from "../CustomAxios/customAxios";
import Cookies from "js-cookie"
import { toast } from 'react-toastify';

const handleAddMembersSubmit = async (e, currentProject, projects, selectedTeams, selectedMembers, setProjects, closeAddMembersModal, getProjects) => {
    e.preventDefault();

    const token = Cookies.get("User");

    if (currentProject) {
        const updatedProjects = projects.map((proj) =>
            proj.id === currentProject.id
                ? { ...proj, teams: selectedTeams }
                : proj
        );

        const updateData = {
            teams: {
                teamIDs: selectedTeams.length > 0 ? selectedTeams.map(team => team.id) : [],
                memberIDs: selectedMembers.length > 0 ? selectedMembers.map(member => member.id) : []
            }
        };
        // console.log(updateData);

        try {
            const response = await axiosPrivate.patch(`/api/projects/${currentProject.id}/add`,
                updateData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${token}`
                    },
                }
            );
            if (response.status === 200) {
                setProjects(updatedProjects);
                closeAddMembersModal();
                getProjects();
                toast.success("Project teams updated successfully.");
            }
        } catch (err) {
            console.log(err);
            if (err.response && err.response.data && err.response.data.errors) {
                const errorMessages = err.response.data.errors.map(error => error.msg).join('\n');
                toast.error("Failed to update project teams:\n" + errorMessages);
            } else {
                toast.error("Failed to update project teams: " + (err.response?.data?.message || err.message));
            }
        }
    }
};

export default handleAddMembersSubmit;