import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import * as yup from "yup";
import {useFormik} from "formik";
import axios from "axios";
import logo from "../../Images/Logo.png";
import {Link} from "react-router-dom";
import {formatDate} from "./Utilities";

const api = axios.create({
    baseURL: `http://localhost:5000/voyage`
})

function UpdateVoyage(props) {
    const navigate = useNavigate();
    const params = useParams();
    const voyageId = params.voyageId;
    const [voyage, setVoyage] = useState();
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    let [image, setImage] = useState("https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")

    let [file, setFile] = useState();

    useEffect(() => {
         const fetchData = async () => {
             let res = await api.get(`/getVoyage/${voyageId}`)
             setVoyage(res.data[0])
             setLoading(false)
         }
         fetchData()
    }, [refresh])



    const onSubmit = async () => {
        let item = new FormData()
        item.append('price', formik.values.price !== '' ? formik.values.price : voyage.price)
        item.append('dateStart', formik.values.dateStart !== '' ? formik.values.dateStart : new Date(voyage.dateStart).toISOString().slice(0, 19).replace('T', ' '))
        item.append('dateEnd', formik.values.dateEnd !== '' ? formik.values.dateEnd : new Date(voyage.dateEnd).toISOString().slice(0, 19).replace('T', ' '))
        item.append('capacite', formik.values.capacite !== '' ? formik.values.capacite : voyage.capacite)

        let user = JSON.parse(localStorage.getItem('userInfo'))

        let res = await api.post(`/updateVoyage/${voyageId}`, item)
        console.log(res)
        if (res.data === false)
            console.log('update unsuccessful')
        else{
            setRefresh(!refresh)
        }
    }
    const validationSchema = yup.object({
        price:  yup.number(),
        dateStart:  yup.date(),
        dateEnd:  yup.date(),
        capacite: yup.number(),

    })

    const formik = useFormik({
        initialValues: {
            price: '',
            dateStart: '',
            dateEnd: '',
            capacite: '',
            destination: '',
            voyageDescription: '',
        },
        onSubmit,
        validationSchema
    })
    if (loading){
        return (
            <div>Loading</div>
        )
    }



    return (
        <div className={"container-fluid"}>
            <div className="row register">
                <form className="row" onSubmit={formik.handleSubmit}>
                    <div className="col-md-3 register-left">
                        <img src={logo} alt=""/>
                        <h3>UPDATE YOUR GROUP TRAVEL </h3>
                        <p>“I am not the same, having seen the moon shine on the other side of the world” – Mary Anne Radmacher</p>
                        <img
                            className="writeImg"
                            src={image}
                            alt=""
                        />
                    </div>
                    <div className="col-md-9 register-right">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">CREATE YOUR TRIP </h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor={'price'}>{voyage.price}</label>
                                            <input className="form-control" name="price" type='text' value={formik.values.price} onChange={formik.handleChange} placeholder='price' />
                                            {formik.errors.price ? <div className='text-danger'>{formik.errors.price}</div> : null}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={'dateStart'}>{formatDate(voyage.dateStart)}</label>
                                            <input className="form-control" type={"date"} name="dateStart" value={formik.values.dateStart} onChange={formik.handleChange} placeholder='dateStart' />
                                            {formik.errors.dateStart ? <div className='text-danger'>{formik.errors.dateStart}</div> : null}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={'dateEnd'}>{formatDate(voyage.dateEnd)}</label>
                                            <input type={"date"} className="form-control" name="dateEnd" value={formik.values.dateEnd} onChange={formik.handleChange} placeholder='dateEnd' />
                                            {formik.errors.dateEnd ? <div className='text-danger'>{formik.errors.dateEnd}</div> : null}
                                        </div>

                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor={'capacite'}>{voyage.capacite}</label>
                                            <input className="form-control" name="capacite" value={formik.values.capacite} onChange={formik.handleChange} placeholder='capacite' />
                                            {formik.errors.capacite ? <div className='text-danger'>{formik.errors.capacite}</div> : null}
                                        </div>

                                        <button type={"submit"} className="button-81 button-form" value="CREATE">Update</button>
                                        <Link to={`/groupe/admin/trips/${voyage.groupeId}`} className="button-81 button-form" value="BACK">Finish</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default UpdateVoyage;