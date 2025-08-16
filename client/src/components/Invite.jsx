import { useState } from 'react'
import { generateCode, log } from '../utils/logic.js'
import '../styles/Invite.css'
import { socket } from '../socket.js'

export default function Invite({ gameStatus, setGameStatus, error }) {

    console.log("ERROR: ", error)
    const [code, setCode] = useState("")
    const [val, setVal] = useState("")

    function handleGenerateCode() {
        const newCode = generateCode(5)
        setCode(newCode)
        socket.emit("open-room", newCode, log)
    }

    function handleSubmitCode() {
        socket.emit("join-room", val, log)
    }

    return (
        <div className="invite-container">
            {
                gameStatus === "waiting" ? <>
                    <button className="invite-button" onClick={() => {
                        setGameStatus("")
                        setCode("")
                        setVal("")
                    }}>Back
                    </button>
                    <h1>Waiting for your friend to join...</h1>
                    <div>
                        <button onClick={handleGenerateCode} className="invite-button">{code ? 'get new code' : 'generate invite code'}</button>
                        {
                            code !== "" &&
                            <p className='invite-code'>{code}</p>
                        }
                    </div></>

                    :

                    <><h1>Ask a friend to play chess</h1>
                        <div>
                            <button onClick={handleGenerateCode} className="invite-button">{code ? 'get new code' : 'generate invite code'}</button>
                            {
                                code !== "" &&
                                <p className='invite-code'>{code}</p>
                            }
                        </div>
                        <p className='invite-or'>or</p>
                        <input className='invite-input' placeholder="enter invite code" type="text" value={val} onChange={(e) => setVal(e.target.value)} />
                        <button onClick={handleSubmitCode} className="invite-button">Submit</button>
                    </>
            }
            {error === "invalid code" &&
                <>
                    <h1>Invalid code</h1>
                </>
            }
        </div>
    )
}