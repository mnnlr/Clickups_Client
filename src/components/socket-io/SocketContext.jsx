import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { showToast } from '../Toastconfig';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { user } = useSelector((state) => state.login);
    const [socket, setSocket] = useState(null);

    // const serverURL = "http://localhost:5173/";
    const serverURL = "https://clickups-server.onrender.com";

    useEffect(() => {
        if (user && user._id) {
            const newSocket = io(serverURL, {
                query: { UserId: user._id },
            });
            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Connected to the server');
            });

            newSocket.on('notification', (data) => {
                // console.log('Notification received:', data);
                showToast(data.message, "info");
            });

            newSocket.on('teamMemberAdded', (notification) => {
                // console.log("Team member added:", notification);
                showToast(notification.message, "info");
            });

            newSocket.on('projectUpdated', (notification) => {
                //console.log("Project updated:", notification);
                showToast(notification.message, "info");
            });

            newSocket.on('taskUpdated', (notification) => {
                //  console.log("Task updated:", notification);
                showToast(notification.message, "info");
            });

            newSocket.on('sprintCreated', (notification) => {
                //  console.log("Sprint created:", notification);
                showToast(notification.message, "info");
            });

            return () => {
                newSocket.disconnect();
            };
        }
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
