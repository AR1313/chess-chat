
import '../styles/Chat.css'
import arrow from '../assets/icons/arrow.svg'
import { useState, useRef, useEffect } from 'react'

export default function Chat({ messages, sendMessage, roomCode }) {
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    const [newMessage, setNewMessage] = useState('')


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    function handleSendMessage() {

        if (newMessage.trim() === "") return;

        sendMessage(newMessage, 'outgoing', roomCode);
        setNewMessage("");

        // Reset height to default
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // back to 1 row
        }
    }


    return (<div className="chat-container">
        <div className="chat-header">Chat</div>
        <div className="chat-messages">
            {
                messages.filter((m) => m.roomCode === roomCode).map((m, index) => {
                    return <div key={index} className={m.type === "outgoing" ? "message outgoing" : 'message incoming'}>{m.message}</div>
                })
            }
            <div ref={messagesEndRef}></div>
        </div>
        <div className="chat-input">
            <textarea
                ref={textareaRef}
                placeholder="Type a message..."
                rows={1}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault(); // stop newline
                        handleSendMessage();
                    }
                }}
            ></textarea>
            <button onClick={handleSendMessage}> <img
                src={arrow}
                alt="send message"
                style={{ width: '40px', height: '15px', margin: '3px 0px 10px 0px' }}
            />
            </button>
        </div>
    </div >)
}