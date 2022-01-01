import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router';
import axios from 'axios';
import './css/SignUp.css';
import logo from '../Images/Logo.png'
import * as yup from 'yup'
import { useFormik } from "formik";


const api = axios.create({
    baseURL: `http://localhost:5000/user`
})

function SignUp(){
    const navigate = useNavigate();
    
    const validationSchema = yup.object({
        firstname: yup.string('firstname must be a string').required('firstname is required'),
        lastname: yup.string().required(),
        username: yup.string().required(),
        mobile: yup.string().max(10).min(10).required(),
        email: yup.string().email().required(),
        passwordHash: yup.string().required(),
        passwordconf: yup.string().oneOf([yup.ref('passwordHash'), null], 'passwords do not match').required()
    })

    const onSubmit = async () => {

        let item = {
            firstname: formik.values.firstname,
            lastname: formik.values.lastname,
            username: formik.values.username,
            mobile: formik.values.mobile,
            email: formik.values.email,
            passwordHash: formik.values.passwordHash,
        }
        api.post('/signUp', item).then(res => {
            if (res.data == null)
                console.log('sign up impossible')
            else
                navigate('/')
        })
    }

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            username: '',
            mobile: '',
            email: '',
            passwordHash: '',
            passwordconf: ''
        },
        onSubmit, 
        validationSchema
    })

    return (
                <div className='col-sm-2 offset-sm-5 '>
                   
                <form onSubmit={formik.handleSubmit} className="form-signin text-light text-center">
                    <img className="mb-4" src={logo} alt="" width="72" height="72"/>
                    <h1>Register</h1>
                        <input type='text' name="firstname" value={formik.values.firstname} onChange={formik.handleChange} placeholder='firstname' className='form-control' />
                        {formik.errors.firstname ? <div className="text-danger">{formik.errors.firstname}</div> : null}
                        <br />
                        <input type='text' name="lastname" value={formik.values.lastname} onChange={formik.handleChange} placeholder='lastname' className='form-control' />
                        {formik.errors.lastname ? <div className="text-danger">{formik.errors.lastname}</div> : null}
                        <br />
                        <input type='text' name="username" value={formik.values.username} onChange={formik.handleChange} placeholder='username' className='form-control' />
                        {formik.errors.username ? <div className="text-danger">{formik.errors.username}</div> : null}

                        <br />
                        <input type='text'  name="mobile" value={formik.values.mobile} onChange={formik.handleChange} placeholder='mobile' className='form-control' />
                        {formik.errors.mobile ? <div className="text-danger">{formik.errors.mobile}</div> : null}
                        
                        <br />
                        <input type='email' name="email" value={formik.values.email} onChange={formik.handleChange} placeholder='email' className='form-control' />
                        {formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}

                        <br />
                        <input type='password' name="passwordHash" value={formik.values.passwordHash} onChange={formik.handleChange} placeholder='password' className='form-control' />
                        {formik.errors.passwordHash ? <div className="text-danger">{formik.errors.passwordHash}</div> : null}

                        <br/>
                        <input type='password' name="passwordconf" value={formik.values.passwordconf} onChange={formik.handleChange} placeholder='confirm password' className='form-control' />
                        {formik.errors.passwordconf ? <div className="text-danger">{formik.errors.passwordconf}</div> : null}

                        <br/>
                        <button type="submit" className='btn btn-outline-success'>Sign up</button>
        
                </form>
    </div>
        
    )
}

export default SignUp