import React, {useState} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import axios from "axios";
import {useNavigate, useParams} from "react-router";

const api = axios.create({
    baseURL: `http://localhost:5000/post`
})



function CreatePost(props) {
    let [file, setFile] = useState();
    let navigate = useNavigate();
    const params = useParams();
    let groupeId = params.id;
    console.log(groupeId)

    const validationSchema = yup.object({
        content:  yup.string().min(10, 'Must be more than 10 characters').required('description is required')
    })
    const onSubmit = async () => {
        let item = new FormData()
        item.append('title', formik.values.title)
        item.append('content', formik.values.content)
        item.append('file', file)

        let user = JSON.parse(localStorage.getItem('userInfo'))

        let res = await api.post(`/createPoste/${user.id}/${groupeId}/`, item)
        if (res.data === false)
            console.log('creation de post impossible')
        else
            navigate(`/groupe/home/${groupeId}`)
    }
    const formik = useFormik({
        initialValues: {
            title: '',
            content: ''
        },
        onSubmit,
        validationSchema
    })

    return (
            <div className='col-sm-6 offset-sm-3 text-center form-signin'>
                <h1>CREATE POST</h1>
                <form onSubmit={formik.handleSubmit}>
                    <input name="title" type='text' value={formik.values.title} onChange={formik.handleChange} placeholder='title' className='form-control' />
                    {formik.errors.title ? <div className='text-danger'>{formik.errors.title}</div> : null}
                    <br />
                    <textarea name="content" value={formik.values.content} onChange={formik.handleChange} placeholder='content' className='form-control' />
                    {formik.errors.content ? <div className='text-danger'>{formik.errors.content}</div> : null}
                    <br />
                    <input type='file' id='file' accept="jpg" onChange={e => setFile(e.target.files[0])}/>
                    <button type="submit" className='btn btn-primary'>Post-It</button>
                </form>
            </div>
    );
}

export default CreatePost;