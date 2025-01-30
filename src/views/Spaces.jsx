import React, { useState, useEffect, useRef } from 'react';
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
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";
import { AiTwotoneMail } from "react-icons/ai";
import { fetchWorkspaceById } from '../utils/fetchingAPIsForWorkspace/fetchWorkspaceById.js';
import { handleSavePermission } from '../document-utils-and-hooks/handleSavePermission.js';
import { GetDocumentById } from '../document-utils-and-hooks/GetDocumentById.js';
import AvailableMembersShow from './AvailableMembersShow.jsx';
import DeleteConfirmationModal from "../components/Models/DeleteConfirmModel.jsx";
import ConfirmationPage from "../components/Models/ConfirmationPage.jsx";

const Workspaces = () => {
  const { _id } = useParams();
  const [userDocs, setUserDocs] = useState([]);
  const [selectedDocContent, setSelectedDocContent] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModelOpen, setIsShareModalOpen] =useState(false); //Model for Share
  const [link, setLink] = useState(""); // Link state
  const [copySuccess,setCopySuccess] = useState('');
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false); // Modal for Permissions
  const [newDocName, setNewDocName] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null); // Track the document being edited
  const [search, setSearch] = useState('');
  const [filteredDocs, setFilteredDocs] = useState([]);
  const { state } = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [editDocBtn, setEditDocBtn] = useState(true);
  const [MembersForPermissions, setMembersForPermissions] = useState([]); // for get all workspace member for give permission
  const [AllMembersInWorkspace, setAllMembersInWorkspace] = useState([]);
  const [deleteModel, setdeleteModel] = useState(false);
  const [DocumentForDelete, setDocumentForDelete] = useState({});
  const [ExportConfirmation, setExportConfirmation] = useState(false);

  const [CheakPermissions, setCheakPermissions] = useState({
    canEdit: "",
    canView: ""
  });
  const dropdownRefs = useRef({});

  // create document in cloudinary and updating the document
  const { CreateDocLoading, CreateDocError, createDocument } = useCreateDocInCloud({ documentId: selectedDoc, data: selectedDocContent });

  // get document content
  const { GetDocLoading, GetDocError, GetDocData, getDocumentContent } = useGetDocumentContent();

  // const [permissions, setPermissions] = useState({
  //   canEdit: false,
  //   canView: false,
  //   members: []
  // });

  const user = useSelector((state) => state.login.user);
  useEffect(() => {
    const fetchWorkspaceMembers = async () => {
      await fetchWorkspaceById(state.workspace._id, setAllMembersInWorkspace)
    };
    fetchWorkspaceMembers();
  }, [openDropdowns, _id]);

  useEffect(() => {
    GetDocuments(_id).then((docsData) => {
      showToast("Documents fetched successfully.", "success");
      setUserDocs(docsData);
    }).catch((error) => {
      showToast("Failed to fetch documents.", "error");
      console.error("Error fetching documents:", error);
    });
  }, [_id]);


  // useEffect(() => { 
  //   setFilteredDocs(
  //     userDocs.filter((doc) =>
  //       doc.documentTitle.toLowerCase().includes(search.toLowerCase())

  //   ));
  // }, [search, userDocs]);
  useEffect(() => {
    setFilteredDocs(
      userDocs.filter((doc) => {
        console.log(doc)
        if (user._id === state.workspace.workspaceCreatedBy._id || user._id === "admin") {   // if login user is workspace creator or admin then he see all document 
          return doc.documentTitle.toLowerCase().includes(search.toLowerCase());
        }

        if (user._id === doc.createdBy._id) {   // if user is document creator then he see his own document
          return doc.documentTitle.toLowerCase().includes(search.toLowerCase());
        }

        const userPermission = doc.permissions.find(          // if normal login user find user from doc permissions and give permission
          (permission) => permission.user._id === user._id
        );

        return userPermission ?  // if user present and canView is true then show only canView documemnts
          userPermission.canView &&
          doc.documentTitle.toLowerCase().includes(search.toLowerCase())

          : doc.documentTitle.toLowerCase().includes(search.toLowerCase()) // if user is not present means user is add after document creation he didn't get permission bydefault it is canView
        // or user is remove from workspace
      })
    );
  }, [search, userDocs]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if any dropdown is open and if the click is outside the dropdown
      Object.keys(dropdownRefs.current).forEach((docId) => {
        if (
          dropdownRefs.current[docId] &&
          !dropdownRefs.current[docId].contains(event.target)
        ) {
          closeAllDropdowns();
        }
      });
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);



  // const handleDocClick = async (doc) => {
  //   setSelectedDoc(doc);
  //   // console.log(doc)

  //   // const DocContent = await GetDocumentContent(doc._id);
  //   // setSelectedDocContent(DOMPurify.sanitize(DocContent));

  //   getDocumentContent(doc._id);
  //   const DocContent = GetDocLoading ? { _html: "Loading..." } : GetDocError ? { _html: "Error while fetching document." } : GetDocData;
  //   setSelectedDocContent(DocContent);


  // };

  const closeAllDropdowns = () => {
    setOpenDropdowns({});
  };
  const handleDocClick = async (doc) => {
    setSelectedDoc(doc);
    if (
      AllMembersInWorkspace.workspaceCreatedBy._id === user._id ||
      doc.createdBy._id === user._id ||
      user.role === "admin"
    ) {
      setCheakPermissions({
        canEdit: true,
        canView: true
      })
    } else {

      const permissionUser = doc.permissions.find(((member) =>
        member.user._id === user._id
      ))
      permissionUser ?
        setCheakPermissions({
          canEdit: permissionUser.canEdit,
          canView: permissionUser.canView
        }) :
        setCheakPermissions({
          canEdit: false,
          canView: true
        })
    }

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
      setSelectedDocContent(CheakPermissions.canEdit ? "Start editing your document..." : "No Content");
    }
  }, [GetDocData, GetDocError, GetDocLoading]);

  const handleAddDocument = async () => {
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

  const handleDocumentDelete = (doc) => {
    setDocumentForDelete(doc);
    setdeleteModel(true);
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
// to share document for users
  const handleShare = (doc) => {
    setSelectedDoc(doc); // Set the selected document to share
    const DocumentLink=`https://mnnlr-workspace.netlify.app/viewsdocument/${doc._id}`;
    setLink(DocumentLink)
    setIsShareModalOpen(true); // Open the share modal
  };

   

// copy link on clipboard
  const copyToClipboard = (text) => {
    if (text) {      
      navigator.clipboard.writeText(text).then(
        () => setCopySuccess("copied!"),
        () => setCopySuccess("Failed to copy link.")
      );
    } else {      
      setCopySuccess("No link provided to copy.");
    }
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

  const handleToggleGivePermition = (event, members, permissionType) => {
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

  const handleDelete = async (doc) => {
    const res = await DeleteDocument({ docId: doc._id, workspaceId: _id });
    if (res) {
      showToast("Document deleted successfully.", "success");
      setUserDocs(userDocs.filter((d) => d._id !== doc._id));
      setdeleteModel(false);
      setDocumentForDelete({});
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

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
    setSelectedDoc(null);    
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
          {user._id === state.workspace.workspaceCreatedBy._id || user.role === "admin"
            ?
            <AddMember />
            : <AvailableMembersShow workspace={AllMembersInWorkspace}/>
          }
          {selectedDoc ? (
            CheakPermissions.canEdit ? (
              editDocBtn ? (
                <button onClick={() => setEditDocBtn(false)} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </button>)
                : (<button onClick={onUpdate} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  <GrUpdate className="h-4 w-4 mr-2" />
                  Update
                </button>)) : (

              ""
            )
          )
            : (<button className='flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>Select Document</button>)}
          {CheakPermissions.canView ?
            <button
            //  onClick={() => ExportToDoc(selectedDocContent)} 
            onClick={() => setExportConfirmation(true)}

            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Export Document</button>
            : ""
          }
          {/* {editDocBtn ?
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
          } */}

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
                onClick={() => handleDocClick(doc, user)}
              >
                <span className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {doc.documentTitle}
                </span>

                {/* Dropdown Menu */}
                <div className="relative inline-block text-left">
                  {user._id === doc.createdBy._id || user.role === "admin"
                    ?
                    <button
                      // onClick={() => toggleDropdown(doc._id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(doc._id);
                      }}
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
                    : ""}
                  {/* Dropdown menu */}
                  {/* <ClickOutsideWrapper onClickOutside={() => setOpenDropdowns(false)}> */}
                  {openDropdowns[doc._id] && (
                    <div
                      ref={(el) => (dropdownRefs.current[doc._id] = el)}
                      className="z-10 absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(doc);
                              closeAllDropdowns();
                            }} className="block px-4 py-2 w-full text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={(e) => {
                              // generateLink(doc);
                              e.stopPropagation();
                              handleShare(doc);
                              // handleEdit(doc);
                              closeAllDropdowns();
                            }} className="block px-4 py-2 w-full text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Share
                          </button>
                        </li> 
                        <li>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePermission(doc);
                              closeAllDropdowns();
                            }} className="block px-4 py-2 w-full text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Permissions
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // handleDelete(doc);
                              handleDocumentDelete(doc);
                              closeAllDropdowns();
                            }} className="block px-4 py-2 w-full text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
            <div>
              <div  className="text-center text-2xl font-bold text-white bg-blue-400 py-2 rounded-lg shadow-md mb-4 flex justify-between items-center">
              <p className="mx-4">
                {selectedDoc?.documentTitle}
              </p>
              <p className="text-base mx-4">Created By - {selectedDoc.createdBy?.name}</p>
              </div>
              {!editDocBtn ? (
                // <div className="shadow-lg shadow-blue-500/50 bg-white rounded-lg">
                <TextEditor
                  setHeight={710}
                  commentbtn={false}
                  content={selectedDocContent}
                  setContent={setSelectedDocContent}
                  DocElements={true}
                />
                // </div>
              ) : (
                <div
                  className="mce-content-body"
                  dangerouslySetInnerHTML={
                    CreateDocLoading
                      ? { __html: "Loading..." }
                      : CreateDocError
                        ? { __html: "Error while creating or updating document." }
                        : {
                          __html: DOMPurify.sanitize(selectedDocContent, {}),
                        }
                  }
                ></div>
              )}
            </div>) : (
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

    {/* Modal for Share */}
      {isShareModelOpen && (
        <Modal title="Copy Document Link" onClose={handleCloseShareModal}>
          <div class="flex items-center justify-between">
            <input
              type="text"
              value={link}
              readOnly
              id="copyLink"
              className="mb-4 p-2 w-full border rounded-l-lg ... dark:bg-gray-600 dark:text-white h-12"
            />
            <button
              className=" text-black px-4 py-2 hover:bg-blue-700 hover:text-white mb-4  border rounded-r-lg ... h-12"
              onClick={() =>
                copyToClipboard(document.getElementById("copyLink").value)
              }
            >
              Copy
            </button>
          </div>
          {copySuccess && (
            <p class="text-center mb-3 text-red-600">{copySuccess}</p>
          )}
        </Modal>
      )}

      {/* Modal for Permissions */}
      {
        isPermissionsModalOpen && (
          <Modal title="Manage Permissions" onClose={handleClosePermissionsModal}>
            <div className="space-y-4">
              {/* Permissions Section */}
              <div className="space-y-2 flex flex-col h-[60vh] overflow-auto ">
                {
                  MembersForPermissions && MembersForPermissions.length > 0 ? (
                    MembersForPermissions.map((members, index) => (
                      <div className="flex bg-blue-600 rounded-md text-white p-2" key={index}>
                        {/* Left Section: Displaying Name and Email */}
                        <div className="flex justify-start flex-col w-[70%]">
                          {/* Check if user exists to avoid errors */}
                          <div className="flex items-center gap-1">
                            <IoPersonAdd size={15} />
                            {members?.user?.name || "Unknown User"}
                          </div>
                          <div className="flex items-center gap-1">
                            <AiTwotoneMail />
                            {members?.user?.email || "No Email Available"}
                          </div>
                        </div>

                        {/* Right Section: Checkbox Permissions */}
                        <div className="flex justify-start gap-4 items-center">
                          {/* CanView Permission */}
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={members?.canView || false} // Fallback to false if canView is undefined
                              className="w-5 h-5 text-blue-600 bg-gray-100 border-2 border-gray-300 rounded-full focus:ring-blue-500 focus:ring-2 focus:outline-none"
                              onChange={(e) => handleToggleGivePermition(e, members, "canView")}
                            />
                            <span>CanView</span>
                          </label>

                          {/* CanEdit Permission */}
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={members?.canEdit || false} // Fallback to false if canEdit is undefined
                              className="w-5 h-5 text-blue-600 bg-gray-100 border-2 border-gray-300 rounded-full focus:ring-blue-500 focus:ring-2 focus:outline-none"
                              onChange={(e) => handleToggleGivePermition(e, members, "canEdit")}
                            />
                            <span>CanEdit</span>
                          </label>                       
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No members available</div> // Message when the array is empty or undefined
                  )
                }

              </div>

              {/* Members Section */}


              {/* Footer Section with Save and Cancel buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={handleClosePermissionsModal}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSavePermission({ docId: selectedDoc._id, MembersForPermissions, setIsPermissionsModalOpen })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Save Permissions
                </button>
              </div>
            </div>
          </Modal>
        )
      }
 <DeleteConfirmationModal
        isOpen={deleteModel}
        onClose={() => setdeleteModel(false)}
        onConfirm={() => handleDelete(DocumentForDelete)}
      />
      {ExportConfirmation && (
        <ConfirmationPage
          message="Are you sure you want to export this document"
          confirmText="Export"
          onConfirm={() => {
            ExportToDoc(selectedDocContent);
            setExportConfirmation(false);
          }}
          onCancel={() => setExportConfirmation(false)}
        />
      )}
    </div >
  );
};

export default Workspaces;

