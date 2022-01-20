import React, {useState} from 'react';
import {Button, Container, Nav, Navbar, Dropdown} from "react-bootstrap";
import {useNavigate} from "react-router";
import axios from "axios";
import {useParams} from "react-router";
import logo from "../../Images/Logo.png";
import {Link} from "react-router-dom";
import '../css/Header.css'
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
            <Navbar className={''}>
                <Container  >
                    <Navbar.Brand  href="/"><img src={logo} alt='' className=' navbar-brand'/></Navbar.Brand>
                    <Nav>
                        {
                            admin ?
                                /*
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button"
                                            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                        Dropdown button
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" to="/createGroupe">Create Groupe</a>
                                        <Link className="dropdown-item" to="/listeGroupes">Groupe List</Link>
                                        <Link className="dropdown-item" to={`/createTrip/${groupeId}`}>Create Trip</Link>
                                        <Link className="dropdown-item" to={`/groupeVoyages/${groupeId}`}>Join Trip</Link>
                                        <Link className="dropdown-item" to="#">Delete Trip</Link>
                                        <Link className="dropdown-item" to="#">Delete User</Link>
                                        <Link className="dropdown-item" to={`/createPost/${groupeId}`}>Post</Link>
                                        <Button className="dropdown-item" onClick={logout}>Log out</Button>
                                    </div>
                                </div>*/
                                <>
                                <Dropdown className={"myDropDown"}>
                                    <Dropdown.Toggle variant="light" className="dropdown-basic">
                                        Groups
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Link className="dropdown-item" to="/createGroupe">Create Groupe</Link>
                                        <Link className="dropdown-item" to="/listeGroupes">Groupe List</Link>
                                        <Link className="dropdown-item" to="#">Delete User</Link>
                                        <Button className="dropdown-item" onClick={logout}>Log out</Button>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" className="dropdown-basic">
                                        Trip
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Link className="dropdown-item" to={`/groupeVoyages/${groupeId}`}>Trips</Link>
                                        <Link className="dropdown-item" to={`/createTrip/${groupeId}`}>Create Trip</Link>
                                        <Link className="dropdown-item" to="#">Delete Trip</Link>
                                    </Dropdown.Menu>
                                </Dropdown>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" className="dropdown-basic">
                                            Posts
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Link className="dropdown-item" to={`/createPost/${groupeId}`}>Post</Link>
                                            <Link className="dropdown-item" to={"#"}>Delete Post</Link>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Link className="button-81" to={`/groupe/admin/users/${groupeId}`}>Dashboard</Link>

                                </>
                                :
                                <>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" className="dropdown-basic">
                                            Groups
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Link className="dropdown-item" to="/createGroupe">Create Groupe</Link>
                                            <Link className="dropdown-item" to="/listeGroupes">Groupe List</Link>
                                            <Button className="dropdown-item" onClick={logout}>Log out</Button>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" className="dropdown-basic">
                                            Trip
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Link className="dropdown-item" to={`/groupeVoyages/${groupeId}`}>Trips</Link>
                                            <Link className="dropdown-item" to={`/createTrip/${groupeId}`}>Create Trip</Link>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Link className="button-81" to={`/createPost/${groupeId}`}>Post</Link>

                                </>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default GroupeHeader;