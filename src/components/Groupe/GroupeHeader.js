import React, {useState} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router";
import axios from "axios";
import {useParams} from "react-router";
import {UserUtilities} from "../User/Utilities/UserUtilities";
import logo from "../../Images/Logo.png";
import {Link} from "react-router-dom";
const api = axios.create({
    baseURL: `http://localhost:5000/user`
})


function GroupeHeader(props) {
    const params = useParams()
    const navigate = useNavigate();
    let [admin, setAdmin] = useState(false)
    let id = props.id
    let groupeId = params.groupeId


    async function checkAdmin (){
        let user = JSON.parse(localStorage.getItem('userInfo'))
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
                    <Navbar.Brand  href="/"><img src={logo} alt='' className=' navbar-brand'/></Navbar.Brand>
                    <Nav>
                        {
                            localStorage.getItem('userInfo') ?
                                <>
                                    <Link className="button-81" to="/createGroupe">Create Groupe</Link>
                                    <Link className="button-81" to="/listeGroupes">Groupe List</Link>
                                    <Link className="button-81" to={`/createTrip/${groupeId}`}>Create Trip</Link>
                                    <Link className="button-81" to={`/groupeVoyages/${groupeId}`}>Join Trip</Link>
                                    <Link className="button-81" to="#">Delete Trip</Link>
                                    <Link className="button-81" to="#">Delete User</Link>
                                    <Link className="button-81" to={`/createPost/${groupeId}`}>Post</Link>
                                    <Button className="button-81" onClick={logout}>Log out</Button>
                                </>
                                :
                                <>
                                    <Link className="button-81" to="/signIn">Sign In</Link>
                                    <Link className="button-81" to="/signUp">Sign Up</Link>
                                </>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default GroupeHeader;