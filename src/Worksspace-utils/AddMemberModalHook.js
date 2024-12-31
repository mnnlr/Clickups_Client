import { useState, useEffect } from 'react';
import customAxios from '../CustomAxios/customAxios';
import { fetchAllUsers } from '../utils/fetchingAPIsForWorkspace/fetchAllUsers';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const addMemberModalHook = (workspaceToEdit,setIsAddMembersModalOpen,setIsFormVisible) => {
  const token = Cookies.get("User");

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [initialMembers, setInitialMembers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      await fetchAllUsers(setAvailableMembers);
    };

    // Load initial members of the workspace
    if (workspaceToEdit && workspaceToEdit.workspaceMembers) {
      setInitialMembers(workspaceToEdit.workspaceMembers);
      setSelectedMembers(workspaceToEdit.workspaceMembers);
    }

    fetchUsers();
  }, [workspaceToEdit, token]);

  const handlemembersubmit = async (e) => {
    e.preventDefault();

    if (!workspaceToEdit) {
      console.error('No workspace to edit!');
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
          { members: membersToAdd, action: 'add' },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Members added:', membersToAdd);
      }

      // Remove members
      if (membersToRemove.length > 0) {
        await customAxios.patch(
          `/api/workspaces/${workspaceId}/add`,
          { members: membersToRemove, action: 'remove' },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Members removed:', membersToRemove);
      }

      // alert('Workspace members updated successfully!');
      toast.success("Workspace Save Successfully")
      setIsAddMembersModalOpen?setIsAddMembersModalOpen(false):""
      setIsFormVisible?setIsFormVisible(false):""
    } catch (error) {
      console.error('Error updating workspace members:', error);
      alert('Failed to update workspace members. Please try again.');
    }
  };

  const handleAddMember = (memberId) => {
    if (!workspaceToEdit) {
      console.error('No workspace to edit!');
      return;
    }

    if (!selectedMembers.some((member) => member.id === memberId || member._id === memberId)) {
      const memberToAdd = availableMembers.find(
        (member) => member.id === memberId || member._id === memberId
      );

      if (memberToAdd) {
        const updatedMembers = [...selectedMembers, memberToAdd];
        setSelectedMembers(updatedMembers);
        console.log('Member added:', memberToAdd);
      }
    }
  };

  const handleRemoveMember = (memberId) => {
    if (!workspaceToEdit) {
      console.error('No workspace to edit!');
      return;
    }

    const updatedMembers = selectedMembers.filter(
      (member) => !(member.id === memberId || member._id === memberId)
    );
    setSelectedMembers(updatedMembers);
    console.log('Member removed:', memberId);
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
