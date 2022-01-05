import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useState } from "react";
import GroupeHeader from "./GroupeHeader";

const api = axios.create({
    baseURL: `http://localhost:5000/groupe`
})

function GroupeHome(){
    let [posts, setPosts] = useState([])

    return(
    <div>
        <GroupeHeader />
    </div>)
}

export default GroupeHome;