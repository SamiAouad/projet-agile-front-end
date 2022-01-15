import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import * as yup from "yup";
import {useFormik} from "formik";
import { Link } from "react-router-dom";
import '../css/post.css';

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
    /*
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
    */
    return (
        <div className="post">
            <img
                className="postImg"
                src=""
                alt=""
            />
            <div className="postInfo">
                <div className="postCats">
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Music
            </Link>
          </span>
                    <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Life
            </Link>
          </span>
                </div>
                <span className="postTitle">
          <Link to="/post/abc" className="link">
            {poste.title}
          </Link>
        </span>
                <hr />
                <span className="postDate">1 hour ago</span>
            </div>
            <p className="postDesc">{poste.content}</p>
            <ul className="list-group list-group-flush">
                {
                    comments.map(comment => {
                        /*<li key={comment.id} className="list-group-item">{comment.username}: {comment.contenu}</li>*/
                        return(
                            <div className="col s12 m7" key={comment.id}>
                                <div className="card horizontal">
                                    <div className="card-stacked">
                                        <div className="card-content">
                                            <span className="card-title">{comment.username}</span>
                                            <p>{comment.contenu}</p>
                                        </div>
                                        <div className="card-action">
                                            <a href="#">This is a link</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default Comments;