import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router";
import Post from "./Post";

const api = axios.create({
    baseURL: `http://localhost:5000/post`
})




function GroupePosts(props) {
    let [postes, setPostes] = useState([])
    const params = useParams();
    let groupeId = params.groupeId;
    let userId = JSON.parse(localStorage.getItem('userInfo')).id


    async function getPostes(){
        const res = await api.get(`/getPostes/${groupeId}`)
        console.log(res.data)
        setPostes(res.data)
    }

    useEffect(function (){
        getPostes()
    }, [])
    return (
        <div>
            <div className="posts">
                {postes.map(poste => {
                    return (
                        <section key={poste.id} className="dark">
                            <div className="container-fluid py-4">
                                <Post poste={poste}/>
                            </div>
                        </section>
                    )
                })}
            </div>
        </div>
    );
}

export default GroupePosts;