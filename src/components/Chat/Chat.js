import React, { useState, useEffect, useRef } from 'react'
import {db} from '../../Firebase'
import SendMessage from './SendMessage'
import {useParams} from "react-router";
import '../css/Chat.css'
import GroupeHeader from "../Groupe/GroupeHeader";

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
            <div className={'my-page'}>
                <div className="msgs">
                    {messages.map(({ id, text, image, username }) => (
                        <div>
                            <div key={id} className={`msg ${username === user.username ? 'sent' : 'received'}`}>
                                <img className={'my-image'} src={`data:image/png;base64, ${image}`} alt="" />
                                <p>{text}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <SendMessage scroll={scroll} />
                <div ref={scroll}></div>
            </div>
        </div>

    )
    /*return (
        <div className="card rare-wind-gradient chat-room">
            <div className="card-body">

                <div className="row px-lg-2 px-2">

                    <div className="col-md-6 col-xl-4 px-0">
                        Hello

                    </div>
                    <div className="col-md-6 col-xl-8 pl-md-3 px-lg-auto px-0">

                        <div className="chat-message">

                            <ul className="msgs list-unstyled chat-1 scrollbar-light-blue">
                                    {messages.map(({ id, text, image, username }) => {
                                        return (
                                            <div key={id}
                                                 className={`msg ${username === user.username ? 'sent' : 'received'}`}>
                                                <img className={'rounded-circle my-image'}
                                                     src={`data:image/png;base64, ${image}`} alt=""/>
                                                <p>{text}</p>
                                            </div>
                                        );
                                    })}
                            </ul>

                        </div>
                        <di>
                            <div className="white my-textarea">
                                <div className="form-group basic-textarea">
                                    <textarea className="form-control" id="exampleFormControlTextarea2"
                                              rows="3" placeholder="Type your message here..."></textarea>
                                </div>
                            </div>
                            <button type="button"
                                    className="btn btn-outline-pink btn-rounded btn-sm waves-effect waves-dark float-right">Send
                            </button>

                        </di>

                    </div>

                </div>

            </div>
        </div>
    )*/
}

export default Chat