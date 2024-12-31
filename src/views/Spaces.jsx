import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { DocumentIcon, PlusIcon, PencilIcon } from '@heroicons/react/24/solid';
import SearchBox from './Search';
import AddMember from './AddUser';
import Modal from '../components/Models/Modal'; // Assuming Modal is the same component for both edit and create
import { TextEditor } from '../components/TinyMCE_TextEditor/TextEditor';
import { GrUpdate } from "react-icons/gr";
import { useSelector } from 'react-redux';
import { CreateDocument } from '../document-utils-and-hooks/CreateDocument.js';
import GetDocuments from '../document-utils-and-hooks/GetDocuments.js';
import UpdateDocument from '../document-utils-and-hooks/UpdateDocument.js';
import { showToast } from '../components/Toastconfig';
import DeleteDocument from '../document-utils-and-hooks/DeleteDocument.js';
import { ExportToDoc } from '../document-utils-and-hooks/ExportToDoc.js';
// import { GetDocumentContent } from '../document-utils-and-hooks/useGetDocumentContent.js';
import { useGetDocumentContent } from '../document-utils-and-hooks/useGetDocumentContent.js';
import { useCreateDocInCloud } from '../document-utils-and-hooks/useCreateDocInCloud.js';
import DOMPurify from 'dompurify';
// import { IoCloudyNight } from 'react-icons/io5';
import useGetMembers from '../project-utils-and-hooks/useGetMembers';

const templates = {
  1: [ // Workspace type 1
    { id: 1, name: 'Nik Doc a', content: 'Content for Nike Doc a', permissions: { canEdit: true, canView: true, members: ['user1', 'user2'] } },
    { id: 2, name: 'Nik Doc b', content: 'Content for Nike Doc b', permissions: { canEdit: true, canView: true, members: ['user2', 'user3'] } },
    { id: 3, name: 'Nik Doc c', content: 'Content for Nike Doc c', permissions: { canEdit: false, canView: true, members: ['user1'] } },
    { id: 4, name: 'Nik Doc d', content: 'Content for Nike Doc d', permissions: { canEdit: true, canView: true, members: ['user1', 'user3'] } },
  ],
  // Other workspaces ...
};

