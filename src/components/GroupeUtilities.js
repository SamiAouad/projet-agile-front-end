import axios from "axios"
import { Navigate, useNavigate } from "react-router"

const api = axios.create({
    baseURL: `http://localhost:5000/groupe`
})




export  function CheckMember(groupe, listes) {
    let test = false
    listes.map(element => {
        if(element.groupeId === groupe.id)
            test = true
    })
   
    return test
}

export function CancelDemande(userId, groupeId) {
    api.delete(`/refuse/${userId}/${groupeId}`).then(res => {
        if (res.data === true){
            return true
        }else{
            return false
        }
    })
}

