import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp'
import Home from './components/Home';
import HomeAfterSignIn from './components/HomeAfterSignIn';

import CreateGroupe from './components/CreateGroupe';
import './App.css';
import CreateTrip from './components/CreateTrip';
import GroupeHome from './components/GroupeHome';
import GroupeList from './components/GroupeList';
import DemandeGroupe from './components/DemandeGroupe';




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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