const Workspaces = () => {
  const { _id } = useParams();
  const [userDocs, setUserDocs] = useState([]);
  const [selectedDocContent, setSelectedDocContent] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false); // Modal for Permissions
  const [newDocName, setNewDocName] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null); // Track the document being edited
  const [search, setSearch] = useState('');
  const [filteredDocs, setFilteredDocs] = useState([]);
  const { state } = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [editDocBtn, setEditDocBtn] = useState(true);
  const [AvailableMembers, setAvailableMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  // create document in cloudinary and updating the document
  const { CreateDocLoading, CreateDocError, createDocument } = useCreateDocInCloud({ documentId: selectedDoc, data: selectedDocContent });

  // get document content
  const { GetDocLoading, GetDocError, GetDocData, getDocumentContent } = useGetDocumentContent();

  const [permissions, setPermissions] = useState({
    canEdit: false,
    canView: false,
    members: []
  });

  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    GetDocuments(_id).then((docsData) => {
      showToast("Documents fetched successfully.", "success");
      setUserDocs(docsData);
    }).catch((error) => {
      showToast("Failed to fetch documents.", "error");
      console.error("Error fetching documents:", error);
    });
  }, [_id]);


  // fetch members from server
  const members = useGetMembers();
  console.log("available", members.availableMembers)
  useEffect(() => {
    setAvailableMembers(members.availableMembers)
  }, [members])
  

  useEffect(() => {
    // console.log("docs: ", userDocs)
    setFilteredDocs(
      userDocs.filter((doc) =>
        doc.documentTitle.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, userDocs]);

  // const handleDocClick = async (doc) => {
  //   setSelectedDoc(doc);
  //   // console.log(doc)

  //   // const DocContent = await GetDocumentContent(doc._id);
  //   // setSelectedDocContent(DOMPurify.sanitize(DocContent));

  //   getDocumentContent(doc._id);
  //   const DocContent = GetDocLoading ? { _html: "Loading..." } : GetDocError ? { _html: "Error while fetching document." } : GetDocData;
  //   setSelectedDocContent(DocContent);


  // };

  const handleDocClick = async (doc) => {
    setSelectedDoc(doc);
    getDocumentContent(doc._id);
  };

  useEffect(() => {
    if (GetDocData) {
      // console.log("GetDocData: ", GetDocData);
      setSelectedDocContent(GetDocData);
    } else if (GetDocError) {
      setSelectedDocContent("Error while fetching document.");
    } else if (GetDocLoading) {
      setSelectedDocContent("Loading Document...");
    } else {
      setSelectedDocContent("Start editing your document...");
    }
  }, [GetDocData, GetDocError, GetDocLoading]);


  const handleAddDocument = async () => {

    if (newDocName.trim()) {
      // const newDocument = { id: Date.now(), name: newDocName, content: '', permissions: { canEdit: false, canView: true, members: [] } };
      const newDocumentData = {
        documentTitle: newDocName,
        createdBy: user._id,
        workspaceId: _id,
        permissions: {
          canEdit: false,
          canView: true,
        },
      };

      try {
        const res = await CreateDocument({ newDocumentData });

        const newDocument = {
          _id: res._id,
          documentTitle: res.documentTitle,
          content: res.content,
          permissions: res.permissions,
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


  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleEdit = (doc) => {
    setSelectedDoc(doc);
    setNewDocName(doc.documentTitle);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
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

  const handlePermission = (doc) => {
    setSelectedDoc(doc);
    setPermissions(doc.permissions);
    setIsPermissionsModalOpen(true); // Open the Permissions modal
  };

  // const handlePermissionsSave = () => {
  //   setUserDocs(
  //     userDocs.map((doc) =>
  //       doc._id === selectedDoc._id ? { ...doc, permissions } : doc
  //     )
  //   );
  //   setIsPermissionsModalOpen(false);
  // };

  const handlePermissionsSave = () => {
    setUserDocs(
      userDocs.map((doc) =>
        doc._id === selectedDoc._id ? { ...doc, permissions: { ...permissions, members: permissions.members || [] } } : doc
      )
    );
    setIsPermissionsModalOpen(false);
  };

  const handleTogglePermission = (permission) => {
    setPermissions({
      ...permissions,
      [permission]: !permissions[permission]
    });
  };

  const handleAddMember = (member) => {
    setPermissions({
      ...permissions,
      members: [...permissions.members, member]
    });
  };

  const handleRemoveMember = (member) => {
    setPermissions({
      ...permissions,
      members: permissions.members.filter(m => m !== member)
    });
  };

  const handleDelete = async (doc) => {
    const res = await DeleteDocument({ docId: doc._id, workspaceId: _id });
    if (res) {
      showToast("Document deleted successfully.", "success");
      setUserDocs(userDocs.filter((d) => d._id !== doc._id));
    } else {
      showToast("Failed to delete document.", "error");
    }
  };

  const toggleDropdown = (docId) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [docId]: !prevState[docId],
    }));
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedDoc(null);
    setNewDocName('');
  };

  const handleClosePermissionsModal = () => {
    setIsPermissionsModalOpen(false);
  };

  const onUpdate = () => {
    setEditDocBtn(true);
    createDocument();
    // CreateDocInCloud({ documentId: selectedDoc._id, data: selectedDocContent })
  }

  return (
    <div className="p-1 mt-16 md:ml-20 sd:ml-0 h-100vh dark:bg-gray-900 dark:text-white">
      {/* Workspace Header */}
      <div className="flex flex-wrap items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 border-b-2">
        <h1 className="text-xl font-semibold m-2">
          {state.workspace.workspaceName}'s Workspace
        </h1>
        <div className="flex items-center space-x-4">
          <AddMember />

          {editDocBtn ?
            selectedDoc ?
              <button onClick={() => setEditDocBtn(false)} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </button>
              : <button className='flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>Select Document</button>
            :
            <button onClick={onUpdate} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              <GrUpdate className="h-4 w-4 mr-2" />
              Update
            </button>
          }

          <button onClick={() => ExportToDoc(selectedDocContent)} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Export Document</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center">
        {/* Document List */}
        <div className="static sd:h-[calc(100%)] md:h-[calc(83.5vh)] overflow-y-auto w-full md:max-w-[20rem] p-4 pt-0 rounded-none bg-gray-50 dark:bg-gray-800 shadow-none shadow-blue-gray-900/5 flex-shrink-0">
          <div className="mt-3">
            <SearchBox search={search} handleSearch={handleSearch} />
          </div>
          <div className="flex items-center justify-between p-2">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex justify-between w-full items-center bg-blue-500 text-white px-2 py-1 mt-1 rounded-md hover:bg-blue-600"
            >
              <span>
                <DocumentIcon className="h-4 w-4 mr-1 inline" />
                <p className="text-sm font-normal inline">Documents</p>
              </span>
              <span>
                <PlusIcon className="h-4 w-4 mr-1 inline" />Create
              </span>
            </button>
          </div>
          <ul>
            {filteredDocs.map((doc, index) => (
              <li
                key={index}
                className="bg-gray-100 dark:bg-gray-700 p-2 mt-2 mb-0 cursor-pointer border border-gray-200 dark:border-gray-600 shadow-sm rounded-md flex justify-between items-center"
                onClick={() => handleDocClick(doc)}
              >
                <span className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {doc.documentTitle}
                </span>

                {/* Dropdown Menu */}
                <div className="relative inline-block text-left">
                  <button
                    onClick={() => toggleDropdown(doc._id)}
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-900 dark:focus:ring-gray-600"
                    type="button"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 3"
                    >
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  {/* <ClickOutsideWrapper onClickOutside={() => setOpenDropdowns(false)}> */}
                  {openDropdowns[doc._id] && (
                    <div className="z-10 absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <button
                            onClick={() => handleEdit(doc)}
                            className="block px-4 py-2 w-full text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handlePermission(doc)}
                            className="block px-4 py-2 w-full text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Permissions
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleDelete(doc)}
                            className="block px-4 py-2 w-full text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                  {/* </ClickOutsideWrapper> */}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Document Content */}
        <div className="p-4 sd:border-0 md:border-l-2 border-gray-200 dark:border-gray-700 flex-grow">
          {/* <div className="bg-white dark:bg-gray-800 p-4 border rounded-md shadow-sm sd:max-h-[calc(100%)] md:max-h-[calc(85vh)] overflow-y-auto">
          </div> */}
          {selectedDoc ? (
            !editDocBtn ? (
              < TextEditor
                setHeight={710}
                commentbtn={false}
                content={selectedDocContent}
                setContent={setSelectedDocContent}
              />
            ) : (
              <div
                dangerouslySetInnerHTML={
                  CreateDocLoading ? { __html: "Loading..." } :
                    CreateDocError ? { __html: "Error while creating or updating document." } :
                      {
                        __html: DOMPurify.sanitize(selectedDocContent, {
                          ALLOWED_TAGS: ['ol', 'ul', 'li', 'p', 'span', 'br'],
                        })
                      }
                }
              ></div>
            )
          ) : (
            <p>No Document Selected</p>
          )}
        </div>
      </div>

      {/* Modal for Creating Document */}
      {
        isCreateModalOpen && (
          <Modal title="Create Document" onClose={handleCloseCreateModal}>
            <input
              type="text"
              value={newDocName}
              onChange={(e) => setNewDocName(e.target.value)}
              placeholder="Document Name"
              className="mb-4 p-2 w-full border rounded dark:bg-gray-600 dark:text-white"
            />
            <button
              onClick={handleAddDocument}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Document
            </button>
          </Modal>
        )
      }

      {/* Modal for Editing Document */}
      {
        isEditModalOpen && (
          <Modal title="Edit Document" onClose={handleCloseEditModal}>
            <input
              type="text"
              value={newDocName}
              onChange={(e) => setNewDocName(e.target.value)}
              placeholder="Document Name"
              className="mb-4 p-2 w-full border rounded dark:bg-gray-600 dark:text-white"
            />
            <button
              onClick={handleSaveEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </Modal>
        )
      }

      {/* Modal for Permissions */}
      {
        isPermissionsModalOpen && (
          <Modal title="Manage Permissions" onClose={handleClosePermissionsModal}>
            <div className="space-y-4">
              {/* Permissions Section */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={permissions.canEdit}
                    onChange={() => handleTogglePermission('canEdit')}
                    className="mr-2 h-5 w-5"
                  />
                  <label className="text-sm font-medium">Can Edit</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={permissions.canView}
                    onChange={() => handleTogglePermission('canView')}
                    className="mr-2 h-5 w-5"
                  />
                  <label className="text-sm font-medium">Can View</label>
                </div>
              </div>

              {/* Members Section */}
              <div>
                <h6 className="text-lg font-semibold mb-2">Members</h6>
                <div className="space-y-2">
                  {/* Check if members is defined and has items */}
                  {(permissions.members && permissions.members.length > 0) ? (
                    permissions.members.map((member, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{member}</span>
                        <button
                          onClick={() => handleRemoveMember(member)}
                          className="text-red-500 text-sm hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No members added yet.</p>
                  )}
                </div>

                {/* Add Member Button */}
                <div className="mt-4">
                  <h6 className="text-sm font-medium">Add Member</h6>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleAddMember('new_member')}
                      className="flex justify-between items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                      <span>Add New Member</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer Section with Save and Cancel buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={handleClosePermissionsModal}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePermissionsSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Save Permissions
                </button>
              </div>
            </div>
          </Modal>
        )
      }

    </div >
  );
};

export default Workspaces;
