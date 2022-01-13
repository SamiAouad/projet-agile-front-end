import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import Header from "../User/Header";
import io from 'socket.io-client'

function Chat(props) {
    const [messages, setMessages] = useState([])
    const socket = io.connect("http://localhost:8000")

    const onSubmit = async () => {
        socket.emit("chat", formik.values.message)
        const res = await formik.setFieldValue("message", "");
    }

    useEffect(() => {
        socket.on("chat", (payload) => {
            setMessages([...messages, payload])
        })
        return () => {
            socket.disconnect();
        }
    })


    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit
    })
    return (
        <div>
            <Header/>
            <div>
                <div className='col-sm-6 offset-sm-3 text-center form-signin'>
                    {
                        messages.map((message, index) => {
                            return (<p key={index}>{message}</p>)
                        })
                    }
                    <form onSubmit={formik.handleSubmit}>
                        <input name="message" type='text' value={formik.values.message} onChange={formik.handleChange} placeholder='message' className='form-control' />
                        <br />
                        <button type="submit" className='btn btn-primary'>Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;