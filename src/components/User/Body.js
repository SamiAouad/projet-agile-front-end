import {Navbar, Container, NavDropdown, Nav} from 'react-bootstrap'
import '../css/Body.css';
import logo from '../../Images/Logo.png'
import '../css/Home.css'



import {useNavigate} from 'react-router'

function Body() {
  
    return (
        <div >
      <section >
         
          <div className='container '> 
          
                    {/* <div class="home__data">
                    <img src={logo} alt='' className=' logo float-right img-thumbnail'/>
                        <h1 class=" display-1 text-dark">Explore The Best <b>Beautiful <br/> Continents</b></h1>
                        <h3>There are plenty of practical reasons <br/>why it’s helpful to have someone you know by your side whilst  <br/>you’re exploring the world, <br/>but there are also lots of ways that traveling together <br/> can build your friendship and make your bond even stronger.</h3>
                    </div> */}
                    <div className="row">
                        <div className='col-sm-2'/>
                        <div className='col-sm-8'>
                            <div>
                            <img src={logo} alt='' className=' logo float-right img-thumbnail'/>
                            </div> 
                            </div>
                        <div className='col-sm-2'/>
                    </div>
                    <div className="row">
                        <div className='col-sm-8 align-self-start'>
                            <h1 class=" display-1 text-light text">Explore The Best <b>Beautiful <br/> Continents</b></h1>
                            <h3 className='text text-light'>There are plenty of practical reasons <br/>why it’s helpful to have someone you know by your side whilst  <br/>you’re exploring the world, <br/>but there are also lots of ways that traveling together <br/> can build your friendship and make your bond even stronger.</h3>
                        </div>
                        <div className='col-sm-4'/>
                    </div>
                </div>
     
      </section>
            </div>
    )
}

export default Body;