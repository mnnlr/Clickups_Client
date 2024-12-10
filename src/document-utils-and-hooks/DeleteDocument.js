import { axiosPrivate } from "../CustomAxios/customAxios";
import Cookies from "js-cookie";

export default async function DeleteDocument({ workspaceId, docId }) {
    const token = Cookies.get("token");

    console.log(workspaceId)

    const response = await axiosPrivate.delete(`/api/workspace/documents/${docId}`, workspaceId, {
        header: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    if (response.data.success) {
        return response.data.data;
    } else {
        console.error("error while updating document:", response);
        return null;
    }
}
