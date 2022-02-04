import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router";
import '../css/SignUp.css'
const api = axios.create({
    baseURL: `http://localhost:5000/groupe`
})


function Demande({demande}) {
    const navigate = useNavigate()

    function accepterDemande(demande){
        let item = new FormData();
        item.append('id', demande.id)
        item.append('userId', demande.userId)
        item.append('groupeId', demande.groupeId)
        api.post('/accept', item).then(res => {
            if (res === false){
                console.log('an error has occured')
            }else{
                console.log('user Admitted to groupe')
                window.location.reload(true)
                //navigate(`/groupe/admin/demandes/${demande.groupeId}`)
            }
        })
    }

    function refuserDemande(demande){
        api.delete(`/refuse/${demande.id}`).then(res => {
            if (res === false){
                console.log('an error has occured')
            }else{
                console.log('user denied from groupe')
                window.location.reload(true)
                //navigate(`/groupe/admin/demandes/${demande.groupeId}`)
            }
        })
    }
    return (
        <div>
            <article className="postcard dark blue demande-groupe">
                <a className="postcard__img_link" href="#">
                    <img className="postcard__img" src={`data:image/png;base64, ${demande.image}`} alt="Image Title"/>
                </a>
                <div className="postcard__text">
                    <h1 className="postcard__title blue"><a href="#">{demande.username}</a></h1>
                    <div className="postcard__subtitle small">
                        <time dateTime="2020-05-25 12:00:00">
                            <i className="fas fa-calendar-alt mr-2"></i>{demande.firstname} {demande.lastname}
                        </time>
                    </div>
                    <div className="postcard__bar"></div>
                    <div className="postcard__preview-txt">{demande.motivation}</div>
                    <ul className="postcard__tagbox">
                        <li >
                            <button className={'button-81'} onClick={() => {accepterDemande(demande)}}><i className="fas fa-play mr-2"></i>Accept</button>
                        </li>

                        <li>
                            <button className={'button-81'} onClick={() => refuserDemande(demande)}><i className="fas fa-play mr-2"></i>Refuse</button>
                        </li>

                    </ul>
                </div>
            </article>
        </div>
    );
}

export default Demande;
