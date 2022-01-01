import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { cancelDemande, checkMember, joinGroupe } from "./GroupeUtilities.js";

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
        }, [])

    

    if (loadingDemandes || loadingGroupes || loadingMemberships){
        return <div>Loading</div>
    }


    function groupeButton(groupe){
        let user = JSON.parse(localStorage.getItem('userInfo'))
        if (checkMember(groupe, memberships)){
            return <Button className="btn btn-primary" href={`/groupe/home/${groupe.id}`} >Acceder</Button>
        }
        if (checkMember(groupe, demandes))
            return <Button value={groupe.id} className="btn btn-primary" onClick={() => cancelDemande(user.id, groupe.id)}>Annuler</Button>

        return <Button value={groupe.id} className="btn btn-primary" onClick={() => joinGroupe(user.id, groupe.id)}>Rejoindre</Button>
    }


    return(
        
        <div>
            {groupes.map(groupe => 
            {
                return(
                    <Container key={groupe.id}>
                        <div className="row">
                            <div className="col-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{groupe.title}</Card.Title>
                                    <Card.Text>{groupe.groupeDescription}</Card.Text>
                                    {groupeButton(groupe)}
                                </Card.Body>
                            </Card>
                            </div>
                        </div>
                    </Container>
                )
            })}
        </div>
    )
}

export default GroupeList;