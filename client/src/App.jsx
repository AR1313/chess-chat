import { useState, useEffect, createContext, useContext, use } from 'react'
import './styles/App.css'
import Board from './components/Board.jsx'
import Chat from './components/Chat.jsx'
import NavBar from './components/NavBar.jsx'
import { PiecesProvider } from "./context/PiecesContext.jsx";
import axios from "axios"
import { socket } from './socket';
import Invite from './components/Invite.jsx'
import { log } from './utils/logic.js'
const API_URL = import.meta.env.VITE_API_URL;

function App() {

  const [messages, setMessages] = useState([])
  const [gameStatus, setGameStatus] = useState("")
  const [error, setError] = useState("");
  const [roomCode, setRoomCode] = useState(null)

  //socket//////////////////////////////////

  useEffect(() => {

    const connectHandler = () => {

    }

    const receiveMessageHandler = (msgObj) => {
      setMessages(prev => [...prev, msgObj]);
    }

    const joinedRoomHandler = (gameStatus, code) => {
      setError("")
      setRoomCode(code)
      setGameStatus(gameStatus)
    }

    const openedRoomHandler = (code) => {
      setError("")
      setRoomCode(code)
      setGameStatus("waiting")
    }

    const err_joinedRoomHandler = (msg) => {
      setError(msg)
    }

    socket.on('connect', connectHandler);

    socket.on('receive-message', receiveMessageHandler)

    socket.on('joined-room', joinedRoomHandler)

    socket.on('opened-room', openedRoomHandler)

    socket.on("joined-room-error", err_joinedRoomHandler)

    return () => {
      socket.off('connect', connectHandler);
      socket.off('receive-message', receiveMessageHandler);
      socket.off('joined-room', joinedRoomHandler);
      socket.off('opened-room', openedRoomHandler);
      socket.off("joined-room-error", err_joinedRoomHandler)
    }

  }, []);

  //socket//////////////////////////////////

  useEffect(() => {

    async function fetchMessages() {
      try {
        const res = await axios.get(`${API_URL}/api/messageHistory`);
        setMessages(res.data)
      }
      catch (err) {
        console.error("Error fetching messages: ", err)
      }
    }

    fetchMessages()


  }, [])

  async function sendMessage(newMsg, msgType = 'outgoing', roomCode) {
    if (!newMsg.trim()) return;

    // Send via socket
    const msgObj = { type: msgType, message: newMsg, roomCode: roomCode };

    setMessages(prev => [...prev, msgObj]);

    // Send via socket
    socket.emit('send-message', msgObj, log);

    // Optionally persist to backend
    // try {
    //   await axios.post('http://localhost:8080/api/messageHistory', messageObj);
    // } catch (err) {
    //   console.error('Error saving message:', err);
    // }

  }

  return (<>
    {
      gameStatus === "started" ?
        <div className="content">
          <NavBar />
          <div className="game">
            <div className="board-container">
              <PiecesProvider>
                <Board />
              </PiecesProvider>
            </div>
            <div>
              <Chat messages={messages} sendMessage={sendMessage} roomCode={roomCode} />
            </div>
          </div>
        </div>
        : gameStatus === "" || gameStatus === "waiting" ?
          <Invite gameStatus={gameStatus} setGameStatus={setGameStatus} error={error} />
          : <p>ending page</p>
    }
  </>
  )
}

export default App
