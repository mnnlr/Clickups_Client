import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';

export const SprintsAndTickets = ({ sprints, individualTasks }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openSprints, setOpenSprints] = useState({});
    const [isOpen, setIsOpen] = useState(false);


    const toggleSprint = (sprint) => {
        setOpenSprints((prevState) => ({
            ...prevState,
            [sprint]: !prevState[sprint],
        }));
    };

    const toggleTickets = () => setIsOpen((prev) => !prev);

    const TicketStatus = Object.freeze({
        TODO: 'ToDo',
        IN_PROGRESS: 'In-Progress',
        ON_HOLD: 'On-Hold',
        DONE: 'Done',
        COMPLETE: 'Complete',
    });

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    };

    const matchesSearchQuery = (ticket) => {
        return (
            ticket.taskName.toLowerCase().includes(searchQuery) ||
            (ticket.userId?.name && ticket.userId.name.toLowerCase().includes(searchQuery)) ||
            ticket.status.toLowerCase().includes(searchQuery)
        );
    };

    return (
        <div className="">
            {/* Search Input */}
            <div className="col-span-2">
                <div className="relative w-full md:w-full md:mb-5">
                    <FiSearch className="absolute top-3 left-3 text-gray-400 dark:text-gray-200" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search by title, creator, or status"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                </div>


                {/* Display Individual Tasks */}
                <div className="mb-2 bg-white rounded-lg shadow border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                    <button
                        onClick={toggleTickets}
                        className="w-full flex justify-between items-center px-6 py-4 bg-gray-200 text-black rounded-t-lg focus:outline-none dark:bg-gray-800 dark:text-white"
                    >
                        <span className="text-lg font-bold">Individual Tickets ({individualTasks.length} Tickets)</span>
                        {isOpen ? <FiChevronUp className="w-6 h-6" /> : <FiChevronDown className="w-6 h-6" />}
                    </button>
                    {isOpen && (<div className="grid grid-cols-3 gap-6 m-8">
                        {individualTasks
                            .filter(matchesSearchQuery)
                            .map((task) => (
                                <div key={task._id} className="p-6 rounded-xl bg-gray-200 shadow-lg hover:scale-105 transform transition dark:bg-gray-800">
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{task.taskName}</p>
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <p className="font-bold px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-white">{task.kanId}</p>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${task.status === TicketStatus.TODO
                                                ? 'bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-white'
                                                : task.status === TicketStatus.IN_PROGRESS
                                                    ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-700 dark:text-white'
                                                    : task.status === TicketStatus.ON_HOLD
                                                        ? 'bg-orange-100 text-orange-600 dark:bg-orange-700 dark:text-white'
                                                        : task.status === TicketStatus.DONE
                                                            ? 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-white'
                                                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            {task.status}
                                        </span>
                                    </div>
                                    <div className='flex'>
                                        <p className="text-right text-gray-600 font-bold mt-2 dark:text-gray-400 text-sm">Created By: <span className='font-extralight'>{task.userId?.name}</span></p>
                                    </div>
                                </div>
                            ))}

                        {individualTasks.filter(matchesSearchQuery).length === 0 && (
                            <p className="text-gray-500 text-center py-4 dark:text-gray-400">No individual tasks found.</p>
                        )}
                    </div>
                    )}
                </div>

                {/* Sprint and Tickets List */}
                {sprints.map((sprint, index) => (
                    <div key={index} className="mb-2 bg-white rounded-lg shadow border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                        <button
                            onClick={() => toggleSprint(sprint.sprintname)}
                            className="w-full flex justify-between items-center px-6 py-4 bg-gray-200 text-black rounded-t-lg focus:outline-none dark:bg-gray-800 dark:text-white"
                        >
                            <span className="text-lg font-bold">{sprint.sprintname} ({sprint.taskIds.length} Tickets)</span>
                            {openSprints[sprint.sprintname] ? (
                                <FiChevronUp className="w-6 h-6" />
                            ) : (
                                <FiChevronDown className="w-6 h-6" />
                            )}
                        </button>

                        {/* Display Tickets */}
                        {openSprints[sprint.sprintname] && (
                            <div className="grid grid-cols-3 gap-6 m-8 max-h-[200px] overflow-y-auto">
                                {sprint.taskIds
                                    .filter(matchesSearchQuery)
                                    .map((ticket) => (
                                        <div key={ticket._id}>
                                            <div className="p-6 rounded-xl bg-gray-100 shadow-lg transition-transform transform hover:scale-105 dark:bg-gray-800">
                                                <div className="flex justify-between items-center mb-4">
                                                    <div>
                                                        <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{ticket.taskName}</p>
                                                    </div>
                                                </div>
                                                <div className='flex'>
                                                    <p className="font-bold px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-white">{ticket.kanId}</p>
                                                </div>

                                                <div className="mt-4 flex justify-end">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${ticket.status === TicketStatus.TODO
                                                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-white'
                                                            : ticket.status === TicketStatus.IN_PROGRESS
                                                                ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-700 dark:text-white'
                                                                : ticket.status === TicketStatus.ON_HOLD
                                                                    ? 'bg-orange-100 text-orange-600 dark:bg-orange-700 dark:text-white'
                                                                    : ticket.status === TicketStatus.DONE
                                                                        ? 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-white'
                                                                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                                                            }`}
                                                    >
                                                        {ticket.status}
                                                    </span>
                                                </div>
                                                <div className='flex'>
                                                    <p className="text-right text-gray-600 font-bold mt-2 text-sm dark:text-gray-400">Created By: <span className='font-extralight'>{ticket.userId?.name}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                {/* No tickets found */}
                                {sprint.taskIds.filter(matchesSearchQuery).length === 0 && (
                                    <div className='flex'>
                                        <p className="text-gray-500 text-center py-4 dark:text-gray-400 text-lg font-bold">No tickets found.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
