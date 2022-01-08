import React, {useEffect} from "react";
import Header from './Header'
import Body from './Body'
import '../css/Header.css';
import HomeAfterSignIn from "./HomeAfterSignIn";

function Home() {

    return (
        <div className='design'>
            
            <Header/>
            <Body/>

           
        </div>
    )
}

export default Home;