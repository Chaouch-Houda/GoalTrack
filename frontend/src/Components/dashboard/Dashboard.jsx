import React, { useState } from 'react'
import './Dashboard.css'
import '../profile/Profile.css'
import { Button, Form} from 'react-bootstrap'
import video1 from '../../assets/videos/Home_background.mp4'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FileUpload from '../fileUpload/FileUpload'
import {ArrowRight} from 'phosphor-react';
import Match from '../matchSlider/MatchSlider'
import bg1 from '../../assets/images/bg1.jpg'
import Lives from '../lives/Lives'
import Footer from '../footer/Footer'
import FAQ from '../faq/FAQ'
import Contact from '../contact/Contact'
const Dashboard = () => {
  // const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange"}); 

  const handleInputChange = () =>{

  }

  const [suggestion,setSuggestion]= useState('');
  const handleSuggestionChange = (event) =>{
      setSuggestion(event.target.value) ;
  }
  const handleSuggestionSubmit = (event) => {
    event.preventDefault();
    // Implémentez la logique pour traiter la suggestion ici
    console.log('Suggestion soumise :', suggestion);
  };
  
  const NextArrow = (props) => {
    return <div onClick={props.onClick}>=<ArrowRight style={{position:'absolute',top:'50%'}}/></div>;
  };
  const videos = [
    video1,
    video1,
    video1,
    video1
  ]
  const settings = {
    dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1, 
    nextArrow:<NextArrow/>,
    // autoplay: true,
    // autoplaySpeed: 1000,
    pauseOnHover: false, // Empêche la pause en survolant
    pauseOnFocus: false, // Empêche la pause en mettant le focus sur le slider
  };
  
  return (
    <div className='cHomeRow ' style={{isolation:'isolate'}}>
      <div className='d-flex flex-column align-items-center'>
        <div className='top-0 bottom-0 position-fixed  ' style={{zIndex:'-1',left:0,right:0}}>
          <img src={bg1} className='w-100 h-100' alt="bg1" />
        </div> 

        <div className='w-100'style={{maxWidth:'1200px'}} >
          <div style={{minHeight:'300px',zIndex:'2'}}>
            <div>
            </div>
          </div>

          <div className={`d-flex flex-column flex-md-row justify-content-around pt-5 px-3 overflow-hidden`}> 
            <div className='d-flex flex-column justify-content-center align-items-center gap-5 '>
              <FileUpload/>
                {/* <Slider {...settings} style={{width:"300px"}}>
                  {videos.map((video, index) => (
                    <div key={index} >
                      <video controls autoPlay>
                        <source src={video} type="video/mp4" />
                      </video>
                    </div>
                  ))}
                </Slider> */}
            </div> 
            <div className='p-1 py-3 d-flex justify-content-center' >
              <div className="suggestion p-2">
                <span style={{fontSize:'min(14px,9vw)',color:'var(--green)'}}>Suggest Improvements</span>
                <Form onSubmit={handleSuggestionSubmit} className='d-flex flex-column gap-1'>
                  <Form.Group controlId="name">
                      <Form.Label style={{fontSize:'min(9vw,13px)'}}>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value='Houda Chaouch'
                        // onChange={handleNameChange}
                        readOnly // Le champ nom est en lecture seule puisque l'utilisateur est connecté
                        className='input-p'
                      />
                    </Form.Group>
                    <Form.Group controlId="email">
                      <Form.Label style={{fontSize:'min(9vw,13px)'}}>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value='houdachaouch05@gmail.com'
                        // onChange={handleEmailChange}
                        readOnly // Le champ email est en lecture seule puisque l'utilisateur est connecté
                        className='input-p'
                      />
                    </Form.Group>
                  <Form.Group controlId="suggestion">
                    <Form.Label style={{fontSize:'min(9vw,13px)'}}>Suggestion</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="suggestion"
                      onChange={handleSuggestionChange}
                      required
                      className='input-p'
                    />
                  </Form.Group>
                  <Button type="submit" className='green-btn suggestion-btn p-0'>Send</Button>
                </Form>
              </div>
            </div>
              {/* <Testimonials/>
              <Plan/>
              <FAQ/> */}
          </div>
          
          <div className='d-flex align-items-center justify-content-center'>
            <Match/>
          </div>
          
          <div className='d-flex align-items-center justify-content-center'>
            <Lives/>
          </div>

          <div className='d-flex flex-column align-items-center justify-content-center'>
              <div className='mt-3' style={{width:'96%',backgroundColor:'var(--bg-color)'}}><FAQ/></div>
              <div style={{width:'96%',backgroundColor:'var(--bg-color)'}}><Contact/></div>
          </div>
        </div>

        <div className='w-100 d-flex justify-content-start' style={{backgroundColor:'var(--bg-color)'}}>
          <Footer/>
        </div>
    </div>
  </div>  
  )
}

export default Dashboard