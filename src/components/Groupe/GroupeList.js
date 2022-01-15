import React from "react";
import axios from "axios";
import img from "../../Images/Image2.jpg";
import { useState, useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { CancelDemande, CheckMember } from "./Utilities/GroupeUtilities.js";

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
    let [refresh, setRefresh] = useState(false)
    
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
        }, [refresh])
    

    if (loadingDemandes || loadingGroupes || loadingMemberships){
        return <div>Loading</div>
    }

    let handleCancel = (userId, groupeId) => {
        CancelDemande(userId, groupeId).then(() => {
            setRefresh(!refresh)
    })
    }


    function groupeButton(groupe){
        let user = JSON.parse(localStorage.getItem('userInfo'))
        if (memberships && CheckMember(groupe, memberships)){
            return <Button className="btn btn-primary" href={`/groupe/home/${groupe.id}`} >Acceder</Button>
        }
        if (demandes && CheckMember(groupe, demandes))
            return <Button value={groupe.id} className="btn btn-primary" onClick={() => {handleCancel(user.id, groupe.id)}}>Annuler</Button>

        return <Button value={groupe.id} className="btn btn-primary" href={`/joinGroupe/${groupe.id}`}>Rejoindre</Button>
    }


    return(
        
        <div>
            {groupes.map(groupe => 
            {
                {console.log(refresh)}
                return(
                    <Container key={groupe.id}>
                        <div className="row">
                            <div className="col-4">
                            <Card>
                            <img src={img} class="card-img-top" alt=""/>
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