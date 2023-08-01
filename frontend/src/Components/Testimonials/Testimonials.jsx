import React,{ useState, useEffect, useContext } from 'react';
import "./Testimonials.css";
import {testimonialsData} from "../../ComponentsData/testimonialsData.js";
import arrow_left from "../../Images/arrow-left.svg";
import arrow_right from "../../Images/arrow-right.svg"
import{Row,Col} from "react-bootstrap"
import { SignupContext } from '../Signup/SignupContext';
import Signup from '../Signup/Signup';
const Testimonials = () => {
  
  // auto Scroll
  const DELAY = 4000 ;
  let timer ;

  const startAutoScroll = () =>{         //setInterval(fct_à_executer,delai);
      timer = setInterval(() =>{ setCurrentIndex((prevIndex) =>
          prevIndex === testimonialsData.length-1 ? 0 : prevIndex + 1);}
      ,DELAY);
  }

  const stopAutoScroll = () =>{
    clearInterval(timer)
  }

  useEffect(() => {
    startAutoScroll();
  
    return () => {
      stopAutoScroll();
    };
  },);

  //Manual Scroll
  const [currentIndex,setCurrentIndex] = useState(0);
  const currentTestimonial = testimonialsData[currentIndex];

  const handleNext = () =>{
    stopAutoScroll();
    setCurrentIndex((prevIndex) =>
    prevIndex === testimonialsData.length-1 ? 0 : prevIndex + 1 //En utilisant une fonction de mise à jour d'état avec une syntaxe de fonction de rappel, on peut accéder à la valeur précédente de l'état (prevIndex) et effectuer les modifications nécessaires sur cette valeur. 
    ); 
  };

  const handlePrev = () =>{
    stopAutoScroll();
    setCurrentIndex((prevIndex)=> 
    prevIndex === 0 ? testimonialsData.length-1 : prevIndex+1
    );
  };

   // to open the signup form 
   const { showSignup, openSignup } = useContext(SignupContext);



  return (
    <section className='testimonials' id="Testimonials">
      <Row>
          <Col xs={12} sm={12} md={6} className="left-side-t">
            <div className='font1'>
              <span>what they</span>
              <span>say about us</span>
            </div>
            <span>{currentTestimonial.review}</span>
            <span>{currentTestimonial.name}</span>
          </Col>

          <Col xs={12} sm={12} md={6} className="right-side-t">
            <div className='rectangles-container-t'>
            <div></div>
            <div></div>      
            <div></div> 
            <img src={currentTestimonial.image} alt="testimonial_image" /> 
            </div>  
          </Col>
      </Row>

      <div className="arrows-t">
        <div></div>
        <div>
          <button   onClick={handlePrev}><img src={arrow_left} alt="" /></button>
          <button onClick={handleNext}><img src={arrow_right} alt="" /></button>
        </div>
      </div>

      <div  className="ready-t">
      <span style={{color:'white'}}>Are you ready to take part in an amazing experience?</span>
      <button onClick={openSignup}>
        <span>SIGN UP</span>
        <img src={arrow_right} alt="" />
      </button>
      </div>
      {showSignup && <Signup/>}
    </section>
  )
}

export default Testimonials