import React, {useEffect, useState} from "react";

import Posts from "../Post/Posts";

import Header from "./Header"
import Body from "./Body";
import {useParams} from "react-router";
import axios from "axios";
import BodyAfterSignIn from "./BodyAfterSignIn";

const api = axios.create({
    baseURL: `http://localhost:5000/post`
})


function HomeAfterSignIn() {


    return (
        <div>
            <Header/>
            <BodyAfterSignIn/>
            <Posts/>
        </div>
        )
}

export default HomeAfterSignIn;