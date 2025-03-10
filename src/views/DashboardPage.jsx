import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardData } from '../redux/dashboards/dashboardSlice';
import { DashboardTemplates } from '../components/dashboard/DashboardTemplates';
import { UserDashboards } from '../components/dashboard/UserDashboards';
import { axiosPrivate } from '../CustomAxios/customAxios';
import { useSocket } from '../components/socket-io/SocketContext';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
    const dispatch = useDispatch();
    const socket = useSocket();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const { data } = await axiosPrivate.get("/api/dashboards");
                console.log("Dashboard data:", data);

                const dashboardDataFromServer = [
                    // Dummy data
                ];

                if (!data || !data.dashboardData || data.dashboardData.length === 0) {
                    dispatch(dashboardData(dashboardDataFromServer));
                } else {
                    dispatch(dashboardData(data.dashboardData));
                }
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                dispatch(dashboardData(dashboardDataFromServer));
            }
        };

        fetchDashboardData();

        if (socket) {
            socket.on('connect', () => {
                console.log('Socket connected');
            });

            socket.on('dashboardUpdate', (newData) => {
                console.log('Received live update:', newData);
                dispatch(dashboardData(newData));
            });

            return () => {
                if (socket) {
                    socket.off('dashboardUpdate');
                }
            };
        }

    }, [dispatch, socket]);

    const handleDeleteBtn = async (dashboardId) => {
        try {
            const isConfirmed = confirm("Are you sure you want to delete this dashboard?");
            if (isConfirmed) {
                const response = await axiosPrivate.delete(`/api/dashboards/${dashboardId}`);
                if (response.data.success) {
                    alert("Dashboard deleted successfully");
                    console.log(response.data);
                }
            }
        } catch (err) {
            console.log("Error deleting dashboard:", err);
        }
    };

    const handleClick = (projectId) => {
        navigate(`/dashboard/${projectId}`);
    };

    const DashboardData = useSelector((state) => state.dashboard.dashboards);
    const { user } = useSelector((store) => store.login);


    return (
        <div className="relative pt-16 pb-6 bg-gray-100 dark:bg-gray-800 h-screen md:ml-16">
            <section className="flex flex-col items-center justify-center px-5 py-10">
                <h1 className="text-black dark:text-white text-3xl font-bold">Choose a Dashboard template</h1>
                <p className="text-gray-500 font-LXGWFont dark:text-gray-300">Get started with a new Dashboard template which fits your exact needs.</p>
            </section>
            <DashboardTemplates />
            {Array.isArray(DashboardData) && DashboardData.length > 0 ? (
                DashboardData.map((data, index) =>(
                    data.owner._id===user._id||user.role==="Admin"? 
                    <div className="my-1 mx-7" key={index}>
                        <UserDashboards
                            dashboardName={data.dashboardProject?.projectName}
                            dashboardType={data.templateName}
                            ownerName={data.owner?.name}
                            handleDeleteBtn={() => handleDeleteBtn(data._id)}
                            handleDashboard={() => handleClick(data.dashboardProject?._id)}
                        />
                    
                    </div>
                   :"" )
                )
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-300">No dashboards available. Please create one!</p>
            )}
        </div>
    );
};
