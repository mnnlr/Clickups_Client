import { useState } from "react";
import { axiosPrivate } from "../CustomAxios/customAxios";
import Cookies from "js-cookie";

export const useCreateDocInCloud = ({ documentId, data }) => {
    const [CreateDocLoading, setCreateDocLoading] = useState(false);
    const [CreateDocError, setCreateDocError] = useState(null);
    const [selectedDocRes, setSelectedDocRes] = useState(null);
    const token = Cookies.get("User");

    const createDocument = async () => {
        if (!data || !documentId) return;

        try {
            setCreateDocLoading(true);
            const res = await axiosPrivate.post(`/api/cloudData`, { documentId, data }, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            });
            setSelectedDocRes(res);
        } catch (err) {
            setCreateDocError(err);
        } finally {
            setCreateDocLoading(false);
        }
    };

    return { CreateDocLoading, CreateDocError, selectedDocRes, createDocument };
};
