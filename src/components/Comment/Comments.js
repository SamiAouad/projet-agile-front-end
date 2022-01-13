import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import * as yup from "yup";
import {useFormik} from "formik";

const api = axios.create({
    baseURL: `http://localhost:5000/post`,
    enctype: "multipart/form-data"
})



function Comments(props) {
    const [refresh, setRefresh] = useState(false)
    const [poste, setPoste] = useState()
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState();
    const params = useParams()
    const posteId = params.posteId;
    const user = JSON.parse(localStorage.getItem('userInfo'))
    const userId = user.id
    const username = user.username

    useEffect(async function () {
        let res = await api.get(`/getPostesCommentaire/${posteId}`)
        setComments(res.data)
        res = await api.get(`/getPoste/${posteId}`)
        setPoste(res.data)

        setLoading(false)
    }, [refresh])
    const onSubmit = async () => {
        let item = new FormData()
        item.append('contenu', formik.values.contenu)
        item.append('posteId', posteId)
        item.append('username', username)
        const res = await api.post('/createCommentaire', item,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        if (res === false){
            return console.log("an error has occured")
        }else{
            setRefresh(!refresh)
        }
    }
    const validationSchema = yup.object({
        contenu:  yup.string().required('description is required')
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            groupeDescription: ''
        },
        onSubmit,
        validationSchema
    })

    if (loading === true){
        return(<div>Loading</div>)
    }

    return (
        <div className="card">
            <img src="..." className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{poste.title}</h5>
                    <p className="card-text">{poste.content}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                    {
                        comments.map(comment => {
                            return(
                                <li key={comment.id} className="list-group-item">{comment.username}: {comment.contenu}</li>
                            );
                        })
                    }
                    <li className="list-group-item">
                        <form onSubmit={formik.handleSubmit}>
                            <textarea name="contenu" value={formik.values.contenu} onChange={formik.handleChange} placeholder='contenu' className='form-control' />
                            {formik.errors.contenu ? <div className='text-danger'>{formik.errors.groupeDescription}</div> : null}
                            <br />
                            <button type="submit" className='btn btn-primary'>comment</button>
                        </form>
                    </li>
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
        </div>
    );
}

export default Comments;