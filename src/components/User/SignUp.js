import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router';
import axios from 'axios';
import img from '../../Images/Image10.jpg'
import logo from '../../Images/Logo.png'
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
        console.log('Onsubmit')
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
  <div className="container d-flex justify-content-center my-5 ">
   <div className="row my-2 mx-2 main">
    <div className="col-md-4 col-12 mycol">
            <img src={img}  width="100%" height="100%" className="rounded"/> </div>
        <div className="col-md-8 col-12 xcol">
             <img src={logo} width="150px"/>
             <div className="col align-self-center">
             <form  onSubmit={formik.handleSubmit} >
                 <div className='col-sm-8 offset-sm-2 text-center form-signUp'>
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
                        <button type="submit" className=' btn btn-outline-warning'>Sign up</button>
                 </div>
           
        
            </form>
             </div>
           
        </div>
    </div>
    </div>
                   
    
        
    )
}

export default SignUp