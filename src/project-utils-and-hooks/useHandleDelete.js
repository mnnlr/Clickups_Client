import { toast } from 'react-toastify';
import { axiosPrivate } from '../CustomAxios/customAxios';
import Cookies from "js-cookie"

export default function useHandleDelete({ projectTodelete, projects, setProjects, setdeleteModel, setprojectTodelete }) {
    const token = Cookies.get("User");

    const handleDelete = async () => {
        if (projectTodelete) {
            try {
                const response = await axiosPrivate.delete(`/api/projects/${projectTodelete}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${token}`
                    },
                });

                if (response.status === 200) {
                    setProjects(prevProjects => prevProjects.filter((proj) => proj.id !== projectTodelete));
                    toast.success("Project deleted successfully.");
                    setdeleteModel(false);
                    setprojectTodelete(null);
                } else {
                    toast.error("Something went wrong: " + response.data.message);
                }
            } catch (err) {
                console.error("Error in handleDelete:", err);
                toast.error("Something went wrong: " + err.message);
            }
        }
    };

    return { handleDelete }
}
