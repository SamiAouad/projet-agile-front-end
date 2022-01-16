import React, {useState} from "react";
import {useNavigate, useParams} from 'react-router';
import axios from 'axios';
import Header from "../User/Header";
import * as yup from "yup";
import {useFormik} from "formik";
import '../css/SignUp.css'
import {Button} from "react-bootstrap";
import GroupeHeader from "../Groupe/GroupeHeader";

const api = axios.create({
    baseURL: `http://localhost:5000/voyage`
})

function CreateTrip() {
    const navigate = useNavigate();
    const params = useParams();
    const groupeId = params.groupeId;
    let [image, setImage] = useState("https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")

    let [file, setFile] = useState();

    const onSubmit = async () => {
        let item = new FormData()
        item.append('price', formik.values.price)
        item.append('dateStart', formik.values.dateStart)
        item.append('dateEnd', formik.values.dateEnd)
        item.append('capacite', formik.values.capacite)
        item.append('destination', formik.values.destination)
        item.append('voyageDescription', formik.values.voyageDescription)
        item.append('file', file)

        let user = JSON.parse(localStorage.getItem('userInfo'))
        console.log("before")

        let res = await api.post(`/createVoyage/${user.id}/${groupeId}`, item)
        console.log(res)
        if (res.data == null)
            console.log('creation de voyage impossible')
        else
            navigate(`/groupe/home/${res.data}`)
    }
    const validationSchema = yup.object({
        price:  yup.number().required(),
        dateStart:  yup.date().required(),
        dateEnd:  yup.date().required(),
        capacite: yup.number().required(),
        destination: yup.string().required(),
        voyageDescription: yup.string().required()
    })

    const formik = useFormik({
        initialValues: {
            price: '',
            dateStart: '',
            dateEnd: '',
            capacite: '',
            destination: '',
            voyageDescription: ''
        },
        onSubmit,
        validationSchema
    })

    /*
        return (
            <div>
               <Header/>
                <div>
                    <div className='col-sm-6 offset-sm-3 text-center form-signin'>
                        <h1>CREATE TRIP</h1>
                        <br />
                        <input type='text' value={price} onChange={e => setprice(e.target.value)} placeholder='Price' className='form-control' />
                        <br />
                        <input type='date' value={dateStart} onChange={e => setdateStart(e.target.value)} placeholder='date-Start' className='form-control' />
                        <br />
                        <input type='date' value={dateEnd} onChange={e => setdateEnd(e.target.value)} placeholder='date End' className='form-control' />
                        <br />
                        <input type='text' value={capacite} onChange={e => setcapacite(e.target.value)} placeholder='capacite' className='form-control' />
                        <br />
                        <textarea value={description} onChange={e => setdescription(e.target.value)} placeholder='description' className='form-control' />
                        <br />
                        <button onClick={AddTrip} className='btn btn-primary'>Create</button>
                    </div>
                </div>
            </div>
        )
        */

    return (
        <div className={"container-fluid"}>
            <div className={"row"}>
                <GroupeHeader/>
            </div>
            <div className="row register">
                <form className="row" onSubmit={formik.handleSubmit}>
                    <div className="col-md-3 register-left">
                        <h3>CREATE YOUR GROUP TRAVEL </h3>
                        <p>LIFE IS EASY</p>
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
                                            <input className="form-control" name="price" type='text' value={formik.values.price} onChange={formik.handleChange} placeholder='price' />
                                            {formik.errors.price ? <div className='text-danger'>{formik.errors.price}</div> : null}
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" type={"date"} name="dateStart" value={formik.values.dateStart} onChange={formik.handleChange} placeholder='dateStart' />
                                            {formik.errors.dateStart ? <div className='text-danger'>{formik.errors.dateStart}</div> : null}
                                        </div>
                                        <div className="form-group">
                                            <input type={"date"} className="form-control" name="dateEnd" value={formik.values.dateEnd} onChange={formik.handleChange} placeholder='dateEnd' />
                                            {formik.errors.dateEnd ? <div className='text-danger'>{formik.errors.dateEnd}</div> : null}
                                        </div>

                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input className="form-control" name="capacite" value={formik.values.capacite} onChange={formik.handleChange} placeholder='capacite' />
                                            {formik.errors.capacite ? <div className='text-danger'>{formik.errors.capacite}</div> : null}
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" name="destination" value={formik.values.destination} onChange={formik.handleChange} placeholder='destination' />
                                            {formik.errors.destination ? <div className='text-danger'>{formik.errors.destination}</div> : null}
                                        </div>
                                        <div className="form-group">
                                            <textarea className="form-control" name="voyageDescription" value={formik.values.voyageDescription} onChange={formik.handleChange} placeholder='voyageDescription' />
                                            {formik.errors.voyageDescription ? <div className='text-danger'>{formik.errors.voyageDescription}</div> : null}
                                        </div>
                                        <div className="form-group">
                                            <input type={"file"} className="form-control" accept={"jpg"} name="file" onChange={e => {setFile(e.target.files[0]); setImage(URL.createObjectURL(e.target.files[0]))}} placeholder='file' />
                                        </div>
                                        <Button type={"submit"} className="button-81 " value="CREATE">Submit</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default CreateTrip;