import {Navbar, Container, Nav} from 'react-bootstrap'
import logo from '../../Images/Logo.png'
import '../css/Header.css';
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router'
import {useEffect, useState} from "react";

function Header() {
    const navigate = useNavigate();
    const [image, setImage] = useState() ;

    useEffect(() => {
        if(localStorage.getItem('userInfo'))
            setImage(JSON.parse(localStorage.getItem('userInfo')).image)
    },[])

    const logout = () => {
        localStorage.clear()
        navigate('/HomeBeforeSignIn')
    }

    return (
        <div>
            
            <Navbar className={""}>
                <Container  >
                    <Navbar.Brand  href="/"><img src={logo} alt='' className=' navbar-brand'/></Navbar.Brand>
                    <Nav>
                {
                    localStorage.getItem('userInfo') ?
                    <>
                        <Link className="button-81" to="/createGroupe">Create Groupe</Link>
                        <Link className="button-81" to="/listeGroupes">Groupe List</Link>
                        <button className="button-81" onClick={logout}>Log out</button>
                        <Navbar.Brand  href="/"><img src={`data:image/png;base64, ${image}`} alt='' className='navbar-brand rounded-circle'/></Navbar.Brand>
                    </>
                    :
                    <>
                        <Link className="button-81 margin-left" to="/signIn">Sign In</Link>
                        <Link className="button-81 margin-left" to="/signUp">Sign Up</Link>
                    </>
                }
                </Nav>
                </Container>
            </Navbar>
            <br />
         
            
          
        </div>
    )
}

export default Header;