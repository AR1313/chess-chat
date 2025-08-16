
import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL

// create socket connection once
//backend socket server
export const socket = io(SOCKET_URL, {
    transports: ["websocket"], // ensures stable connection
})

socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err);
});

// socket.on("connect", () => {
//     console.log("Socket connected! ID:", socket.id);
// });

// socket.on("connect_error", (err) => {
//     console.error("Socket connect error:", err);
// });

// socket.on('connect', () => {
//     displayMessage(message)
// })

