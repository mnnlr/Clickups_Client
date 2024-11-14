import { axiosPrivate } from "../../CustomAxios/customAxios";
import Cookies from "js-cookie";

export const fetchAllUsers = async (setAvailableMembers) => {
    const token = Cookies.get("User");

    try {
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

        // console.log(responseData);
        setAvailableMembers(responseData);
    } catch (err) {
        console.log('Error fetching users: ' + (err.response ? err.response.data.message : err.message));
    }
};