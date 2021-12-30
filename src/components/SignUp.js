import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router';
import axios from 'axios';
import './css/SignUp.css';
import logo from '../Images/Logo.png'


const api = axios.create({
    baseURL: `http://localhost:5000/user`
})

function SignUp(){
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [passwordHash, setPasswordHash] = useState('');
    const [passwordconf, setPasswordconf] = useState('');

    const signUp = async () => {

        let item = { firstname, lastname, username, mobile, email, passwordHash }
        api.post('/signUp', item).then(res => {
            if (res.data == null)
                console.log('sign up impossible')
            else
                navigate('/')
        })
    }

    return (
        <div>
      
                <div className='col-sm-2 offset-sm-5 '>
                   
                <form className="form-signin text-light text-center">
                <img className="mb-4" src={logo} alt="" width="72" height="72"/>
                <h1>Register</h1>
                    <input type='text' value={firstname} onChange={e => setFirstname(e.target.value)} placeholder='firstname' className='form-control' />
                    <br />
                    <input type='text' value={lastname} onChange={e => setLastname(e.target.value)} placeholder='lastname' className='form-control' />
                    <br />
                    <input type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder='username' className='form-control' />
                    <br />
                    <input type='text' value={mobile} onChange={e => setMobile(e.target.value)} placeholder='mobile' className='form-control' />
                    <br />
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='email' className='form-control' />
                    <br />
                    <input type='password' value={passwordHash} onChange={e => setPasswordHash(e.target.value)} placeholder='password' className='form-control' />
                    <br/>
                    <input type='password' value={passwordconf} onChange={e => setPasswordconf(e.target.value)} placeholder='confirm password' className='form-control' />
                    <br/>
                    <button onClick={signUp} className='btn btn-outline-success'>Sign up</button>
      
    </form>
    </div>
    </div>
 
        
    )
}

export default SignUp