import { useEffect, useState } from "react";
import { axiosPrivate } from "../CustomAxios/customAxios";
import Cookies from "js-cookie"

const useGetMembers = () => {

    const [availableMembers, setAvailableMembers] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = Cookies.get("User");

    useEffect(() => {
        getMembers();
    }, [token])

    const getMembers = async () => {
        try {
            setLoading(true);
            const response = await axiosPrivate.get("/api/users/get-all-users", {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            });
            const responseData = response.data.users.map(item => ({
                id: item._id,
                name: item.name,
                email: item.email,
            }));
            setAvailableMembers(responseData);
            setLoading(false)
        } catch (err) {
            console.log("Error's from useGetMembers: ", err);
            setLoading(false);
        }
    }

    return { availableMembers, setAvailableMembers, loading, getMembers };
};

export default useGetMembers;