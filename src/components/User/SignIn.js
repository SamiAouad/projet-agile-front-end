import React from "react";
import {useNavigate} from 'react-router';
import '../css/SignIn.css';
import axios from 'axios';
import * as yup from 'yup';
import Header from "./Header";

import { useFormik } from "formik";
import img from '../../Images/Image11.jpg'


const api = axios.create({
    baseURL: `http://localhost:5000/user`
})



function SignIn(){
    const navigate = useNavigate();

    const validationSchema = yup.object({
        username: yup.string('username must be a string').required('username is required'),
        password: yup.string('not a string').required('password is required')
    })
    const onSubmit = async () => {
        console.log(formik.values)
        api.post('/signIn', formik.values).then(res => {
            if (res.data === false){
                console.log('connection impossible')
                return
            }
            else{
                //localStorage.setItem('userInfo', JSON.stringify(res.data))
                let userInfo = {
                    id: res.data.id,
                    username: res.data.username
                }
                localStorage.setItem('userInfo', JSON.stringify(userInfo))
                navigate('/Home')
            }
        })
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit,
        validationSchema
    })

   
    return(
        <div >
        
        {/* <div className=" container d-flex justify-content-center my-5 ">
            <div className="row my-2 mx-2 main">
                <div className="col-md-4 col-12 mycol">
                <img src={img}  width="100%" height="100%" className="rounded"/> 
                </div>
           <div  className="col align-self-center">
           <form onSubmit={formik.handleSubmit}>
            <div className='col-sm-8 offset-sm-2 text-center form-signin'>
                <h1>Welcome Back !</h1>
                <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='username' className='form-control' />
                {formik.errors.username ? <div className="text-danger">{formik.errors.username}</div> : null}
                <br />
                <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='password' className='form-control' />
                {formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
                <br />
                <button type='submit' className='btn btn-primary'>Login</button>
            </div>
        </form>
           </div>
        
            </div>
            </div> */}
         <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={formik.handleSubmit}>
        <label>Username</label>
        <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='username' className='loginInput' />
        {formik.errors.username ? <div className="text-danger">{formik.errors.username}</div> : null}
        
        <label>Password</label>
        <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='password' className='loginInput' />
        {formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
        <br />
        <button className="loginButton"type="submit">Login</button>
      </form>
        <button className="loginRegisterButton">Register</button>
    </div>
        </div>
    )
}

export default SignIn;