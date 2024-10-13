
import './App.css'
import Navbar from './Components/NavBar/NavBar'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import AboutMe from './Components/AboutMe/AboutMe'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp from './Components/SignUp/SignUp'
import SignIn from './Components/SignUp/SignIn'
import Todo from './Components/Todo/Todo'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login } from './Components/Store/Slice/AuthSlice' 


function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    const id = sessionStorage.getItem("id")
    console.log(id);
    if(id){
      dispatch(login())
    }
    
  },[])
  
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element = {<Home/>}/>
          <Route exact path="/aboutMe" element = {<AboutMe/>}/>
          <Route exact path="/todo" element = {<Todo/>}/>
          <Route exact path="/signin" element = {<SignIn/>}/>
          <Route exact path="/signUp" element = {<SignUp/>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  )
}

export default App
