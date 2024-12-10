import { axiosPrivate } from '../CustomAxios/customAxios';
import Cookies from 'js-cookie';

export const CreateDocument = async ({ newDocumentData }) => {

    const token = Cookies.get("User");

    try {
        const response = await axiosPrivate.post('/api/workspace/documents', newDocumentData, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            withCredentials: true
        });
        console.log("data:", response)
        if (response.data.success) {
            console.log("response: ", response);
            return response.data.data;
        } else {
            console.error('Error in response:', response);
            return null;
        }
    } catch (error) {
        console.error('Error creating document:', error.message); // log the error message for better context
        return null;
    }

}
