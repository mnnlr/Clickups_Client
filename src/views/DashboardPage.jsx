import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardData } from '../redux/dashboards/dashboardSlice';
import { DashboardTemplates } from '../components/dashboard/DashboardTemplates';
import { UserDashboards } from '../components/dashboard/UserDashboards';
import { axiosPrivate } from '../CustomAxios/customAxios';
import { useSocket } from '../components/socket-io/SocketContext';

export const DashboardPage = () => {
    const dispatch = useDispatch();
    const socket = useSocket();

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
                    console.log(response.data)
                }
            }
        } catch (err) {
            console.log("Error deleting dashboard:", err);
        }
    }

    const DashboardData = useSelector((state) => state.dashboard.dashboards);

    return (
        <div className="relative pt-16 pb-6 bg-gray-100 h-screen md:ml-16">
            <section className="flex flex-col items-center justify-center px-5 py-10">
                <h1 className="text-black text-3xl font-bold">Choose a Dashboard template</h1>
                <p className="text-gray-500">Get started with a new Dashboard template which fits your exact needs.</p>
            </section>
            <DashboardTemplates />
            {Array.isArray(DashboardData) && DashboardData.length > 0 ? (
                DashboardData.map((data, index) => (
                    <div className="my-1 mx-7" key={index}>
                        <UserDashboards
                            dashboardName={data.dashboardProject?.projectName}
                            dashboardType={data.templateName}
                            ownerName={data.owner?.name}
                            handleDeleteBtn={() => handleDeleteBtn(data._id)}
                        />
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No dashboards available. Please create one!</p>
            )}
        </div>
    );
};
