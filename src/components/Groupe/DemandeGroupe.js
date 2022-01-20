import React from 'react'
import {useNavigate} from 'react-router';
import Header from "../User/Header";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router';
import GroupeHeader from "./GroupeHeader";

const api = axios.create({
    baseURL: `http://localhost:5000/groupe`
})

function DemandeGroupe() {

    const navigate = useNavigate();
    const params = useParams()

    const onSubmit = async () => {
        let item = new FormData()
        let userId = JSON.parse(localStorage.getItem('userInfo')).id
        item.append('motivation', formik.values.motivation)
        item.append('userId', userId)
        item.append('groupeId', params.groupeId)
        
        api.post(`/joinGroupe/`, item).then(res => {
            if (res.data == null)
                console.log("erreur de l'envoie du demande")
            else
                navigate(`/listeGroupes/`)
        })
    }
    const validationSchema = yup.object({
        motivation:  yup.string('motivation must be a string').min(30, 'Must be more than 30 characters').required("motivation is required"),
    })

    const formik = useFormik({
        initialValues: {
            motivation: ''
        },
        onSubmit,
        validationSchema
    })

    return (
        <div>
            <GroupeHeader/>
                    <div>
                    <div className='col-sm-6 offset-sm-3 text-center form-signin'>
                        <h1 className={"text-light"}>DEMANDE DE REJOINDRE</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <textarea name="motivation" value={formik.values.motivation} onChange={formik.handleChange} placeholder='motivation' className='form-control' />
                            {formik.errors.motivation ? <div className='text-danger'>{formik.errors.motivation}</div> : null}
                            <br />
                            <button type="submit" className='button-81'>Envoyer</button>
                        </form>
                    </div>
                    </div> 
        </div>
    )
}

export default DemandeGroupe
