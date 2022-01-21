import React from 'react';
import {formatDate} from "../Voyage/Utilities";
import {Link} from "react-router-dom";
import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:5000/`
})

function Poste({poste, groupeId}) {

    function supprimerPoste(poste){
        api.delete(`/post/deletePost/${poste.id}`).then(res => {
            if (res === false){
                console.log(`trip ${poste.id} was not canceled`)
            }
            else{
                console.log(`trip ${poste.id} was canceled`)
                window.location.reload(true)
            }
        })
    }
    return (
        <div>
            <article className="postcard dark blue">
                <a className="postcard__img_link" href="#">
                    <img className="postcard__img" src={`data:image/png;base64, ${poste.image}`} alt="Image Title"/>
                </a>
                <div className="postcard__text">
                    <h1 className="postcard__title blue"><a href="#">{poste.title}</a></h1>
                    <div className="postcard__bar"></div>
                    <div className="postcard__preview-txt">{poste.content}</div>
                    <ul className="postcard__tagbox">
                        <li>
                            <button className={'button-81'} onClick={() => {supprimerPoste(poste)}}>Delete</button>
                        </li>
                    </ul>
                </div>
            </article>
        </div>
    );
}

export default Poste;