import { axiosPrivate } from "../../CustomAxios/customAxios";
import Cookies from 'js-cookie';

export const fetchWorkspaceById = async (workspaceId, setWorkspace) => {
  const token = Cookies.get("User");

  try {
    const response = await axiosPrivate.get(`api/workspaces/${workspaceId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      setWorkspace(response.data.data); // Set the full workspace object
    }
  } catch (error) {
    console.error('Error fetching workspace:', error);
  }
};
