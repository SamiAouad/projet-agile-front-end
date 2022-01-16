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
            
            <Navbar className={"fixed-top"}>
                <Container  >
                    {
                        localStorage.getItem('userInfo')?
                            <>
                                <Navbar.Brand  href="/Home"><img src={logo} alt='' className=' navbar-brand'/></Navbar.Brand>
                            </>
                            :
                            <>
                                <Navbar.Brand  href="/"><img src={logo} alt='' className=' navbar-brand'/></Navbar.Brand>
                            </>
                    }
                <Nav>
                {
                    localStorage.getItem('userInfo') ?
                    <>
                        <Link className="button-81" to="/createGroupe">Create Groupe</Link>
                        <Link className="button-81" to="/listeGroupes">Groupe List</Link>
                        <button className="button-81" onClick={logout}>Log out</button>
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
            <br />
         
            
          
        </div>
    )
}

export default Header;