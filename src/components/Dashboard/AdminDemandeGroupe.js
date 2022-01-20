import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router";
import Demande from "./Demande";
import Sidebar from "./Sidebar";

const api = axios.create({
    baseURL: `http://localhost:5000/groupe`
})


function AdminDemandeGroupe() {
    const [demandes, setDemandes] = useState()
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const groupeId = params.groupeId
    useEffect(() => {
        api.get(`getDemandes/${params.groupeId}`).then(res => {
            if (res === null){
                console.log("une erreur s'est produite")
            }else{
                setDemandes(res.data)
                setLoading(false)
            }
        })
    }, [])

    if(loading){
        return(<div>Loading</div>)
    }
    return (
       <div>
           <Sidebar groupeId={groupeId}/>
           <div className={'col-10 offset-2'}>
               {
                   demandes.map(demande => {
                       return(
                           <Demande key={demande.id} demande={demande}/>
                       );
                   })
               }
           </div>
       </div>
    );
}

export default AdminDemandeGroupe;