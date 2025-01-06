import { useState, useEffect } from "react";
import { fetchAllUsers } from "../utils/fetchingAPIsForWorkspace/fetchAllUsers";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import customAxios from "../CustomAxios/customAxios";
import { useSelector } from "react-redux";

const addMemberModalHook = (workspaceToEdit, setIsAddMembersModalOpen, setIsFormVisible) => {
  const token = Cookies.get("User");

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [initialMembers, setInitialMembers] = useState([]);
  const {user}=useSelector((store)=>store.login);

  useEffect(() => {
    const initializeMembers = async () => {
      // const Allusers=await fetchAllUsers();

       await fetchAllUsers(setAvailableMembers);

      if (workspaceToEdit?.workspaceMembers) {
        setInitialMembers(workspaceToEdit.workspaceMembers);
        setSelectedMembers(workspaceToEdit.workspaceMembers);

      //   const filteredUsers = allUsers.filter(
      //     (user) =>
      //       !workspaceToEdit.workspaceMembers.some(
      //         (member) => member.id === user.id || member._id === user.id
      //       )
      //   );
      //   setAvailableMembers(filteredUsers);
      // } else {
      //   setAvailableMembers(allUsers);
       }
    };

    initializeMembers();
  }, [workspaceToEdit,token]);

  // useEffect(()=>{
  //   const GetallUsers=async()=>{
  //     fetchAllUsers(setAvailableMembers)
  //   }
  //   GetallUsers();
  // })

  const handlemembersubmit = async (e) => {
    e.preventDefault();
    if (!workspaceToEdit) {
      console.error("No workspace to edit!");
      return;
    }

    const workspaceId = workspaceToEdit._id;

    const initialMemberIds = initialMembers.map((member) => member.id || member._id);
    const selectedMemberIds = selectedMembers.map((member) => member.id || member._id);

    const membersToAdd = selectedMemberIds.filter((id) => !initialMemberIds.includes(id));
    const membersToRemove = initialMemberIds.filter((id) => !selectedMemberIds.includes(id));
   
    try {
      // Add members
      if (membersToAdd.length > 0) {
        await customAxios.patch(
          `/api/workspaces/${workspaceId}/add`,
          { members: membersToAdd, action: "add" },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Members added:", membersToAdd);
      }

      // Remove members
      if (membersToRemove.length > 0) {
        await customAxios.patch(
          `/api/workspaces/${workspaceId}/add`,
          { members: membersToRemove, action: "remove" },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Members removed:", membersToRemove);
      }

      toast.success("Workspace saved successfully!");
      if (setIsAddMembersModalOpen) setIsAddMembersModalOpen(false);
      if (setIsFormVisible) setIsFormVisible(false);
    } catch (error) {
      console.error("Error updating workspace members:", error);
      toast.error("Failed to update workspace members. Please try again.");
    }
  };

  const handleAddMember = (memberId) => {
    if(user._id!==memberId){ // Ensuring the member is not a admin
    const memberToadd=!selectedMembers.some((member) => member.id === memberId || member._id === memberId)//ensuring the member is not already present in selected members
   
    const Findmember = availableMembers.find(
      (member) => member.id === memberId || member._id === memberId
    );
    if (memberToadd) {
      setSelectedMembers((prev) => [...prev, Findmember]);

      // setAvailableMembers((prev) =>
      //   prev.filter((member) => !(member.id === memberId || member._id === memberId))
      // );
      console.log(memberToadd)
    } else {
      toast.info("User already exists in the workspace.");
    }
    }else{
      toast.info("User already exists in the workspace.");
    }
  };

  const handleRemoveMember = (memberId) => {
    const memberToRemove = selectedMembers.find(
      (member) => member.id === memberId || member._id === memberId
    );

    if (memberToRemove) {
      setSelectedMembers((prev) =>
        prev.filter((member) => !(member.id === memberId || member._id === memberId))
      );
    }
  };

  return {
    availableMembers,
    selectedMembers,
    handleAddMember,
    handleRemoveMember,
    setSelectedMembers,
    handlemembersubmit,
  };
};

export default addMemberModalHook;
