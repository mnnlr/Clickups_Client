import React, { useState } from 'react';
import { FaSearch, FaPlus, FaFileAlt, FaStar } from 'react-icons/fa';

const Document = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const documents = [
    { name: 'Company Wiki', category: 'Recent', date: 'Aug 16', items: 58 },
    { name: 'Project Notes', category: 'Projects', date: 'Aug 16', items: 2 },
  ];

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative p-6 bg-gray-100 h-screen ml-16 overflow-auto md:ml-16 lg:ml-20">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <FaSearch className="absolute ml-2 text-gray-500" />
      </div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => handleTabChange('all')}
          className={`p-2 rounded-lg ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => handleTabChange('recent')}
          className={`p-2 rounded-lg ${activeTab === 'recent' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Recent
        </button>
        <button
          onClick={() => handleTabChange('favorites')}
          className={`p-2 rounded-lg ${activeTab === 'favorites' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Favorites
        </button>
        <button
          onClick={() => handleTabChange('created')}
          className={`p-2 rounded-lg ${activeTab === 'created' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Created by Me
        </button>
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto">
        <button className="mb-4 bg-blue-600 text-white p-2 rounded-lg flex items-center">
          <FaPlus className="mr-2" /> Create Doc
        </button>
        {filteredDocuments.length === 0 ? (
          <p>No documents found</p>
        ) : (
          <ul>
            {filteredDocuments.map((doc) => (
              <li key={doc.name} className="flex items-center justify-between p-3 border border-gray-300 rounded-lg mb-2 bg-white">
                <div>
                  <FaFileAlt className="text-gray-500 mr-2" />
                  {doc.name}
                </div>
                <div className="text-gray-500 text-sm">
                  {doc.items} items – {doc.date}
                </div>
                <FaStar className="text-yellow-400" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Document;
