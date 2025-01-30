import { useState} from 'react';
import { CreateDocument } from './CreateDocument.js';
import UpdateDocument from './UpdateDocument.js';
import { showToast } from '../components/Toastconfig.jsx';
import DeleteDocument from './DeleteDocument.js';
import { GetDocumentById } from './GetDocumentById.js';

  



  export const handleAddDocument = async () => {
    if (newDocName.trim()) {
      // const newDocument = { id: Date.now(), name: newDocName, content: '', permissions: { canEdit: false, canView: true, members: [] } };
      const newDocumentData = {
        documentTitle: newDocName,
        createdBy: user._id,
        workspaceId: _id,
        // permissions: {
        //   canEdit: false,
        //   canView: true,
        // },
        permissions:
          AllMembersInWorkspace.workspaceMembers
      };

      try {
        const res = await CreateDocument({ newDocumentData });
        const newDocument = {
          _id: res._id,
          documentTitle: res.documentTitle,
          content: res.content,
          permissions: res.permissions,
          createdBy: res.createdBy
        };
        if (res) {
          showToast("Document created successfully.", "success");
          setUserDocs([...userDocs, newDocument]);
          setNewDocName('');
          setIsCreateModalOpen(false);
          console.log("New document created: ", res);
        } else {
          showToast("Failed to create document.", "error");
          console.error('Failed to create document.');
        }
      } catch (error) {
        showToast("Something went wrong while creating document.", "error");
        console.error('Error in handleAddDocument:', error);
      }
    }
  };




   





  export const handleSaveEdit = async ({newDocName,setNewDocName}) => {
    // const [newDocName, setNewDocName] = useState('');
    if (newDocName.trim() && selectedDoc) {
      const updatedDocData = {
        documentTitle: newDocName.trim(),
      }

      const res = await UpdateDocument({ docId: selectedDoc._id, updatedData: updatedDocData });
      if (res) {
        showToast("Document updated successfully.", "success");
        setUserDocs(
          userDocs.map((doc) =>
            doc._id === selectedDoc._id ? { ...doc, documentTitle: newDocName.trim() } : doc
          )
        );
        setIsEditModalOpen(false);
        setSelectedDoc(null);
        setNewDocName('');
      } else {
        showToast("Failed to update document.", "error");
      }
    }
  };

  export const handlePermission = (doc) => {
    try {
      setSelectedDoc(doc); // Set the selected document

      GetDocumentById(doc._id, (permissions) => {        // get all permissions members from server
        setMembersForPermissions(permissions); // Update state
        console.log("Permissions fetched and state updated:", permissions);

        // Add new members to permissions
        const UpdateUsers = AllMembersInWorkspace.workspaceMembers.map((workSpaceMember) => {  // cheak all workspace member is present or not in permission other wise add canview and can add for permission
          const AlreadyExistMember = permissions.find((member) => (
            member.user._id === workSpaceMember._id
          ));
          return AlreadyExistMember
            ? AlreadyExistMember
            : {
              user: workSpaceMember,
              canView: true,
              canEdit: false,
            };
        });

        // Filter out members no longer in the workspace
        const PerMissionMembers = UpdateUsers.filter((member) =>
          AllMembersInWorkspace.workspaceMembers.some(
            (workspaceMember) => workspaceMember._id === member.user._id
          ) 
        );

        // remove login user itself to not show itself in permission.
        const FinalPerMissionMembers = PerMissionMembers.filter((member) => !(member.user._id === user._id))
        console.log(FinalPerMissionMembers)
        setMembersForPermissions(FinalPerMissionMembers);
        setIsPermissionsModalOpen(true);
      });
    } catch (error) {
      console.error("Error in handlePermission:", error);
    }
  };

  export  const handleToggleGivePermition = (event, members, permissionType) => {
    const updatedMembers = MembersForPermissions.map((m) => {
      if (m.user._id === members.user._id) {
        // Toggle the permission for the matching user
        return {
          ...m,
          [permissionType]: event.target.checked, // Update the value based on the checkbox state
        };
      }
      return m; // Return other members unchanged
    });
    setMembersForPermissions(updatedMembers); // Update the state with the modified array

    console.log(updatedMembers)

  }

  export  const handleDelete = async (doc) => {
    const res = await DeleteDocument({ docId: doc._id, workspaceId: _id });
    if (res) {
      showToast("Document deleted successfully.", "success");
      setUserDocs(userDocs.filter((d) => d._id !== doc._id));
    } else {
      showToast("Failed to delete document.", "error");
    }
  };





