<<<<<<< HEAD
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { showToast } from '../Toastconfig';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { user } = useSelector((state) => state.login);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (user && user._id) {
            const newSocket = io('http://localhost:5000', {
                query: { UserId: user._id },
            });
            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Connected to the server');
            });

            newSocket.on('notification', (data) => {
                console.log('Notification received:', data);
                showToast(data.message, "info");
            });

            newSocket.on('teamMemberAdded', (notification) => {
                console.log("Team member added:", notification);
                showToast(notification.message, "info");
            });

            newSocket.on('projectUpdated', (notification) => {
                console.log("Project updated:", notification);
                showToast(notification.message, "info");
            });

            newSocket.on('taskUpdated', (notification) => {
                console.log("Task updated:", notification);
                showToast(notification.message, "info");
            });

            newSocket.on('sprintCreated', (notification) => {
                console.log("Sprint created:", notification);
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
=======
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const user = useSelector((state) => state.login.user);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (user && user._id) {
            const newSocket = io('http://localhost:5000', {
                query: { UserId: user._id },
            });
            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Connected to the server');
            });

            newSocket.on('notification', (data) => {
                console.log('Notification received:', data);
                toast.info(data.message); // Optionally display toast notification
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
>>>>>>> 5021c6d71957294c70dc404f0a3dcea3c2280e07
