import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router';
import '../css/SignUp.css'
import axios from 'axios';
import Header from "../User/Header";

const api = axios.create({
    baseURL: `http://localhost:5000/voyage`
})

function CreateTrip() {
    const navigate = useNavigate();
    const [price, setprice] = useState('');
    const [dateStart, setdateStart] = useState('');
    const [dateEnd, setdateEnd] = useState('');
    const [capacite, setcapacite] = useState('');
    const [description, setdescription] = useState('');
   
    

    const AddTrip = async () => {

        let item = { price,dateStart, dateEnd, capacite, description}
        let user = JSON.parse(localStorage.getItem('userInfo'))
        api.post(`/createVoyage/${user.id}`, item).then(res => {
            console.log(res.data)
            if (res.data == null)
                console.log('creation de Voyage impossible')
            else
                navigate('/Home')
        })
    }

    return (
        <div>
           <Header/>
            <div>
                <div className='col-sm-6 offset-sm-3 text-center form-signin'>
                    <h1>CREATE TRIP</h1>
                    <br />
                    <input type='text' value={price} onChange={e => setprice(e.target.value)} placeholder='Price' className='form-control' />
                    <br />
                    <input type='date' value={dateStart} onChange={e => setdateStart(e.target.value)} placeholder='date-Start' className='form-control' />
                    <br />
                    <input type='date' value={dateEnd} onChange={e => setdateEnd(e.target.value)} placeholder='date End' className='form-control' />
                    <br />
                    <input type='text' value={capacite} onChange={e => setcapacite(e.target.value)} placeholder='capacite' className='form-control' />
                    <br />
                    <textarea value={description} onChange={e => setdescription(e.target.value)} placeholder='description' className='form-control' />
                    <br />
                    <button onClick={AddTrip} className='btn btn-primary'>Create</button>
                </div>
            </div>
        </div>
    )
}

export default CreateTrip;