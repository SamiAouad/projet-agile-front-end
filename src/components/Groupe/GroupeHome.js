import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useState } from "react";

const api = axios.create({
    baseURL: `http://localhost:5000/groupe`
})

function GroupeHome(){
    const params = useParams()
    let [voyages, setVoyages] = useState([])

    function getGroupes(){
        api.post(`getVoyages/${params.groupeId}`, (res) => {
            setVoyages(res)
        })
    }
    getGroupes()
    return(
    <div>
        {voyages.map(voyage => {
            <p>voyage</p>
        })}
    </div>)
}

export default GroupeHome;