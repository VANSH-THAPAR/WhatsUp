import io from 'socket.io-client';

// Change this URL if your backend runs on a different port
const BACKEND_URL = "http://localhost:3000"; 

export const connectWS = () => {
    return io(BACKEND_URL, {
        withCredentials: true,
        transports: ['websocket', 'polling'] 
    });
};