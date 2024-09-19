import React from 'react';
import { SprintsAndTickets } from '../components/dashboard/SprintsAndTickets';
import { PieCharts } from '../components/dashboard/PieCharts';

export const DashboardForProjectPage = () => {
    const sprints = {
        'Sprint-1': [
            { id: '1', title: 'Bug in login page', description: 'Users are unable to log in with valid credentials.', createdBy: 'Alice', createdAt: '2024-08-27T10:00:00Z', status: 'Todo' },
            { id: '2', title: 'UI glitch on mobile', description: 'Buttons are misaligned on smaller screens.', createdBy: 'Bob', createdAt: '2024-08-27T11:00:00Z', status: 'In Progress' },
        ],
        'Sprint-2': [
            { id: '3', title: 'Database connection issue', description: 'Frequent disconnections from the database.', createdBy: 'Alice', createdAt: '2024-08-27T12:00:00Z', status: 'Closed' },
            { id: '4', title: 'API response delay', description: 'API calls taking too long to respond.', createdBy: 'Charlie', createdAt: '2024-08-27T13:00:00Z', status: 'Todo' },
            { id: '5', title: 'Security vulnerability in authentication', description: 'Potential exploit found in the authentication system.', createdBy: 'Bob', createdAt: '2024-08-27T14:00:00Z', status: 'Todo' },
        ],
    };



    return (
       <div className="p-6 bg-gray-100 dark:bg-gray-900 dark:text-white h-screen ml-16 overflow-auto md:ml-16 lg:ml-20">
  <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Dashboard</h2>

  {/* Sprints and Tickets */}
  <div className="flex flex-col md:flex-row gap-8">
    <div className="flex-auto w-2/3 ml-3">
      <SprintsAndTickets sprints={sprints} />
    </div>

    <div className="w-1/3">
      {/* Pie Charts */}
      <PieCharts sprints={sprints} />
    </div>
  </div>
</div>

    );

};

export default DashboardForProjectPage;
