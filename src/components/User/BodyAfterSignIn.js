import Posts from "../Post/Posts";
import Sidebar from "./Sidebar";
import {Navbar, Container, Nav} from 'react-bootstrap'

function BodyAfterSignIn() {
  
    return (
 
    <div>
  <div className="home">
        <Posts />
        <Sidebar />
      </div>
    </div>

    )
}

export default BodyAfterSignIn;