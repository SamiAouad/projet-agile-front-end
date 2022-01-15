import {Navbar, Container, NavDropdown, Nav , Carousel} from 'react-bootstrap'

import img1 from '../../Images/Image1.jpg'
import img2 from '../../Images/Image2.jpg'
import img3 from '../../Images/Image3.jpg'



import {useNavigate} from 'react-router'

function Body() {
  
    return (
 <div className='mt-0'>
  <Carousel className='mt-0 '>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={img1}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>We’ve got it all for you.</h3>
      <p>Escape life for a little while,<br/>
         Adventure awaits, go find it.
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item >
  <img
      className="d-block w-100 "
      src={img2}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>We have been … where you want to travel.</h3>
      <p>Take a journey into yourself.<br/>
         Too much fun for just one trip.
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item >
    <img
      className="d-block w-100"
      src={img3}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>The journey is Your home</h3>
      <p>Man cannot discover new oceans <br/> unless he has the courage to lose sight of the shore</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    </div>

    )
}

export default Body;