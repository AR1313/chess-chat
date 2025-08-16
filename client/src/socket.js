
import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL

// create socket connection once
//backend socket server
export const socket = io(import.meta.env.VITE_SOCKET_URL, {
    transports: ["websocket"], // ensures stable connection
})

// socket.on('connect', () => {
//     displayMessage(message)
// })

