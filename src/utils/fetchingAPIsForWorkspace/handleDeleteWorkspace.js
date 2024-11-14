import { axiosPrivate } from "../../CustomAxios/customAxios";
import Cookies from "js-cookie";

export const handleDeleteWorkspace = async (setAllWorkspaces, workspaceId) => {
    const token = Cookies.get("User");

    try {
        const response = await axiosPrivate.delete(`/api/workspaces/${workspaceId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log(response);
        if (response.success) {
            setAllWorkspaces((prevWorkspaces) =>
                prevWorkspaces.filter((workspace) => workspace._id !== workspaceId)
            );
            console.log('Workspace deleted successfully');
        }
    } catch (error) {
        console.error('Error deleting workspace:', error);
    }
};