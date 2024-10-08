import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export const PieCharts = ({ sprints }) => {
    const [selectedSprint, setSelectedSprint] = useState(sprints[0]?._id || '');

    const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

    const ticketsPerSprint = sprints.map(sprint => ({
        name: sprint.sprintname,
        value: sprint.taskIds.length,
    }));

    const getSprintTasks = () => {
        const selected = sprints.find(sprint => sprint._id === selectedSprint);
        return selected ? selected.taskIds : [];
    };

    const ticketsByCreator = () => {
        const tasks = getSprintTasks();
        return Object.entries(tasks.reduce((acc, ticket) => {
            const creatorName = ticket.userId.name; // Access the user's name from userId
            acc[creatorName] = (acc[creatorName] || 0) + 1;
            return acc;
        }, {})).map(([creator, count]) => ({ name: creator, value: count }));
    };

    const ticketsByStatus = () => {
        const tasks = getSprintTasks();
        return Object.entries(tasks.reduce((acc, ticket) => {
            acc[ticket.status] = (acc[ticket.status] || 0) + 1;
            return acc;
        }, {})).map(([status, count]) => ({ name: status, value: count }));
    };

    return (
        <div className="">
            <div className="flex flex-col gap-8">
                <div className="w-full md:w-full">
                    <select
                        value={selectedSprint}
                        onChange={(e) => setSelectedSprint(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                    >
                        {sprints.map((sprint) => (
                            <option key={sprint._id} value={sprint._id}>
                                {sprint.sprintname}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tickets by Sprint */}
                <div className="bg-white dark:bg-gray-800 flex flex-col justify-center items-center p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
                        Tickets Created in Sprint
                    </h3>
                    <PieChart width={300} height={300}>
                        <Pie
                            data={ticketsPerSprint}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                        >
                            {ticketsPerSprint.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </div>

                <div className='grid grid-cols-2 gap-8'>
                    {/* Tickets by Status */}
                    <div className="bg-white dark:bg-gray-800 flex flex-col justify-center items-center p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
                            Tickets by Status
                        </h3>
                        <div className='flex'>
                        <PieChart width={300} height={300}>
                            <Pie
                                data={ticketsByStatus()}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                            >
                                {ticketsByStatus().map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                        </div>
                    </div>

                    {/* Tickets by User */}
                    <div className="bg-white dark:bg-gray-800 flex flex-col justify-center items-center p-8 rounded-lg shadow">
                        <h3 className="flex text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
                            Tickets Created by User
                        </h3>
                        <div className='flex'>
                        <PieChart width={300} height={300}>
                            <Pie
                                data={ticketsByCreator()}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                            >
                                {ticketsByCreator().map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
