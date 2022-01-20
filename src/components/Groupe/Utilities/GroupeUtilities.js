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

export async function CancelDemande(userId, groupeId) {
    let res = await api.delete(`/refuse/${userId}/${groupeId}`)
        return res.data === true;
}

