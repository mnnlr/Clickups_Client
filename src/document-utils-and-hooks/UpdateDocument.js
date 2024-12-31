import { axiosPrivate } from "../CustomAxios/customAxios";
import Cookies from "js-cookie";

export default async function UpdateDocument({ docId, updatedData }) {
    const token = Cookies.get("token");

    const response = await axiosPrivate.patch(`/api/workspace/documents/${docId}`, updatedData, {
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
