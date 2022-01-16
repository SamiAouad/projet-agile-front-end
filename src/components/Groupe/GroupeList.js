import React from "react";
import axios from "axios";
import img from "../../Images/Image2.jpg";
import { useState, useEffect } from "react";
import "../css/Card.scss"
import { Button, Container, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { CancelDemande, CheckMember } from "./Utilities/GroupeUtilities.js";

const api = axios.create({
    baseURL: `http://localhost:5000/`
})

function GroupeList(){
    let [groupes, setGroupes] = useState([])
    let [memberships, setMemberships] = useState([])
    let [demandes, setDemandes] = useState([])
    let [loadingGroupes, setLoadingGroupes] = useState(true)
    let [loadingMemberships, setLoadingMemberships] = useState(true)
    let [loadingDemandes, setLoadingDemandes] = useState(true)
    let [refresh, setRefresh] = useState(false)
    
    useEffect(function () {
            let user = JSON.parse(localStorage.getItem('userInfo'))

            api.get(`groupe/getGroupes`).then((fetchedData) => {
                setGroupes(fetchedData.data);
                setLoadingGroupes(false)
            });
            api.get(`user/demandeExist/${user.id}`).then((fetchedData) => {
                setDemandes(fetchedData.data);
                setLoadingDemandes(false)

            });
            api.get(`user/isMember/${user.id}`).then((fetchedData) => {
                setMemberships(fetchedData.data);
                setLoadingMemberships(false)

            });
        }, [refresh])
    

    if (loadingDemandes || loadingGroupes || loadingMemberships){
        return <div>Loading</div>
    }

    let handleCancel = (userId, groupeId) => {
        CancelDemande(userId, groupeId).then(() => {
            setRefresh(!refresh)
    })
    }


    function groupeButton(groupe){
        let user = JSON.parse(localStorage.getItem('userInfo'))
        if (memberships && CheckMember(groupe, memberships)){
            return <Button className="btn btn-primary" href={`/groupe/home/${groupe.id}`} >Acceder</Button>
        }
        if (demandes && CheckMember(groupe, demandes))
            return <Button value={groupe.id} className="btn btn-primary" onClick={() => {handleCancel(user.id, groupe.id)}}>Annuler</Button>

        return <Button value={groupe.id} className="btn btn-primary" href={`/joinGroupe/${groupe.id}`}>Rejoindre</Button>
    }


    return(
        
        <div>
            {groupes.map(groupe => 
            {
                {console.log(refresh)}
                return(
                    // <Container key={groupe.id}>
                    //     <div className="row">
                    //         <div className="col-4">
                    //         <Card>
                    //         <img src={img} class="card-img-top" alt=""/>
                    //             <Card.Body>
                                   
                    //                 <Card.Title>{groupe.title}</Card.Title>
                    //                 <Card.Text>{groupe.groupeDescription}</Card.Text>
                    //                 {groupeButton(groupe)}
                    //             </Card.Body>
                    //         </Card>
                    //         </div>
                    //     </div>
                    // </Container>
                        <div>
<section class="dark">
	<div class="container py-4">
		<h1 class="h1 text-center" id="pageHeaderTitle">My Cards Dark</h1>

		<article class="postcard dark blue">
			<a class="postcard__img_link" href="#">
				<img class="postcard__img" src="https://picsum.photos/1000/1000" alt="Image Title" />
			</a>
			<div class="postcard__text">
				<h1 class="postcard__title blue"><a href="#">Podcast Title</a></h1>
				<div class="postcard__subtitle small">
					<time datetime="2020-05-25 12:00:00">
						<i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
					</time>
				</div>
				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!</div>
				<ul class="postcard__tagbox">
					<li class="tag__item"><i class="fas fa-tag mr-2"></i>Podcast</li>
					<li class="tag__item"><i class="fas fa-clock mr-2"></i>55 mins.</li>
					<li class="tag__item play blue">
						<a href="#"><i class="fas fa-play mr-2"></i>Play Episode</a>
					</li>
				</ul>
			</div>
		</article>
	</div>
</section>
            </div>
                )
            })}
        </div>
    )
}

export default GroupeList;