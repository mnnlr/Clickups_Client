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