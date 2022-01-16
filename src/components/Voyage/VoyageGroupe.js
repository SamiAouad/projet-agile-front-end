import React, {useEffect, useState} from 'react';
import Groupe from "../Groupe/Groupe";
import {useParams} from "react-router";
import axios from "axios";
import VoyageUnit from "./VoyageUnit";
import GroupeHeader from "../Groupe/GroupeHeader";

const api = axios.create({
    baseURL: `http://localhost:5000`
})

function VoyageGroupe() {
    const params = useParams();
    let [voyages, setVoyages] = useState([])
    let [joined, setJoined] = useState([])
    let [demandes, setDemandes] = useState([])
    let [loading, setLoading] = useState(true)
    let [refresh, setRefresh] = useState(false)
    let [admin, setAdmin] = useState(false)
    let voyageurs = {}
    let [user, setUser] = useState(0)

    useEffect(async function () {
        let userId = JSON.parse(localStorage.getItem('userInfo')).id
        setUser(userId)
        let groupeId = parseInt(params.groupeId)
        let result = await api.get(`user/isAdmin/${userId}/${groupeId}`)
        setAdmin(result.data)
        let user = JSON.parse(localStorage.getItem('userInfo'))

        let res = await api.get(`voyage/getVoyages/${groupeId}/${userId}`)
        if (res.data === null){
            console.log("an error has occured")
        }
        setVoyages(res.data[0])
        setJoined(res.data[1])
        setDemandes(res.data[2])

    }, [refresh])

    return (
        <div>
            {console.log('voyages',voyages)}
            {console.log('demandes',demandes)}
            {console.log('joined',joined)}
            <GroupeHeader/>
            {voyages.map(voyage => {
                return (
                        <div className="container-fluid py-4">
                            <VoyageUnit voyage={voyage} joined={joined} demandes={demandes}/>
                        </div>
                )
            })}
        </div>
    );
}

export default VoyageGroupe;