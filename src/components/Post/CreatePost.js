import React, {useState} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import axios from "axios";
import {useNavigate, useParams} from "react-router";
import GroupeHeader from "../Groupe/GroupeHeader";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../css/SignUp.css"
import img from "../../Images/Image10.jpg";
import logo from "../../Images/Logo.png";

const api = axios.create({
    baseURL: `http://localhost:5000/post`
})



function CreatePost(props) {
    let [file, setFile] = useState();
    let [image, setImage] = useState("https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")
    let navigate = useNavigate();
    const params = useParams();
    let groupeId = params.id;
    console.log(groupeId)

    const validationSchema = yup.object({
        title: yup.string().required("The title is required"),
        content:  yup.string().min(10, 'Must be more than 10 characters').required('description is required')
    })
    const onSubmit = async () => {
        let item = new FormData()
        item.append('title', formik.values.title)
        item.append('content', formik.values.content)
        item.append('file', file)

        let user = JSON.parse(localStorage.getItem('userInfo'))
        item.append('username', user.username)

        let res = await api.post(`/createPoste/${groupeId}/`, item)
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
        <div className={"container-fluid"}>
            <div className="row register">
                <form className="row" onSubmit={formik.handleSubmit}>
                    <div className="col-md-3 register-left">
                        <img src={logo} alt=""/>
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
                                <h3 className="register-heading">ADD NEW POST </h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input className="form-control" name="title" type='text' value={formik.values.title} onChange={formik.handleChange} placeholder='title' />
                                            {formik.errors.title ? <div className='text-danger'>{formik.errors.title}</div> : null}
                                        </div>
                                        <div className="form-group">
                                            <textarea className="form-control" name={"content"} type='text' value={formik.values.content} onChange={formik.handleChange} placeholder='content' />
                                            {formik.errors.content ? <div className='text-danger'>{formik.errors.content}</div> : null}
                                        </div>
                                        <div className="form-group">
                                            <input type={"file"} className="form-control" accept={"image/png"} name="file" onChange={e => {setFile(e.target.files[0]); setImage(URL.createObjectURL(e.target.files[0]))}} placeholder='file' />
                                        </div>
                                        <div className={'form-group'}>
                                            <button type={"submit"} className="button-81 button-form">Submit</button>
                                            <Link to={`/groupe/home/${groupeId}`} className="button-81 button-form" value="BACK">Cancel</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
        /*
        <div className="write">
            <img
                className="writeImg"
                src={image}
                alt=""
            />
            <form className="writeForm" onSubmit={formik.handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="file">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input id="file"
                           type="file" style={{ display: "none" }}
                           onChange={e => {setFile(e.target.files[0]); setImage(URL.createObjectURL(e.target.files[0]))}}
                    />
                    <input
                        name="title"
                        className="writeInput"
                        placeholder="Title"
                        type="text"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        autoFocus={true}
                    />
                    {formik.errors.title ? <div className='text-danger'>{formik.errors.title}</div> : null}
                </div>
                <div className="writeFormGroup">
                  <textarea
                      name="content"
                      className="writeInput writeText"
                      placeholder="Tell your story..."
                      type="text"
                      value={formik.values.content}
                      onChange={formik.handleChange}
                      autoFocus={true}
                  />
                {formik.errors.content ? <div className='text-danger'>{formik.errors.content}</div> : null}
                </div>
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
        */
        /*
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
            </div>*/
    );
}

export default CreatePost;