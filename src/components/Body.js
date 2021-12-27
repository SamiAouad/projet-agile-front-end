import {Navbar, Container, NavDropdown, Nav} from 'react-bootstrap'
import './css/Body.css';
import image1 from '../Images/Image3.jpg'
import image2 from '../Images/Image6.jpg'

import {useNavigate} from 'react-router'

function Body() {
  
    return (
        <div >
            <div ><img src={image1} className='Pict1'></img></div>
            <div ><img src={image2} className='Pict2'></img></div>
            <h1 className='Titre'>Viatores</h1>
            <h2 >It's a Big World Out There,Go Explore </h2>
            <h3>We always make our customers happy by providing many choices.</h3>
            
            
        </div>
    )
}

export default Body;