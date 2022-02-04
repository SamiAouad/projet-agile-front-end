import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {useParams} from "react-router";
import axios from "axios";
import {formatDate} from "./Utilities";

const api = axios.create({
    baseURL: `http://localhost:5000`
})

function VoyageUnit({voyage, joined, demandes}) {
    console.log("demandes: ", demandes)
    console.log("joined", joined)
    const params = useParams();
    let [refresh, setRefresh] = useState(false)
    let [userId, setUserId] = useState(JSON.parse(localStorage.getItem('userInfo')).id)

    function annulerVoyage(voyage){
        api.delete(`voyage/deleteVoyages/${voyage.id}`).then(() => {
            window.location.reload(true)
        })
    }

    function annulerDemande(voyage){
        api.delete(`voyage/deleteDemandeVoyages/${voyage.id}/${userId}`).then(res => {
            if (res === false){
                console.log('an error has occured')
            }
            else{
                window.location.reload(true)
            }
        })
    }

    function ajouterDemande(voyage){
        let item = new FormData()
        item.append('userId', userId)
        item.append('voyageId', voyage.id)

        api.post('voyage/ajouterDemandeVoyages', item).then(() => {
            window.location.reload(true)
        })
    }

    function rejoindreButton(voyage) {
        let button = <button className="button-81" onClick={() => ajouterDemande(voyage)}>Join</button>
        joined.map(v => {
            if (voyage.id === v.voyageId){
                button = <button className="button-81" href='#detailVoyage'>Quitter</button>
            }
        })
        demandes.map(v => {
            if (voyage.id === v.voyageId){
                button =  <button className="button-81" onClick={() => annulerDemande(voyage)}>Cancel Demand</button>
            }
        })
        return button
    }
    return (
        <div>
            <article className="postcard dark blue">
                <a className="postcard__img_link" href="#">
                    <img className="postcard__img" src={`data:image/png;base64, ${voyage.image}`} alt="Image Title"/>
                </a>
                <div className="postcard__text">
                    <h1 className="postcard__title blue"><a href="#">{voyage.destination}</a></h1>
                    <div className="postcard__subtitle small">
                        <time dateTime="2020-05-25 12:00:00">
                            <i className="fas fa-calendar-alt mr-2"></i>{formatDate(voyage.dateStart)}
                        </time>
                    </div>
                    <div className="postcard__bar"></div>
                    <div className="postcard__preview-txt">{voyage.descriptionVoyage}</div>
                    <ul className="postcard__tagbox">
                        <li>
                            {rejoindreButton(voyage)}
                        </li>
                    </ul>
                </div>
            </article>
        </div>
    );
}

export default VoyageUnit;