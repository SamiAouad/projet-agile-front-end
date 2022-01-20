import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router";
import Sidebar from "../Dashboard/Sidebar";
import Trip from "../Dashboard/Trip";

const api = axios.create({
    baseURL: `http://localhost:5000/groupe`
})



function AdminTrip() {
    const [trips, setTrips] = useState([])
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const groupeId = params.groupeId

    useEffect(() => {
        api.get(`getVoyages/${groupeId}`).then(res => {
            if (res === null){
                console.log('an error has occured')
            }
            else{
               setTrips(res.data)
               setLoading(false)
            }
        })
    }, [])

    if (loading){
        return (
            <div>Loading</div>
        );
    }

    if (trips.length <= 0){
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
                trips.map(trip => {
                   return (
                       <div key={trip.id} className={'col-10 offset-2'}>
                           <Trip  trip={trip} groupeId={groupeId}/>
                       </div>
                   );
                })
            }
        </div>
    );
}

export default AdminTrip;