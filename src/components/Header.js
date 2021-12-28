import {Navbar, Container, NavDropdown, Nav} from 'react-bootstrap'
import {useNavigate} from 'react-router'

function Header() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('userInfo')
        navigate('/')
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                {
                    localStorage.getItem('userInfo') ?
                    <>
                        <Nav.Link href="#createTrip">Create trip</Nav.Link>
                        <Nav.Link href="#joinTrip">Join Trip</Nav.Link>
                        <Nav.Link href="/createGroupe">Create Group</Nav.Link>
                        <Nav.Link href="#joinGroup">Join Group</Nav.Link>
                        <Nav.Link onClick={logout}>Log out</Nav.Link>
                    </>
                    :
                    <>
                        <Nav.Link href="/signIn">Sign in</Nav.Link>
                        <Nav.Link href="/signUp">Sign up</Nav.Link>
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