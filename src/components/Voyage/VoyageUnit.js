import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {useParams} from "react-router";
import axios from "axios";

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
            setRefresh(!refresh)
        })
    }

    function annulerDemande(voyage){
        api.delete(`voyage/deleteDemandeVoyages/${voyage.id}/${userId}`).then(() => {
            setRefresh(!refresh)
        })
    }

    function ajouterDemande(voyage){
        let item = new FormData()
        item.append('userId', userId)
        item.append('voyageId', voyage.id)

        api.post('voyage/ajouterDemandeVoyages', item).then(() => {
            setRefresh(!refresh)
        })
    }

    function rejoindreButton(voyage) {
        let button = <Button className="btn btn-primary" onClick={() => ajouterDemande(voyage)}>Rejoindre</Button>
        joined.map(v => {
            if (voyage.id === v.voyageId){
                button = <Button className="btn btn-primary" href='#detailVoyage'>Quitter</Button>
            }
        })
        demandes.map(v => {
            if (voyage.id === v.voyageId){
                button =  <Button className="btn btn-primary" onClick={() => annulerDemande(voyage)}>Annuler Demande</Button>
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
                    <h1 className="postcard__title blue"><a href="#">{voyage.title}</a></h1>
                    <div className="postcard__subtitle small">
                        <time dateTime="2020-05-25 12:00:00">
                            <i className="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                        </time>
                    </div>
                    <div className="postcard__bar"></div>
                    <div className="postcard__preview-txt">{voyage.descriptionVoyage}</div>
                    <ul className="postcard__tagbox">
                        <li className="tag__item play blue">
                            {rejoindreButton(voyage)}
                        </li>
                    </ul>
                </div>
            </article>
        </div>
    );
}

export default VoyageUnit;