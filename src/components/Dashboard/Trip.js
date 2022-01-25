import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {formatDate} from "../Voyage/Utilities";

const api = axios.create({
    baseURL: `http://localhost:5000/`
})
function Trip({trip, groupeId}) {

    function annulerTrip(trip){
        api.delete(`/voyage/deleteVoyage/${trip.id}`).then(res => {
            if (res === false){
                console.log(`trip ${trip.id} was not canceled`)
            }
            else{
                console.log(`trip ${trip.id} was canceled`)
                window.location.reload(true)
            }
        })
    }

    return (
        <div>
            <article className="postcard dark blue">
                <a className="postcard__img_link" href="#">
                    <img className="postcard__img" src={`data:image/png;base64, ${trip.image}`} alt="Image Title"/>
                </a>
                <div className="postcard__text">
                    <h1 className="postcard__title blue"><a href="#">{trip.destination}</a></h1>
                    <div className="postcard__subtitle small">
                        <time dateTime="2020-05-25 12:00:00">
                            <i className="fas fa-calendar-alt mr-2"></i>{formatDate(trip.dateStart)}
                        </time>
                    </div>
                    <div className="postcard__bar"></div>
                    <div className="postcard__preview-txt">{trip.descriptionVoyage}</div>
                    <ul className="postcard__tagbox">
                        <li>
                            <button className={'button-81'} onClick={() => {annulerTrip(trip)}}>Annuler</button>
                        </li>

                        <li>
                            <Link to={`/groupe/admin/voyage/details/${trip.id}`}><button className={'button-81'}>Detail</button></Link>
                        </li>
                        <li>
                            <Link to={`/voyage/demande/${groupeId}/${trip.id}`} ><button className={'button-81'}>Demandes</button></Link>
                        </li>

                    </ul>
                </div>
            </article>
        </div>
    );
}

export default Trip;