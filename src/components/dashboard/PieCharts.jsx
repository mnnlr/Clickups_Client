import React, { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export const PieCharts = ({ sprints }) => {
    const [selectedSprint, setSelectedSprint] = useState('Sprint-1');

    const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

    const ticketsPerSprint = Object.entries(sprints).map(([sprint, tickets]) => ({
        name: sprint,
        value: tickets.length,
    }));
    return (
        <div className=''>
            <div className="flex flex-col gap-8">
                <div className="w-full md:w-full">
                    <select
                        value={selectedSprint}
                        onChange={(e) => setSelectedSprint(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                    >
                        {Object.keys(sprints).map((sprint) => (
                            <option key={sprint} value={sprint}>
                                {sprint}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Tickets by Sprint */}
                <div className="bg-white flex flex-col justify-center items-center p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
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
                    <div className="bg-white flex flex-col justify-center items-center p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                            Ticket in Status
                        </h3>
                        <PieChart width={300} height={300}>
                            <Pie
                                data={Object.entries(sprints[selectedSprint].reduce((acc, ticket) => {
                                    acc[ticket.status] = acc[ticket.status] ? acc[ticket.status] + 1 : 1;
                                    return acc;
                                }, {})).map(([status, count]) => ({ name: status, value: count }))}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                            >
                                {Object.keys(sprints[selectedSprint].reduce((acc, ticket) => {
                                    acc[ticket.status] = acc[ticket.status] ? acc[ticket.status] + 1 : 1;
                                    return acc;
                                }, {})).map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </div>

                    {/* Tickets by User */}
                    <div className="bg-white flex flex-col justify-center items-center p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                            Tickets Created by User
                        </h3>
                        <PieChart width={300} height={300}>
                            <Pie
                                data={Object.entries(sprints[selectedSprint].reduce((acc, ticket) => {
                                    acc[ticket.createdBy] = acc[ticket.createdBy] ? acc[ticket.createdBy] + 1 : 1;
                                    return acc;
                                }, {})).map(([user, count]) => ({ name: user, value: count }))}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                            >
                                {Object.keys(sprints[selectedSprint].reduce((acc, ticket) => {
                                    acc[ticket.createdBy] = acc[ticket.createdBy] ? acc[ticket.createdBy] + 1 : 1;
                                    return acc;
                                }, {})).map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </div>
                </div>

            </div>
        </div>
    )
}
