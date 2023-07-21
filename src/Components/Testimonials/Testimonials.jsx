import React,{ useState, useEffect } from 'react';
import "./Testimonials.css";
import {testimonialsData} from "../../ComponentsData/testimonialsData.js";
import arrow_left from "../../Images/arrow-left.svg";
import arrow_right from "../../Images/arrow-right.svg"

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
  }, []);

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
  
  return (
    <section className='testimonials'>
      <div className="left-side-t">
        <div className='font1'>
          <span>what they</span>
          <span>say about us</span>
        </div>
        <span>{currentTestimonial.review}</span>
        <span>{currentTestimonial.name}</span>
        <div className="arrows-t">
          <div></div>
          <div>
            <button   onClick={handlePrev}><img src={arrow_left} alt="" /></button>
            <button onClick={handleNext}><img src={arrow_right} alt="" /></button>
          </div>
        </div>
      </div>

      <div className="right-side-t">
        <div className='rectangles-container-t'>
        <div></div>
        <div></div>      
        <div></div> 
        <img src={currentTestimonial.image} alt="testimonial_image" /> 
        </div>
            
      </div>
    </section>
  )
}

export default Testimonials