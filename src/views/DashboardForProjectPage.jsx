import React, { useEffect, useState } from 'react';
import { SprintsAndTickets } from '../components/dashboard/SprintsAndTickets';
import { PieCharts } from '../components/dashboard/PieCharts';
import { useParams } from 'react-router-dom';
import { axiosPrivate } from '../CustomAxios/customAxios';
import Cookies from "js-cookie";

export const DashboardForProjectPage = () => {
    const [sprints, setSprints] = useState([]);
    const { projectId } = useParams();
    const token = Cookies.get('User');

    useEffect(() => {
        fetchSprints();
    }, []);

    const fetchSprints = async () => {
        try {
            const res = await axiosPrivate.get(`/api/sprints/${projectId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                },
            });
            console.log("sprint", res);
            setSprints(res.data.Data);
        } catch (err) {
            console.error('Error fetching sprints:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className={`p-6 h-screen ml-16 overflow-auto md:ml-16 lg:ml-20 dark:bg-gray-900 dark:text-white bg-gray-100 text-black}`}>
            <h2 className="text-4xl font-bold mb-8">Dashboard</h2>


            {/* Sprints and Tickets */}
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-auto w-2/3 ml-3">
                    <SprintsAndTickets sprints={sprints} />
                </div>
                    {/* Pie Charts */}
                    <PieCharts sprints={sprints} />
            </div>
        </div>
    );
};

export default DashboardForProjectPage;
