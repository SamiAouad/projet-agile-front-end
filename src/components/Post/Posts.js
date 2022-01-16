import Post from "./Post";
import "../css/post.css";
import pic from '../css/src/Background1.jpg'
import {Navbar, Container, Nav} from 'react-bootstrap'
import img1 from "../../Images/Image2.jpg"
import img2 from "../../Images/Image3.jpg"
import img3 from "../../Images/Image11.jpg"
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import axios from "axios";
import '../css/Card.scss'

const api = axios.create({
    baseURL: `http://localhost:5000/post`
})

  function Posts() {
      let [postes, setPostes] = useState([])
      const params = useParams();
      let groupeId = params.groupeId;
      let userId = JSON.parse(localStorage.getItem('userInfo')).id


      async function getPostes(){
          const res = await api.get(`/getPostes/1`)
          console.log(res.data)
          setPostes(res.data)
      }

      useEffect(function (){
          getPostes()
      }, [])

      return (
    <div className="posts row">
        {postes.map(poste => {
            return (
                <section key={poste.id} className="dark col-12">
                    <div className="container-fluid py-4">
                        <Post poste={poste}/>
                    </div>
                </section>
            )
        })}
    </div>
  );
}

export default Posts;