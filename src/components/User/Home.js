import React, {useEffect} from "react";
import Header from './Header'
import Body from './Body'
import HomeAfterSignIn from "./HomeAfterSignIn";
import HomeBeforeSignIn from "./HomeBeforeSignIn";


function Home() {

    return (
        <div className='design'>

            {
                localStorage.getItem('userInfo')?
                    <>
                        <HomeAfterSignIn/>
                    </>
                    :
                    <>
                        <HomeBeforeSignIn/>
                    </>
            }

           
        </div>
    )
}

export default Home;