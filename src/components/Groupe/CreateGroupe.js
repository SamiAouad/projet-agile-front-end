import React, {useState} from "react";
import {useNavigate} from 'react-router';
import axios from 'axios';
import { useFormik } from "formik";
import * as yup from 'yup';
import '../css/postForm.css'


const api = axios.create({
    baseURL: `http://localhost:5000/groupe`
})

function CreateGroupe() {
    let navigate = useNavigate();
    let [file, setFile] = useState();

    const onSubmit = async () => {
        let item = new FormData()
        item.append('title', formik.values.title)
        item.append('groupeDescription', formik.values.groupeDescription)
        item.append('file', file)

        let user = JSON.parse(localStorage.getItem('userInfo'))
        console.log("before")
        
        let res = await api.post(`/createGroupe/${user.id}`, item)
        console.log(res)
        if (res.data == null)
            console.log('creation de groupe impossible')
        else
            navigate(`/groupe/home/${res.data}`)
    }
    const validationSchema = yup.object({
        title:  yup.string().max(15, 'Must be less than 15 characters').required('title is required'),
        groupeDescription:  yup.string().min(10, 'Must be more than 10 characters').required('description is required')
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            groupeDescription: ''
        },
        onSubmit,
        validationSchema
    })

    return (
        <div>
                    <div>
                    <div className='col-sm-6 offset-sm-3 text-center write'>
                        <h1>CREATE GROUP</h1>
                        <img className="writeImg" src="#" alt=""/>
                        <form onSubmit={formik.handleSubmit} className="write">
                            <input className="writeInput" name="title" type='text' value={formik.values.title} onChange={formik.handleChange} placeholder='title of the groupe' className='form-control' />
                            {formik.errors.title ? <div className='text-danger'>{formik.errors.title}</div> : null}
                            <br />
                            <textarea className="writeInput" name="groupeDescription" value={formik.values.groupeDescription} onChange={formik.handleChange} placeholder='description' className='form-control' />
                            {formik.errors.groupeDescription ? <div className='text-danger'>{formik.errors.groupeDescription}</div> : null}
                            <br />
                            <input type='file' className="fileInput" id='file' accept="jpg" onChange={e => setFile(e.target.files[0])}></input>
                            <button type="submit" className='writeSubmit'>Sign up</button>
                        </form>
                    </div>
                    </div>
        </div>
    )
}

export default CreateGroupe;