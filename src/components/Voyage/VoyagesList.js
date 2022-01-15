import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router";
import {Button, Card, Container} from "react-bootstrap";
import {CheckMember} from "../Groupe/Utilities/GroupeUtilities";

const api = axios.create({
    baseURL: `http://localhost:5000`
})


function VoyagesList(props) {
    const params = useParams();
    let [voyages, setVoyages] = useState([])
    let [joined, setJoined] = useState([])
    let [demandes, setDemandes] = useState([])
    let [loading, setLoading] = useState(true)
    let [refresh, setRefresh] = useState(false)
    let [admin, setAdmin] = useState(false)
    let voyageurs = {}
    let [user, setUser] = useState(0)

    let groupeId = params.groupeId;
    useEffect(async function () {
        let userId = JSON.parse(localStorage.getItem('userInfo')).id
        setUser(userId)
        let groupeId = parseInt(params.groupeId)
        let result = await api.get(`user/isAdmin/${userId}/${groupeId}`)
        setAdmin(result.data)
        let user = JSON.parse(localStorage.getItem('userInfo'))

        let res = await api.get(`voyage/getVoyages/${groupeId}/${userId}`)
        if (res.data === null){
            console.log("an error has occured")
        }
        setVoyages(res.data[0])
        setJoined(res.data[1])
        setDemandes(res.data[2])

    }, [refresh])


    function annulerVoyage(voyage){
        api.delete(`voyage/deleteVoyages/${voyage.id}`).then(() => {
            setRefresh(!refresh)
        })
    }

    function annulerDemande(voyage){
        let userId = JSON.parse(localStorage.getItem('userInfo')).id
        api.delete(`voyage/deleteDemandeVoyages/${voyage.id}/${userId}`).then(() => {
            setRefresh(!refresh)
        })
    }

    function ajouterDemande(voyage){
        let item = new FormData()
        item.append('userId', user)
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
            {
                voyages.map(voyage => {
                    return(<div key={voyage.id}>
                        <Container key={voyage.id}>
                            <div className="row">
                                <div className="col-4">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Voyage entre le {voyage.dateStart} et le {voyage.dateEnd}</Card.Title>
                                            <Card.Text>{voyage.descriptionVoyage}</Card.Text>
                                            {admin ?
                                                <>
                                                    <Button className="btn btn-primary" onClick={() => annulerVoyage(voyage)} >Annuler</Button>
                                                    <Button className="btn btn-primary" href={`detailVoyage/${voyage.id}`} >Detail</Button>
                                                </>
                                                :
                                                <>
                                                </>
                                            }
                                            {rejoindreButton(voyage)}
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </Container>
                    </div>)
                })
            }
        </div>
    );


}

export default VoyagesList;