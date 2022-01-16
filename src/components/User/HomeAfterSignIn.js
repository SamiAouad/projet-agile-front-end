import React from "react";

import Posts from "../Post/Posts";
import Header from "./Header"
import Body from "./Body";


function HomeAfterSignIn() {
    return (
            <>
                <Header/>
                <Body/>
                <Posts/>
            </>
        )
}

export default HomeAfterSignIn;