import React, { useState, useEffect, useRef } from 'react'
import {db} from '../../Firebase'
import SendMessage from './SendMessage'
import {useParams} from "react-router";
import '../css/Chat.css'

function Chat() {
    const scroll = useRef()
    const params = useParams()
    const groupeId = params.groupeId
    const [messages, setMessages] = useState([])
    const user = JSON.parse(localStorage.getItem('userInfo'))
    useEffect(() => {
        db.collection('messages').where('groupeId', '==', groupeId).orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
            console.log(messages)
        })
    }, [])
    return (
        <div>
            <div className="msgs">
                {messages.map(({ id, text, image, username }) => (
                    <div>
                        <div key={id} className={`msg ${username === user.username ? 'sent' : 'received'}`}>
                            <img src={`data:image/png;base64, ${user.image}`} alt="" />
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
}

export default Chat