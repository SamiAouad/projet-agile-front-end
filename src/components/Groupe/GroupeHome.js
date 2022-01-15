import React, {useEffect} from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useState } from "react";
import "../css/post.css"
import GroupeHeader from "./GroupeHeader";

const api = axios.create({
    baseURL: `http://localhost:5000/post`
})



function GroupeHome(){
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


    return(
    <div className="container-fluid">
        <GroupeHeader id={groupeId}/>
        <div className="col-4 max-vh-300"/>
        <div className="overflow-auto">
            {
                postes.map(poste => {
                    return (
                        <div key={poste.id} className="card row" >
                            <img className="card-img-top" src={`data:image/png;base64, ${poste.image}`} alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title">{poste.title}</h5>
                                    <p className="card-text">{poste.content}</p>
                                    <a href={`/posteCommentaire/${poste.id}`} className="">see comments</a>
                                </div>
                        </div>
                    )
                })
            }
        </div>
        <div className="col-4"/>
    </div>)
}

export default GroupeHome;