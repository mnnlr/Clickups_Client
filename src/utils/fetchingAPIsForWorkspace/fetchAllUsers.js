import { axiosPrivate } from "../../CustomAxios/customAxios";
import Cookies from "js-cookie";

export const fetchAllUsers = async (setAvailableMembers) => {
  const token = Cookies.get("User");

  try {
    const response = await axiosPrivate.get("/api/users/get-all-users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const users = response.data.users.map((item) => ({
      id: item._id,
      name: item.name,
      email: item.email,
    }));
    setAvailableMembers(users)
    return users; // Return the formatted user data
  } catch (err) {
    console.error(
      "Error fetching users: " + (err.response?.data.message || err.message)
    );
    return []; // Return an empty array in case of an error
  }
};
