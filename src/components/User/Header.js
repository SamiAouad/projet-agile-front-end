import {Navbar, Container, Nav} from 'react-bootstrap'
import '../css/Header.css';
import {useNavigate} from 'react-router'

function Header() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('userInfo')
        navigate('/')
    }
    return (
        <div>
            
            <Navbar>
                <Container  >
                <Navbar.Brand  href="/"><h1 className=' title text-light'>Viatores</h1></Navbar.Brand>
                <Nav >
                {
                    localStorage.getItem('userInfo') ?
                    <>
                        <Nav.Link  href="/createTrip">Create trip</Nav.Link>
                        <Nav.Link href="#joinTrip">Join Trip</Nav.Link>
                        <Nav.Link href="/createGroupe">Create Group</Nav.Link>
                        <Nav.Link href="/createVoyage">Create Travel</Nav.Link>
                        <Nav.Link href="/listeGroupes">Join Group</Nav.Link>
                        <Nav.Link onClick={logout}>Log out</Nav.Link>
                    </>
                    :
                    <>
                        <Nav.Link  className='text-light' href="/signIn">Sign-in</Nav.Link>
                        <Nav.Link className='text-light' href="/signUp">Sign-up</Nav.Link>
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