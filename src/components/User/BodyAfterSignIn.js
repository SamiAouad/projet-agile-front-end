import Posts from "../Post/Posts";

import {Navbar, Container, Nav, Carousel} from 'react-bootstrap'
import Post from "../Post/Post";
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router";

const api = axios.create({
    baseURL: `http://localhost:5000/post`
})

function BodyAfterSignIn() {
    let [postes, setPostes] = useState([])
    const params = useParams();
    let groupeId = params.groupeId;
    let userId = JSON.parse(localStorage.getItem('userInfo')).id


    async function getPostes(){
        const res = await api.get(`/getAll`)
        console.log(res.data)
        setPostes(res.data)
    }

    useEffect(function (){
        getPostes()
    }, [])
    return (

        <div className='mt-0' >
            <Carousel className='mt-0 '>
                {
                    postes.map(poste => {
                        return (
                            <Carousel.Item>
                                <Post poste={poste}/>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        </div>

    )
}

export default BodyAfterSignIn;