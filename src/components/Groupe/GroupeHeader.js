import React, {useEffect, useState} from 'react';
import {Button, Container, Nav, Navbar, Dropdown} from "react-bootstrap";
import {useNavigate} from "react-router";
import axios from "axios";
import {useParams} from "react-router";
import logo from "../../Images/Logo.png";
import {Link} from "react-router-dom";
import '../css/Header.css'
const api = axios.create({
    baseURL: `http://localhost:5000/`
})


function GroupeHeader(props) {
    const params = useParams()
    const navigate = useNavigate();
    let [admin, setAdmin] = useState(false)
    const [image, setImage] = useState() ;
    let id = props.id
    let groupeId = params.groupeId

    useEffect(() => {
        if(localStorage.getItem('userInfo'))
            setImage(JSON.parse(localStorage.getItem('userInfo')).image)
    },[])

    function quitterGroupe(){
        let user = JSON.parse(localStorage.getItem('userInfo'))
        api.delete(`groupe/deleteUser/${groupeId}/${user.id}`).then(res => {
            if (res.data === false){
                console.log('error')
            }
            else{
                navigate('/')
            }
        })
    }


    async function checkAdmin (){
        let user = JSON.parse(localStorage.getItem('userInfo'))
        let result = await api.get(`user/isAdmin/${user.id}/${groupeId}`)
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
                                <div className={'myNavbar'}>
                                    <Link className="button-81" to={`/groupe/chat/${groupeId}`}>Chat</Link>
                                    <Link className="button-81" to={`/createPost/${groupeId}`}>Post</Link>
                                    <Link className="button-81" to={`/groupeVoyages/${groupeId}`}>Join Trip</Link>
                                    <Link className="button-81" to={`/groupe/admin/users/${groupeId}`}>Dashboard</Link>
                                    <button className={'button-81'} onClick={logout}>Logout</button>
                                    <Navbar.Brand  href="/"><img src={`data:image/png;base64, ${image}`} alt='' className='navbar-brand rounded-circle'/></Navbar.Brand>
                                </div>
                                :
                                <div className={'myNavbar'}>
                                    <Link className="button-81" to={`/groupe/chat/${groupeId}`}>Chat</Link>
                                    <Link className="button-81" to={`/createPost/${groupeId}`}>Post</Link>
                                    <Link className="button-81" to={`/groupeVoyages/${groupeId}`}>Join Trip</Link>
                                    <button className="button-81" onClick={quitterGroupe}>Quitter groupe</button>
                                    <button className={'button-81'} onClick={logout}>Logout</button>
                                    <Navbar.Brand  href="/"><img src={`data:image/png;base64, ${image}`} alt='' className='navbar-brand rounded-circle'/></Navbar.Brand>
                                </div>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default GroupeHeader;