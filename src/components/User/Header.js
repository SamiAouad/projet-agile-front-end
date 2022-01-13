import {Navbar, Container, Nav} from 'react-bootstrap'
import logo from '../../Images/Logo.png'
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
                <Navbar.Brand  href="/"><img src={logo} alt='' className=' navbar-brand'/></Navbar.Brand>
                <Nav >
                {
                    localStorage.getItem('userInfo') ?
                    <>
                        <Nav.Link href="/createGroupe">Create Group</Nav.Link>
                        <Nav.Link href="/listeGroupes">Join Group</Nav.Link>
                        <Nav.Link onClick={logout}>Log out</Nav.Link>
                    </>
                    :
                    <>
                        <Nav.Link  className='button-40' href="/signIn">Sign-in</Nav.Link>
                        <Nav.Link className='button-40' href="/signUp">Sign-up</Nav.Link>
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