import React from "react";

import Posts from "../Post/Posts";

import Header from "./Header"
import Body from "./Body";


function HomeAfterSignIn() {
    return (
            <div> 
                <Header/>
                <Body/>
                <Posts/>
                </div>
                
           
        )
}

export default HomeAfterSignIn;