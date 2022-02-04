import React, {useEffect, useState} from 'react';
import {CancelDemande, CheckMember} from "./Utilities/GroupeUtilities";
import {Button} from "react-bootstrap";
import axios from "axios";
import '../css/SignUp.css'
import {Link} from "react-router-dom";



const api = axios.create({
    baseURL: `http://localhost:5000/`
})



function Groupe(groupe) {
    let [refresh, setRefresh] = useState(false)
    let [memberships, setMemberships] = useState([])
    let [demandes, setDemandes] = useState([])
    let [loadingMemberships, setLoadingMemberships] = useState(true)
    let [loadingDemandes, setLoadingDemandes] = useState(true)

    useEffect(function () {
        let user = JSON.parse(localStorage.getItem('userInfo'))


        api.get(`user/demandeExist/${user.id}`).then((fetchedData) => {
            setDemandes(fetchedData.data);
            setLoadingDemandes(false)

        });
        api.get(`user/isMember/${user.id}`).then((fetchedData) => {
            setMemberships(fetchedData.data);
            setLoadingMemberships(false)

        });
    }, [refresh])


    if (loadingDemandes || loadingMemberships){
        return <div>Loading</div>
    }

    function groupeButton(groupe){
        let user = JSON.parse(localStorage.getItem('userInfo'))
        if (memberships && CheckMember(groupe, memberships)){
            return <Link  to={`/groupe/home/${groupe.id}`}><button className="button-81">Access</button></Link>
        }
        if (demandes && CheckMember(groupe, demandes))
            return <button value={groupe.id} className="button-81" onClick={() => {handleCancel(user.id, groupe.id)}}>Cancel</button>
        return <Link  to={`/joinGroupe/${groupe.id}`}><button className="button-81">Join</button></Link>
    }
    let handleCancel = (userId, groupeId) => {
        CancelDemande(userId, groupeId).then(() => {
            window.location.reload(true)
        })
    }
    return (
        <div>
            <article className="postcard dark blue">
                <a className="postcard__img_link" href="#">
                    <img className="postcard__img" src={`data:image/png;base64, ${groupe.groupe.image}`} alt="Image Title"/>
                </a>
                <div className="postcard__text">
                    <h1 className="postcard__title blue"><a href="#">{groupe.groupe.title}</a></h1>
                    <div className="postcard__subtitle small">
                        <time dateTime="2020-05-25 12:00:00">
                            <i className="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                        </time>
                    </div>
                    <div className="postcard__bar"></div>
                    <div className="postcard__preview-txt">{groupe.groupe.groupeDescription}</div>
                    <ul className="postcard__tagbox">
                        <li>
                            {groupeButton(groupe.groupe)}
                        </li>
                    </ul>
                </div>
            </article>

        </div>
    );
}

export default Groupe;