import { toast } from 'react-toastify';
import { axiosPrivate } from '../CustomAxios/customAxios';
import Cookies from 'js-cookie';
export const handleSavePermission=async({docId,MembersForPermissions,PermissionForAll,setIsPermissionsModalOpen})=>{
    try{
        console.log(MembersForPermissions)
const token = Cookies.get("User");
  const  response = await axiosPrivate.patch(`/api/workspace/documents/Permission/${docId}`, {Members:MembersForPermissions,PermissionForAll}, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                withCredentials: true
            });

            if(response.status===200){
                toast.success("Permissions Update Successfully")
                setIsPermissionsModalOpen(false); // close permission modal
            }else if(response.status==500){
                toast.error("Something Went Wrong Try Later")
            }else if(response.status===404){
                console.log("Document Not Found")
            }else if(response.status===400){
                console.log("Something Went Wrong Try Later")
            }

        }catch(error){
            console.log(error)
            toast.error("Something went wrong Try Later")
        }

}