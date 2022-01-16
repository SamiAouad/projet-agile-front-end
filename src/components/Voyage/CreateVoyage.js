import React, {useState} from 'react';
import {useNavigate} from "react-router";
import * as yup from "yup";
import {useFormik} from "formik";
import axios from "axios";
import Header from "../User/Header";
import GroupeHeader from "../Groupe/GroupeHeader";

const api = axios.create({
    baseURL: `http://localhost:5000/groupe`
})

function CreateVoyage(props) {
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
            descriptionVoyage: '',
            dateStart: '',
            dateEnd: '',
            capacite: '',
            price: ''
        },
        onSubmit,
        validationSchema
    })

    return (
        <div>
            <GroupeHeader/>
            <div>
                <div className='col-sm-6 offset-sm-3 text-center form-signin'>
                    <h1>CREATE GROUP</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <input name="title" type='text' value={formik.values.title} onChange={formik.handleChange} placeholder='title of the groupe' className='form-control' />
                        {formik.errors.title ? <div className='text-danger'>{formik.errors.title}</div> : null}
                        <br />
                        <textarea name="groupeDescription" value={formik.values.groupeDescription} onChange={formik.handleChange} placeholder='description' className='form-control' />
                        {formik.errors.groupeDescription ? <div className='text-danger'>{formik.errors.groupeDescription}</div> : null}
                        <br />
                        <input type='file' id='file' accept="jpg" onChange={e => setFile(e.target.files[0])}></input>
                        <button type="submit" className='btn btn-primary'>Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateVoyage;