import express from 'express'
import cors from 'cors'
import { chessPieces } from "./data/chessPieces.js";
import { messageHistory, sendMessage } from './data/messageHistory.js'
import { createServer } from "http";
import { Server } from "socket.io";

const app = express()
app.use(express.json());

const corsOptions = { origin: ["http://localhost:5173", "chess-chat-virid.vercel.app"] }
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions))

// Create HTTP server *from* Express
const httpServer = createServer(app);

// Create Socket.IO server and attach it to the HTTP server
const io = new Server(httpServer, { cors: corsOptions });

const pieces = chessPieces
const messages = messageHistory
const roomCodes = {}

//runs whenever client connects to our server
//sends a socket instance 
io.on("connection", socket => {

    //socket.id is the user

    socket.on("open-room", (roomCode, log) => {

        //check if invalid room code
        if (!roomCode || roomCode.length !== 5 || roomCodes.hasOwnProperty(roomCode)) {
            return log(new Error("Invalid room code generated"));
        }

        //is valid room code
        socket.join(roomCode);
        roomCodes[roomCode] = 1
        log(null, "Opened new room successfully");
        socket.emit("opened-room", roomCode)
    })


    socket.on("join-room", (roomCode, log) => {

        //check if invalid room code
        if (!roomCodes.hasOwnProperty(roomCode)) {
            log(new Error("Invalid room code"))
            return socket.emit("joined-room-error", "invalid code")
        }

        //is valid room code
        socket.join(roomCode);
        roomCodes[roomCode]++
        log(null, "Joined room successfully");
        io.to(roomCode).emit("joined-room", 'started', roomCode)
    });


    socket.on('send-message', (msgObj, log) => {

        //check if invalid room code
        if (!msgObj.message || !msgObj.type || !msgObj.roomCode) {
            return log(new Error("Invalid message/type/room code"));
        }

        messages.push(msgObj)
        const recipientObj = {
            type: 'incoming',
            message: msgObj.message,
            roomCode: msgObj.roomCode
        }

        log(null, "Sent message succesfully");

        socket.to(msgObj.roomCode).emit('receive-message', recipientObj)
    })

    app.get('/api/chess-pieces', (req, res) => {
        res.status(200).send(pieces)
    })

    app.get('/api/messageHistory', (req, res) => {
        res.status(200).send(messages)
    })

})

httpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// httpServer.listen(8080, () => {
//     console.log("Server started on post 8080")
// })



//OLD POST REQUEST
  // app.post('/api/messageHistory', (req, res) => {
    //     const { message, type } = req.body;

    //     if (!message || !type) {
    //         return res.status(400).json({ error: 'Message and type are required' });
    //     }

    //     const newMessage = { type, message };
    //     messages.push(newMessage);

    //     res.status(201).json(newMessage); // send back the saved message
    // });