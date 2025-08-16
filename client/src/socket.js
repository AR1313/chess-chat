
import { io } from 'socket.io-client'

// create socket connection once
//backend socket server
export const socket = io('http://localhost:8080');

// socket.on('connect', () => {
//     displayMessage(message)
// })

