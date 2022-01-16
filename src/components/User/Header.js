import {Navbar, Container, Nav} from 'react-bootstrap'
import logo from '../../Images/Logo.png'
import '../css/Header.css';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useNavigate} from 'react-router'

function Header() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('userInfo')
        navigate('/')
    }
    return (
        <div>
            
            <Navbar className='fixed-top'>
                <Container  >
                <Navbar.Brand  href="/"><img src={logo} alt='' className=' navbar-brand '/></Navbar.Brand>
                <Nav>
                {
                    localStorage.getItem('userInfo') ?
                    <>
                        <Link className="button-81 margin-left" to="/createGroupe">Create Groupe</Link>
                        <Link className="button-81 margin-left" to="/listeGroupes">Groupe List</Link>
                        <Button className="button-81 margin-left" onClick={logout}>Log out</Button>
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