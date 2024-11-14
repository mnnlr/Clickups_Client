import { axiosPrivate } from "../../CustomAxios/customAxios";
import Cookies from "js-cookie";

export const handleAddWorkspace = async (e, newWorkspaceName, user, setAllWorkspaces, setNewWorkspaceName, setWorkspaceType, closeModal) => {
    e.preventDefault();

    const token = Cookies.get("User");

    const newWorkspace = {
        workspaceName: newWorkspaceName,
        workspaceCreatedBy: user._id,
        workspaceDocuments: [],
        workspaceMembers: [],
    };

    if (newWorkspace) {
        try {
            const response = await axiosPrivate.post('/api/workspaces/', newWorkspace, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
            });
            // console.log(response)
            if (response.data.success) {
                setAllWorkspaces((prevWorkspaces) => [...prevWorkspaces, response.data]);
                setNewWorkspaceName('');
                setWorkspaceType('');
                closeModal();
            } else {
                throw new Error('Failed to add workspace');
            }
        } catch (error) {
            console.error('Error adding workspace:', error);
        }
    }
};