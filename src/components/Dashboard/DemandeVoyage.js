import React from 'react';
import axios from "axios";
import '../css/SignUp.css'

const api = axios.create({
    baseURL: `http://localhost:5000/voyage`
})

function DemandeVoyage({demande}) {
    function accepterDemande(demande){
        let item = new FormData();
        item.append('id', demande.id)
        item.append('userId', demande.userId)
        item.append('voyageId', demande.voyageId)
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
        api.delete(`/deleteDemandeVoyages/${demande.voyageId}/${demande.userId}`).then(res => {
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
        <tr>
            <td className="pt-3-half" >
                <img className="rounded-circle" width={'50px'} height={"50px"} src={`data:image/png;base64, ${demande.image}`} alt="Image Title"/>
            </td>
            <td className="pt-3-half">{demande.username}</td>
            <td className="pt-3-half" >{demande.firstname}</td>
            <td className="pt-3-half" >{demande.lastname}</td>
            <td className="pt-3-half">
                <button onClick={() => {refuserDemande(demande)}}>Refuser</button>
            </td>
            <td className="pt-3-half">
                <button onClick={() => {accepterDemande(demande)}}>Accepter</button>
            </td>
        </tr>
    );
}

export default DemandeVoyage;