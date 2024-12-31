import { useState, useEffect } from 'react';
import { PlusIcon } from "@heroicons/react/24/solid";
import { useLocation } from 'react-router-dom';
import AddMembersModal from '../components/Models/AddMemberModal';
import addMemberModalHook from '../Worksspace-utils/AddMemberModalHook';
import AvailableMembersShow from './AvailableMembersShow';
import { fetchWorkspaceById } from '../utils/fetchingAPIsForWorkspace/fetchWorkspaceById';

function AddUser() {
  const { state } = useLocation();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [workspace, setWorkspace] = useState(null);
  const workspaceId = state?.workspace?._id;

  const {
    availableMembers,
    selectedMembers,
    handleAddMember,
    handleRemoveMember,
    setSelectedMembers,
    handlemembersubmit
  } = addMemberModalHook(workspace,setIsFormVisible);

  useEffect(() => {
    if (workspaceId) {
      fetchWorkspaceById(workspaceId, setWorkspace);
    }
  }, [isFormVisible]);

  const closeAddMembersModal = () => {
    setIsFormVisible(false);
  };

  return (
    <div>
      <div className='flex w-36 justify-end items-center'>
        <AvailableMembersShow workspace={workspace} />
        <div
          className='bg-red-100 rounded-full p-2 z-0 ml-2 cursor-pointer'
          onClick={() => {
            setSelectedMembers(workspace?.workspaceMembers || []);
            setIsFormVisible(true);
          }}
        >
          <PlusIcon className='h-4 w-4' />
        </div>
      </div>

      {isFormVisible && (
        <AddMembersModal
          title={"Add Members to Workspace"}
          availableMembers={availableMembers}
          selectedMembers={selectedMembers}
          onAddMember={(memberId) => {
            handleAddMember(memberId);
          }}
          onRemoveMember={(memberId) => handleRemoveMember(memberId)}
          onClose={closeAddMembersModal}
          onSubmit={handlemembersubmit}
        />
      )}
    </div>
  );
}

export default AddUser;
