import './App.css';
import FAQ from './Components/FAQ/FAQ';
import Home from './Components/Home/Home';
import Plan from './Components/Plans/Plan';
import Testimonials from './Components/Testimonials/Testimonials';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import React from 'react';
import { SignupProvider } from './Components/Signup/SignupContext';
import { LoginProvider } from './Components/Login/LoginContext';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signup from './Components/Signup/Signup';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <div id='InternautePage'>
              <SignupProvider>
                <LoginProvider>
                  <Home/>
                </LoginProvider>
                <About/>
                <Testimonials/>
              </SignupProvider>
            </div>
          } />
          <Route path='/connected' element={
            <div id='ConnectedUserPage'>
              <Footer/>
            </div>
          } />
          
        </Routes>
          <Plan/>
          <FAQ/>
          <Contact/>
          <Footer/>
      </BrowserRouter>
      
      {/* <Login/> */}
    </div>
  );
}

export default App;
