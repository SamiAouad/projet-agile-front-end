import React from "react";
import axios from "axios";
import img from "../../Images/Image2.jpg";
import { useState, useEffect } from "react";
import { CancelDemande} from "./Utilities/GroupeUtilities.js";
import Groupe from './Groupe.js'
import Header from "../User/Header";

const api = axios.create({
    baseURL: `http://localhost:5000/`
})

function GroupeList(){
    let [groupes, setGroupes] = useState([])
    let [memberships, setMemberships] = useState([])
    let [demandes, setDemandes] = useState([])
    let [loadingGroupes, setLoadingGroupes] = useState(true)
    let [loadingMemberships, setLoadingMemberships] = useState(true)
    let [loadingDemandes, setLoadingDemandes] = useState(true)
    let [refresh, setRefresh] = useState(false)
    
    useEffect(function () {
            let user = JSON.parse(localStorage.getItem('userInfo'))

            api.get(`groupe/getGroupes`).then((fetchedData) => {
                setGroupes(fetchedData.data);
                setLoadingGroupes(false)
            });
            api.get(`user/demandeExist/${user.id}`).then((fetchedData) => {
                setDemandes(fetchedData.data);
                setLoadingDemandes(false)

            });
            api.get(`user/isMember/${user.id}`).then((fetchedData) => {
                setMemberships(fetchedData.data);
                setLoadingMemberships(false)

            });
        }, [refresh])
    

    if (loadingDemandes || loadingGroupes || loadingMemberships){
        return <div>Loading</div>
    }

    let handleCancel = (userId, groupeId) => {
        CancelDemande(userId, groupeId).then(() => {
            setRefresh(!refresh)
    })
    }




    return(
        <div>
            <Header/>
            <div className="posts row">
            {groupes.map(groupe => {
                return (
                    <section key={groupe.id} className="dark col-12">
                        <div className="container-fluid py-4">
                            <Groupe groupe={groupe} memberships={memberships} demandes={demandes}/>
                        </div>
                    </section>
                )
            })}
            </div>
        </div>
    )
}

export default GroupeList;