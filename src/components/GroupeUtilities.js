import axios from "axios"

const api = axios.create({
    baseURL: `http://localhost:5000/`
})

export let checkMember = (groupe, listes) => {
    let test = false
    listes.map(element => {
        if(element.groupeId === groupe.id)
            test = true
        console.log(element.groupeId, groupe.id, element.groupeId === groupe.id)
    })
    if (test) return true;
    else return false
}

export let cancelDemande = () => {
    api.post('/')
}

export let joinGroupe = () => {
    console.log('join groupe')
}