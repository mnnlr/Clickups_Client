import { axiosPrivate } from "../../CustomAxios/customAxios";
import Cookies from "js-cookie"

export const fetchAllWorkspace = async (setAllWorkspaces) => {
    const token = Cookies.get("User");

    try {
        const response = await axiosPrivate.get("/api/workspaces", {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
        })

        // console.log("response", response);
        setAllWorkspaces(response.data.data);
    } catch (err) {
        console.log("Error while fethcing the workspaces from backend: ", err)
    }
}