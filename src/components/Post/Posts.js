import Post from "./Post";
import "../css/post.css";
import pic from '../css/src/Background1.jpg'
import {Navbar, Container, Nav} from 'react-bootstrap'
import img1 from "../../Images/Image2.jpg"
import img2 from "../../Images/Image3.jpg"
import img3 from "../../Images/Image11.jpg"
  function Posts() {
  return (
    <div className="posts">
      <Post img={img1}  />
      <Post  img={img2}/>
      <Post  img={img3}/>
      <Post  img={img3}/>
      <Post  img={img3}/>
      
     
    </div>
  );
}

export default Posts;