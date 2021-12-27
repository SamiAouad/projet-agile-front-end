import {Navbar, Container, NavDropdown, Nav} from 'react-bootstrap'
import './css/Header.css';
import logo from '../Images/Logo.png'
import {useNavigate} from 'react-router'

function Header() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('userInfo')
        navigate('/')
    }
    return (
        <div>
            <body>
            <Navbar className='navbar' >
                <Container >
                <Navbar.Brand className='navbar' href="/"><img src= {logo} className='logo'></img></Navbar.Brand>
                <Nav className="me-auto">
                {
                    localStorage.getItem('userInfo') ?
                    <>
                        <Nav.Link href="#createTrip">Create trip</Nav.Link>
                        <Nav.Link href="#joinTrip">Join Trip</Nav.Link>
                        <Nav.Link onClick={logout}>Log out</Nav.Link>
                    </>
                    :
                    <>
                        <Nav.Link className='SignIn' href="/signIn">Sign in</Nav.Link>
                        <Nav.Link className='SignUp' href="/signUp">Sign up</Nav.Link>
                    </>
                }
                
                </Nav>
                </Container>
            </Navbar>
            <br />
            </body>
            
        </div>
    )
}

export default Header;