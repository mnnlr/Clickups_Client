import { axiosPrivate } from "../CustomAxios/customAxios";
import Cookies from "js-cookie";
export default async function GetDocuments(workspaceId) {
    const token = Cookies.get("User");
    try {
        const response = await axiosPrivate.get('/api/workspace/documents', {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
        });
        if (response.data.success) {
            const documents = response.data.data.filter(doc => doc.workspaceId === workspaceId);
            // console.log(documents);
            return documents;
        } else {
            console.error(response);
            return null;
        }
    } catch (error) {
        console.error("Something went wrong while getting document from server: ", error);
        return null;
    }
}
