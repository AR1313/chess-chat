
import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL

// create socket connection once
//backend socket server
export const socket = io(SOCKET_URL)

// socket.on('connect', () => {
//     displayMessage(message)
// })

