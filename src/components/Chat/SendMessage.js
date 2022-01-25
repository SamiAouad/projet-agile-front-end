import React, { useState } from 'react'
import {db} from "../../Firebase";
import firebase from "firebase/compat/app";
import {useParams} from "react-router";
import '../css/Chat.css'


function SendMessage({ scroll }) {
    const params = useParams();
    const [msg, setMsg] = useState('')
    const user = JSON.parse(localStorage.getItem('userInfo'))
    const groupeId = params.groupeId;

    async function sendMessage(e) {
        e.preventDefault()
        await db.collection('messages').add({
            text: msg,
            image: user.image,
            username: user.username,
            groupeId: groupeId,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <input className={'form-control'} style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <button className={'button-81'} style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage