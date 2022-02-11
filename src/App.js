import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/User/SignIn';
import SignUp from './components/User/SignUp'
import Home from './components/User/Home';
import CreateGroupe from './components/Groupe/CreateGroupe';
import './App.css';
import CreateTrip from './components/Voyage/CreateTrip';
import GroupeHome from './components/Groupe/GroupeHome';
import GroupeList from './components/Groupe/GroupeList';
import DemandeGroupe from './components/Groupe/DemandeGroupe';
import CreatePost from "./components/Post/CreatePost";
import Comments from "./components/Comment/Comments";
import VoyageGroupe from "./components/Voyage/VoyageGroupe";
import AdminUser from "./components/Dashboard/AdminUser";
import AdminDemandeGroupe from "./components/Dashboard/AdminDemandeGroupe";
import AdminTrip from "./components/Dashboard/AdminTrip";
import UpdateVoyage from "./components/Voyage/UpdateVoyage";
import AdminPost from "./components/Dashboard/AdminPost";
import Chat from "./components/Chat/Chat";
import AdminDemandeVoyage from "./components/Dashboard/AdminDemandeVoyage";




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} exact/>
          <Route path='/HomeBeforeSignIn' element={<Home/>} exact/>
          <Route path='/signIn' element={<SignIn/>} exact/>
          <Route path='/createGroupe' element={<CreateGroupe/>} exact/>
          <Route path='/createTrip/:groupeId' element={<CreateTrip/>} exact/>
          <Route path='/signUp' element={<SignUp/>} exact/>
          <Route path='/listeGroupes' element={<GroupeList/>} exact/>
          <Route path='/groupe/home/:groupeId' element={<GroupeHome/>} exact/>
          <Route path='/joinGroupe/:groupeId' element={<DemandeGroupe/>} exact/>
          <Route path='/createPost/:id' element={<CreatePost/>}/>
          <Route path='/posteCommentaire/:groupeId/:posteId' element={<Comments/>}/>
          <Route path='/groupeVoyages/:groupeId' element={<VoyageGroupe/>}/>
          <Route path={'/groupe/admin/users/:groupeId'} element={<AdminUser/>}/>
          <Route path={'/groupe/admin/demandes/:groupeId'} element={<AdminDemandeGroupe/>}/>
          <Route path={'/groupe/admin/trips/:groupeId'} element={<AdminTrip/>}/>
          <Route path={'/groupe/admin/voyage/:voyageId'} element={<UpdateVoyage/>}/>
          <Route path={'/groupe/admin/voyage/details/:voyageId'} element={<UpdateVoyage/>}/>
          <Route path={'/groupe/admin/postes/:groupeId'} element={<AdminPost/>}/>
          <Route path={'/groupe/chat/:groupeId'} element={<Chat/>}/>
          <Route path={'/voyage/demande/:groupeId/:voyageId'} element={<AdminDemandeVoyage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
