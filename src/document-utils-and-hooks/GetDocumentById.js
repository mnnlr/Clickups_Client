import { useState } from "react";
import { axiosPrivate } from "../CustomAxios/customAxios"
import Cookies from 'js-cookie';
export const GetDocumentById = async (id, setMembersForPermissions) => {
    try {
        const token = Cookies.get("User");
        console.log(id)
        const response = await axiosPrivate.get(`/api/workspace/documents/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
        })
        setMembersForPermissions(response.data.data)
        console.log(response.data.data)
    } catch (error) {
        console.log(error)
    }
}