import React, {useEffect} from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useState } from "react";
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
        setPostes(res.data)
    }

    useEffect(function (){
        getPostes()
    }, [])


    return(
    <div>
        <GroupeHeader id={groupeId}/>
        {postes.map(poste => {
            console.log(poste)
        })}
    </div>)
}

export default GroupeHome;