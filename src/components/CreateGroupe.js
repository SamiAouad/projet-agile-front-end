import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router';
import axios from 'axios';
import Header from "./Header";

const api = axios.create({
    baseURL: `http://localhost:5000/groupe`
})

function CreateGroupe() {
    const navigate = useNavigate();
    const [title, settitle] = useState('');
    const [groupeDescription, setGroupeDescription] = useState('');
    

    const signUp = async () => {

        let item = { title, groupeDescription }
        api.post('/createGroupe', item).then(res => {
            if (res.data == null)
                console.log('creation de groupe impossible')
            else
                navigate('/')
        })
    }

    return (
        <div>
           <Header/>
            <div>
                <div className='col-sm-6 offset-sm-3 text-center'>
                    <h1>Login Page</h1>
                    <input type='text' value={title} onChange={e => settitle(e.target.value)} placeholder='title of the groupe' className='form-control' />
                    <br />
                    <textarea value={groupeDescription} onChange={e => setGroupeDescription(e.target.value)} placeholder='description' className='form-control' />
                    <br />
                    <button onClick={signUp} className='btn btn-primary'>Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default CreateGroupe;