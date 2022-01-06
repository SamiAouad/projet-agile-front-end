import React, {useState} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router";
import '../css/Header.css';
import axios from "axios";
import {useParams} from "react-router";
import {UserUtilities} from "../User/Utilities/UserUtilities";
const api = axios.create({
    baseURL: `http://localhost:5000/user`
})


function GroupeHeader(props) {
    const params = useParams()
    const navigate = useNavigate();
    let [admin, setAdmin] = useState(false)
    let id = props.id

    async function checkAdmin (){
        let user = JSON.parse(localStorage.getItem('userInfo'))
        let groupeId = params.groupeId
        let result = await api.get(`/isAdmin/${user.id}/${groupeId}`)
        setAdmin(result.data)
    }
    checkAdmin()

    const logout = () => {
        localStorage.removeItem('userInfo')
        console.log(localStorage.getItem('userInfo'))
        navigate('/')
    }

    return (

        <div>
            <Navbar>
                <Container  >
                    <Navbar.Brand  href="/"><h1 className=' title text-light'>Viatores</h1></Navbar.Brand>
                    <Nav >{
                            admin ?
                            <>
                                <Nav.Link  href="/createTrip">Create trisp</Nav.Link>
                                <Nav.Link href="#joinTrip">Group Trips</Nav.Link>
                                <Nav.Link href="/createVoyage">Create Travel</Nav.Link>
                                <Nav.Link href={`/createPost/${id}`}>Post</Nav.Link>
                                <Nav.Link onClick={logout}>Log out</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link href="#joinTrip">Group Trips</Nav.Link>
                                <Nav.Link onClick={logout}>Log out</Nav.Link>
                            </>
                    }

                    </Nav>
                </Container>
            </Navbar>
            <br />
        </div>
    );
}

export default GroupeHeader;