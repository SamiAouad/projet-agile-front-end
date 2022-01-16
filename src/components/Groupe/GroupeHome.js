import React, {useEffect} from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useState } from "react";
import "../css/post.css"
import GroupeHeader from "./GroupeHeader";
import Header from "../User/Header";
import Body from "../User/Body";
import Posts from "../Post/Posts";
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
        <GroupeHeader/>
        <Posts/>
    </div>)
}

export default GroupeHome;