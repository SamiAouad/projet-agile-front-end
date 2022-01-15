import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/User/SignIn';
import SignUp from './components/User/SignUp'
import Home from './components/User/Home';
import HomeAfterSignIn from './components/User/HomeAfterSignIn';
import CreateGroupe from './components/Groupe/CreateGroupe';
import './App.css';
import CreateTrip from './components/Groupe/CreateTrip';
import GroupeHome from './components/Groupe/GroupeHome';
import GroupeList from './components/Groupe/GroupeList';
import DemandeGroupe from './components/Groupe/DemandeGroupe';
import CreatePost from "./components/Post/CreatePost";
import Comments from "./components/Comment/Comments";
import VoyagesList from "./components/Voyage/VoyagesList";




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} exact/>
          <Route path='/Home' element={<HomeAfterSignIn/>} exact/>
          <Route path='/signIn' element={<SignIn/>} exact/>
          <Route path='/createGroupe' element={<CreateGroupe/>} exact/>
          <Route path='/createTrip' element={<CreateTrip/>} exact/>
          <Route path='/signUp' element={<SignUp/>} exact/>
          <Route path='/listeGroupes' element={<GroupeList/>} exact/>
          <Route path='/groupe/home/:groupeId' element={<GroupeHome/>} exact/>
          <Route path='/joinGroupe/:groupeId' element={<DemandeGroupe/>} exact/>
          <Route path='/createPost/:id' element={<CreatePost/>}/>
          <Route path='/posteCommentaire/:posteId' element={<Comments/>}/>
          <Route path='/groupeVoyages/:groupeId' element={<VoyagesList/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
