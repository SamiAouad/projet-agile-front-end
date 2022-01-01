import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { lazy } from "react";
import { Card } from "react-bootstrap";
import image1 from "../Images/Image1.png"

const api = axios.create({
    baseURL: `http://localhost:5000/groupe`
})

function GroupeList(){
    let [groupes, setGroupes] = useState([])

    useEffect(() => {
        api.get('/getGroupes').then((fetchedData) => {
            setGroupes(fetchedData.data)
        })
    }, [])

    return(
        <div>
            {groupes.map(groupe => 
            {
                console.log(groupe.title);
                return(
                    <Container>
                        <div className="row">
                            <div className="col-4">
                            <Card>
                                <Card.Img variant="top" src="../Images/Image1.png" />
                                <Card.Body>
                                    <Card.Title>{groupe.title}</Card.Title>
                                    <Card.Text>{groupe.groupeDescription}</Card.Text>
                                    <Button variant="primary" value={groupe.id}>Join</Button>
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