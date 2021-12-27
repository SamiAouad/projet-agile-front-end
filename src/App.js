import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp'
import Home from './components/Home';
import './App.css';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} exact/>
          <Route path='/signIn' element={<SignIn/>} exact/>
          <Route path='/signUp' element={<SignUp/>} exact/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
