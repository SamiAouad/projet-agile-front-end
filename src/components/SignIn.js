import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router';
import './css/SignUp.css';
import axios from 'axios';


const api = axios.create({
    baseURL: `http://localhost:5000/user`
})

function SignIn(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {

        let item = { username, password }
        api.post('/signIn', item).then(res => {
            if (res.data === false){
                console.log('connection impossible')
                return
            }
            else{
                localStorage.setItem('userInfo', JSON.stringify(res.data))
                console.log(localStorage.getItem('userInfo'))
                navigate('/Home')
            }
        })
    }

    return(
        <div >
            <div>
                <div className='col-sm-6 offset-sm-3 text-center form-signin'>
                    <h1>Login Page</h1>
                    <input type='email' value={username} onChange={e => setUsername(e.target.value)} placeholder='username' className='form-control' />
                    <br />
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='password' className='form-control' />
                    <br />
                    <button onClick={signIn} className='btn btn-primary'>Login</button>
                </div>
            </div>
        </div>
    )
}

export default SignIn;