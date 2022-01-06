import React from "react";
import {useNavigate} from 'react-router';
import '../css/SignUp.css';
import axios from 'axios';
import * as yup from 'yup'
import { useFormik } from "formik";


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
            <form onSubmit={formik.handleSubmit}>
                <div className='col-sm-6 offset-sm-3 text-center form-signin'>
                    <h1>Login Page</h1>
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
    )
}

export default SignIn;