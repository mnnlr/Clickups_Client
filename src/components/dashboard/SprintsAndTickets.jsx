import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';


export const SprintsAndTickets = ({ sprints }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openSprints, setOpenSprints] = useState({});
    const toggleSprint = (sprint) => {
        setOpenSprints((prevState) => ({
            ...prevState,
            [sprint]: !prevState[sprint],
        }));
    };
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    };
    return (
        <div className=''>
            {/* Tickets List */}
            <div className="col-span-2">
                <div className="relative w-full md:w-full md:mb-5">
                    <FiSearch className="absolute top-3 left-3 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search by title, creator, or status"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                    />
                </div>

                {Object.keys(sprints).map((sprint) => (
                    <div key={sprint} className="mb-2 bg-white rounded-lg shadow border border-gray-200">

                        <button
                            onClick={() => toggleSprint(sprint)}
                            className="w-full flex justify-between items-center px-6 py-4 bg-gray-200 text-black rounded-t-lg focus:outline-none"
                        >
                            <span className="text-lg font-medium">{sprint} ({sprints[sprint].length} Tickets)</span>
                            {openSprints[sprint] ? (
                                <FiChevronUp className="w-6 h-6" />
                            ) : (
                                <FiChevronDown className="w-6 h-6" />
                            )}
                        </button>

                        {openSprints[sprint] && (
                            <div className="px-6 py-4">
                                {sprints[sprint]
                                    .filter((ticket) =>
                                        ticket.title.toLowerCase().includes(searchQuery) ||
                                        ticket.createdBy.toLowerCase().includes(searchQuery) ||
                                        ticket.status.toLowerCase().includes(searchQuery)
                                    )
                                    .map((ticket) => (
                                        <div
                                            key={ticket.id}
                                            className="mb-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                                        >
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{ticket.title}</h3>
                                            <p className="text-gray-600 mb-2">{ticket.description}</p>
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <span>Created by: {ticket.createdBy}</span>
                                                <span
                                                    className={`px-2 py-1 rounded-full ${ticket.status === 'Todo'
                                                        ? 'bg-blue-100 text-blue-600'
                                                        : ticket.status === 'In Progress'
                                                            ? 'bg-yellow-100 text-yellow-600'
                                                            : 'bg-green-100 text-green-600'
                                                        }`}
                                                >
                                                    {ticket.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                {sprints[sprint].filter(
                                    (ticket) =>
                                        ticket.title.toLowerCase().includes(searchQuery) ||
                                        ticket.createdBy.toLowerCase().includes(searchQuery) ||
                                        ticket.status.toLowerCase().includes(searchQuery)
                                ).length === 0 && (
                                        <p className="text-gray-500 text-center py-4">No tickets found.</p>
                                    )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
