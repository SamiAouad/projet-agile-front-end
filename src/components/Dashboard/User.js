import React, {useState} from 'react';
import axios from "axios";
import groupe from "../Groupe/Groupe";

const api = axios.create({
    baseURL: `http://localhost:5000/groupe`
})

function User({user, groupeId}) {

    const deleteUser = (userId) => {
        api.delete(`/deleteUser/${groupeId}/${user.id}`).then(res => {
            if (res === false){
                console.log('an error has occured')
            }
            else{
                console.log('delete successful')
                window.location.reload(true)
            }
        })
    }

    const promoteAdmin = (userId) => {
        let item = new FormData();
        item.append('groupeId', groupeId)
        item.append('userId', userId)
        api.post('/promoteAdmin', item).then(res => {
            if (res === false){
                console.log('an error has occured')
            }
            else{
                console.log('promotion successful')
                window.location.reload(true)
            }
        })
    }
    /*return (
        <div>
            <article className="postcard dark blue">
                <a className="postcard__img_link" href="#">
                    <img className="postcard__img" src={`data:image/png;base64, ${user.image}`} alt="Image Title"/>
                </a>
                <div className="postcard__text">
                    <h1 className="postcard__title blue"><a href="#">{user.username}</a></h1>
                    <div className="postcard__subtitle small">
                        <time dateTime="2020-05-25 12:00:00">
                            <i className="fas fa-calendar-alt mr-2"></i>{user.firstname} {user.lastname}
                        </time>
                    </div>
                    <div className="postcard__bar"></div>
                    <ul className="postcard__tagbox">
                        <li className="tag__item play blue">
                            <button onClick={() => {deleteUser(user.id)}}><i className="fas fa-play mr-2"></i>Delete</button>
                        </li>

                        <li className="tag__item play blue">
                            <button onClick={() => promoteAdmin(user.id)}><i className="fas fa-play mr-2"></i>Promote to admin</button>
                        </li>

                    </ul>
                </div>
            </article>
        </div>
    );*/
    return (
        <tr>
            <td className="pt-3-half" >
                <img className="rounded-circle" width={'50px'} height={"50px"} src={`data:image/png;base64, ${user.image}`} alt="Image Title"/>
            </td>
            <td className="pt-3-half">{user.username}</td>
            <td className="pt-3-half" >{user.firstname}</td>
            <td className="pt-3-half" >{user.lastname}</td>
            <td className="pt-3-half">
                <button onClick={() => {deleteUser(user.id)}}>Delete</button>
            </td>
        </tr>
    )
}

export default User;