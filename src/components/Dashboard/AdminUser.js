import React, {useEffect} from 'react';
import {useState} from "react";
import axios from "axios";
import {useParams} from "react-router";
import User from "./User";
import Sidebar from "./Sidebar";
import "../css/table.css"

const api = axios.create({
    baseURL: `http://localhost:5000/groupe`
})


function AdminUser() {
    const userId = JSON.parse(localStorage.getItem('userInfo')).id
    const [users, setUsers] = useState();
    const params = useParams();
    const [loading, setLoading] = useState(true)
    const groupeId = params.groupeId;
    useEffect(() =>{
        api.get(`/getUsers/${groupeId}`).then(res => {
            if (res === null){
                console.log('no users for the group')
            }
            else
            {
                setUsers(res.data)
            }
            setLoading(false)
        })
    }, [groupeId])

    if (loading){
        return (
            <div>Loading</div>
        )
    }
    return (
        /*
        <div>
            <Sidebar groupeId={groupeId}/>
            {
                users.map(user => {
                    return (
                        <div>
                            <div className={'col-10 offset-2'} key={user.id}>
                                {
                                    userId !== user.id?
                                        <>
                                            <User user={user} groupeId={groupeId}/>
                                        </>
                                        :
                                        <></>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>*/
        <div>
            <Sidebar groupeId={groupeId}/>
            <br/> <br/>
            <div className="card col-10 offset-2">
            <h3 className="card-header text-center font-weight-bold text-uppercase py-4">
                Group Users
            </h3>
            <div className="card-body">
                <div id="table" className="table-editable">
      <span className="table-add float-right mb-3 mr-2"
      ><a href="#!" className="text-success"
      ><i className="fas fa-plus fa-2x" aria-hidden="true"></i></a
      ></span>
                    <table className="table table-bordered table-responsive-md table-striped text-center">
                        <thead>
                        <tr>
                            <th className="text-center">image</th>
                            <th className="text-center">username</th>
                            <th className="text-center">firstname</th>
                            <th className="text-center">lastname</th>
                            <th className="text-center">role</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                                users.map(user => {
                                    if (user.id !== userId)
                                        return (
                                            <User user={user} groupeId={groupeId}/>
                                        );
                                    return <></>
                                })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>

    );
}

export default AdminUser;