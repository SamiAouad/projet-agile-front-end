import {Navbar, Container, NavDropdown, Nav} from 'react-bootstrap'
import './css/Body.css';
import logo from '../Images/Logo.png'


import {useNavigate} from 'react-router'

function Body() {
  
    return (
        <div >
      <section>
         
          <div className='home__container'> 
          
                    <div class="home__data">
                    <img src={logo} alt='' className=' logo float-right img-thumbnail'/>
                        <h1 class="home__data-title ">Explore The <br/> Best <b>Beautiful <br/> Continents</b></h1>
                    </div>
        </div>
     
      </section>
            </div>
    )
}

export default Body;