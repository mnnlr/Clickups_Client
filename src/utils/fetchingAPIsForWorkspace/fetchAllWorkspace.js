import { axiosPrivate } from "../../CustomAxios/customAxios";
import Cookies from "js-cookie"

export const fetchAllWorkspace = async (setAllWorkspaces, user) => {
    const token = Cookies.get("User");

    try {
        const response = await axiosPrivate.get(`/api/workspaces/UserWorkspaces/${user._id}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            },
        });

        setAllWorkspaces(response.data.data);
    } catch (err) {
        console.error("Error while fetching the workspaces from backend:", err);
    }

}