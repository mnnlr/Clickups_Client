// import { axiosPrivate } from "../CustomAxios/customAxios"

// export async function GetDocumentContent(documentId) {
//     try {
//         const res = await axiosPrivate.get(`/api/cloudData?documentId=${documentId}`, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//         // console.log(res.data)
//         if (res.data.success) return res.data.data;
//         if (!res.data.success) return "No Content.";
//     } catch (err) {
//         console.log("err: ", err);
//         if (err.response) return "Error while fetching document content.";
//     }
// }

import { useState } from "react";
import { axiosPrivate } from "../CustomAxios/customAxios";

export const useGetDocumentContent = () => {
    const [GetDocLoading, setGetDocLoading] = useState(false);
    const [GetDocError, setGetDocError] = useState(null);
    const [GetDocData, setGetDocData] = useState(null);

    const getDocumentContent = async (documentId) => {
        if (!documentId) return;
        try {
            setGetDocLoading(true);
            const res = await axiosPrivate.get(`/api/cloudData?documentId=${documentId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setGetDocData(res.data.data);
        } catch (err) {
            setGetDocError(err);
        } finally {
            setGetDocLoading(false);
        }
    };

    return { GetDocLoading, GetDocError, GetDocData, getDocumentContent };
};