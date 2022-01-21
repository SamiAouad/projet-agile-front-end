import React, {useEffect, useState} from 'react';
import Sidebar from "./Sidebar";
import axios from "axios";
import {useParams} from "react-router";
import Poste from "./Poste";

const api = axios.create({
    baseURL: `http://localhost:5000/post`
})

function AdminPost(props) {
    const [postes, setPostes] = useState();
    const  [loading, setLoading] = useState(true);
    const params = useParams();
    const groupeId = params.groupeId;

    useEffect(() => {
        api.get(`getPostes/${groupeId}`).then(res => {
            if (res === null){
                console.log('an error has occured')
            }
            else{
                setPostes(res.data)
                setLoading(false)
            }
        })
    }, [])

    if (loading){
        return (
            <div>Loading</div>
        );
    }

    if (postes.length <= 0){
        return (
            <div>
                <Sidebar groupeId={groupeId}/>
                <div>No trips Available</div>
            </div>
        );
    }
    return (
        <div>
            <Sidebar groupeId={groupeId}/>
            {
                postes.map(poste => {
                    return (
                        <div key={poste.id} className={'col-10 offset-2'}>
                            <Poste  poste={poste} groupeId={groupeId}/>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default AdminPost;