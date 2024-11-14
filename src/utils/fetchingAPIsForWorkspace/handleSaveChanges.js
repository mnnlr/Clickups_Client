import { axiosPrivate } from "../../CustomAxios/customAxios";
import Cookies from "js-cookie";

export const handleSaveChanges = async (e, workspaceToEdit, newWorkspaceName, setAllWorkspaces, closeModal) => {
    e.preventDefault();
    const token = Cookies.get("User");
    if (workspaceToEdit) {
        const updatedWorkspace = {
            workspaceName: newWorkspaceName
        };

        try {
            const response = await axiosPrivate.patch(`/api/workspaces/${workspaceToEdit._id}`, updatedWorkspace, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setAllWorkspaces((prevWorkspaces) =>
                    prevWorkspaces.map(workspace =>
                        workspace._id === workspaceToEdit._id ? response.data : workspace
                    )
                );
                closeModal();
            } else {
                throw new Error('Failed to update workspace');
            }
        } catch (error) {
            console.error('Error updating workspace:', error);
        }
    }
};