import React, { useState } from 'react';
import { FaSearch, FaPlus, FaFileAlt, FaEdit, FaTrash, FaShareAlt } from 'react-icons/fa';

const Document = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [documents, setDocuments] = useState([
<<<<<<< Updated upstream
    { id: 1, name: 'Company Wiki', category: 'Recent', date: 'Aug 16', items: 58 },
    { id: 2, name: 'Project Notes', category: 'Projects', date: 'Aug 16', items: 2 },
    { id: 3, name: 'Design Specs', category: 'Favorites', date: 'Aug 17', items: 15 },
    { id: 4, name: 'Meeting Minutes', category: 'Created by Me', date: 'Aug 18', items: 4 },
=======
    { id: 1, name: 'Company Wiki', category: 'Recent', date: 'Aug 16', items: 58, url: '/docs/company-wiki.pdf' },
    { id: 2, name: 'Project Notes', category: 'Projects', date: 'Aug 16', items: 2, url: '/docs/project-notes.docx' },
    { id: 3, name: 'Design Specs', category: 'Favorites', date: 'Aug 17', items: 15, url: '/docs/design-specs.pdf' },
    { id: 4, name: 'Meeting Minutes', category: 'Created by Me', date: 'Aug 18', items: 4, url: '/docs/meeting-minutes.docx' },
>>>>>>> Stashed changes
  ]);

  const [editingDoc, setEditingDoc] = useState(null);
  const [newDocName, setNewDocName] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleRename = (doc) => {
    setEditingDoc(doc);
    setNewDocName(doc.name);
  };

  const handleSaveRename = (id) => {
    setDocuments(documents.map(doc => (doc.id === id ? { ...doc, name: newDocName } : doc)));
    setEditingDoc(null);
    setNewDocName('');
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleShare = (doc) => {
    alert(`Sharing document: ${doc.name}`);
  };

<<<<<<< Updated upstream
=======
  const handleOpenDocument = (url) => {
    window.open(url, '_blank');
  };

>>>>>>> Stashed changes
  // Filter documents based on the search query
  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group documents by category or show all if the 'all' tab is active
  const groupedDocuments = filteredDocuments.reduce((groups, doc) => {
    if (activeTab === 'all' || activeTab === doc.category.toLowerCase()) {
      if (!groups[doc.category]) {
        groups[doc.category] = [];
      }
      groups[doc.category].push(doc);
    }
    return groups;
  }, {});

  const tabs = [
    { label: 'All', value: 'all' },
    { label: 'Recent', value: 'recent' },
    { label: 'Favorites', value: 'favorites' },
    { label: 'Created by Me', value: 'created' },
  ];

  return (
    <div className="relative p-6 bg-gray-100 h-screen ml-16 overflow-auto md:ml-16 lg:ml-20 pt-20">
      <div className="flex items-center mb-6 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search documents..."
          className="w-full p-3 pl-12 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
        />
        <FaSearch className="absolute left-4 top-3 text-gray-500" />
      </div>

      <div className="flex items-center justify-between mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`p-2 px-4 rounded-full font-semibold ${
              activeTab === tab.value ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            } hover:bg-blue-500 hover:text-white transition-colors duration-200`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <button className="mb-6 bg-blue-600 text-white p-3 rounded-full flex items-center shadow-md hover:bg-blue-700 transition-colors duration-200">
        <FaPlus className="mr-2" /> Create New Document
      </button>

      {Object.keys(groupedDocuments).length === 0 ? (
        <p className="text-center text-gray-500">No documents found</p>
      ) : (
        <div className="space-y-6">
          {Object.keys(groupedDocuments).map((category) => (
            <div key={category} className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">{category}</h2>
              {groupedDocuments[category].length === 0 ? (
                <p className="text-gray-500">No documents created</p>
              ) : (
                <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {groupedDocuments[category].map((doc) => (
                    <li
                      key={doc.id}
<<<<<<< Updated upstream
                      className="flex flex-col justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
=======
                      className="flex flex-col justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                      onClick={() => handleOpenDocument(doc.url)}
>>>>>>> Stashed changes
                    >
                      <div className="flex items-center mb-3">
                        <FaFileAlt className="text-blue-600 mr-3" />
                        {editingDoc && editingDoc.id === doc.id ? (
                          <input
                            type="text"
                            value={newDocName}
                            onChange={(e) => setNewDocName(e.target.value)}
                            className="border-b p-1 focus:outline-none focus:border-blue-500 flex-grow"
                          />
                        ) : (
                          <span className="text-lg font-medium text-gray-800">{doc.name}</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 mb-3">
                        {doc.items} items – {doc.date}
                      </div>
                      <div className="flex space-x-4">
                        {editingDoc && editingDoc.id === doc.id ? (
                          <button
                            onClick={() => handleSaveRename(doc.id)}
                            className="text-green-600 font-semibold"
                          >
                            Save
                          </button>
                        ) : (
                          <>
                            <FaEdit
                              className="text-blue-500 cursor-pointer hover:text-blue-700"
<<<<<<< Updated upstream
                              onClick={() => handleRename(doc)}
                            />
                            <FaTrash
                              className="text-red-500 cursor-pointer hover:text-red-700"
                              onClick={() => handleDelete(doc.id)}
                            />
                            <FaShareAlt
                              className="text-yellow-500 cursor-pointer hover:text-yellow-700"
                              onClick={() => handleShare(doc)}
=======
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRename(doc);
                              }}
                            />
                            <FaTrash
                              className="text-red-500 cursor-pointer hover:text-red-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(doc.id);
                              }}
                            />
                            <FaShareAlt
                              className="text-yellow-500 cursor-pointer hover:text-yellow-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare(doc);
                              }}
>>>>>>> Stashed changes
                            />
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Document;
