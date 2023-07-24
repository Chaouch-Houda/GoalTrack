import './App.css';
import FAQ from './Components/FAQ/FAQ';
import Home from './Components/Home/Home';
import Plan from './Components/Plans/Plan';
import Testimonials from './Components/Testimonials/Testimonials';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import React from 'react';
function App() {
  return (
    <div className="App">
      <Home/>
      <About/>
      <Testimonials/>
      <Plan/>
      <FAQ/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;
