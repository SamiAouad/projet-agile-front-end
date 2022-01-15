import React from "react";

import Posts from "../Post/Posts";
import Sidebar from "./Sidebar";
import Header from "./Header"
import {Navbar, Container, Nav} from 'react-bootstrap'


function HomeAfterSignIn() {
    return (
        <div> 
            <Header />
            <Posts />
          
       
        </div>
        
        )
}

export default HomeAfterSignIn;