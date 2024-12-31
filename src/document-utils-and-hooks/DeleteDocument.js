import { axiosPrivate } from "../CustomAxios/customAxios";
import Cookies from "js-cookie";

export default async function DeleteDocument({ workspaceId, docId }) {
    const token = Cookies.get("token");

    // console.log(workspaceId)
    const cloudDelete = await axiosPrivate.delete(`/api/cloudData/${docId}`, {
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });
    console.log("cloudDelete", cloudDelete)
    if (cloudDelete.status === 200) {
        const response = await axiosPrivate.delete(`/api/workspace/documents/${docId}?workspaceId=${workspaceId}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
        });
        if (response.data.success) {
            return true;
        } else {
            console.error("error while updating document:", response);
            return false;
        }
    } else {
        console.error("error while deleting cloudinary data:", cloudDelete)
    }
    /* const response = await axiosPrivate.delete(`/api/workspace/documents/${docId}?workspaceId=${workspaceId}`, {
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });
    if (response.data.success) {
        return true;
    } else {
        console.error("error while updating document:", response);
        return false;
    } */
}
