import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router";
import Sidebar from "./Sidebar";
import DemandeVoyage from "./DemandeVoyage";
import User from "./User";
import Demande from "./Demande";

const api = axios.create({
    baseURL: `http://localhost:5000/voyage`
})


function AdminDemandeVoyage() {
    const [demandes, setDemandes] = useState()
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const groupeId = params.groupeId
    const userId = JSON.parse(localStorage.getItem('userInfo')).userId

    useEffect(() => {
        api.get(`getDemandes/${params.voyageId}`).then(res => {
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
            <br/> <br/>
            <div className="card col-10 offset-2">
                <h3 className="card-header text-center font-weight-bold text-uppercase py-4">
                    Editable table
                </h3>
                <div className="card-body">
                    <div id="table" className="table-editable">
      <span className="table-add float-right mb-3 mr-2"
      ><a href="#!" className="text-success"
      ><i className="fas fa-plus fa-2x" aria-hidden="true"></i></a
      ></span>
                        <table className="table table-bordered table-responsive-md table-striped text-center">
                            <thead>
                            <tr>
                                <th className="text-center">image</th>
                                <th className="text-center">username</th>
                                <th className="text-center">firstname</th>
                                <th className="text-center">lastname</th>
                                <th className="text-center">refuser</th>
                                <th className="text-center">accepter</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                demandes.map(demande => {
                                    if (demande.id !== userId)
                                        return (
                                            <DemandeVoyage demande={demande}/>
                                        );
                                    return <></>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDemandeVoyage;