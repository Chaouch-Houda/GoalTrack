import React, { useEffect, useRef, useState } from 'react'
import './Dashboard.css'
import '../profile/Profile.css'
import { Button, Form} from 'react-bootstrap'
import video1 from '../../assets/videos/Home_background.mp4'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FileUpload from '../fileUpload/FileUpload'
import {ArrowRight,CaretDown} from 'phosphor-react';
import MatchSlider from '../matchSlider/MatchSlider'
import bg1 from '../../assets/images/bg1.jpg'
import Lives from '../lives/Lives'
import Footer from '../footer/Footer'
import FAQ from '../faq/FAQ'
import Contact from '../contact/Contact'
import RenderInput from '../signup/RenderInput'
import {BiSearchAlt} from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
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
  
  const [searchVideo , setSearchVideo] = useState('');
  const handleSearch = (e) =>{
    setSearchVideo(e.target.value)
  }
  const submitSearch = (e) =>{
    e.preventDefault();
    console.log('submit search')
  }
  const avatarMenuRef = useRef(null);
  const avatarBtnRef = useRef(null);
  useEffect (()=>{
    function clickOutsideAvatarMenu (event) {
        if(avatarMenuRef.current && !avatarMenuRef.current.contains(event.target) && !avatarBtnRef.current.contains(event.target))
        {setAvatarMenu(false)}
    }
    //avatarMenuRef.current : Vérifie si la référence avatarMenuRef existe.
    //!avatarMenuRef.current.contains(event.target) : Vérifie si l'élément n'est pas enfant du div qui contient menu d'avatar.
    //!avatarBtnRef.current.contains(event.target) : Vérifie si l'élément n'est pas enfant du l'icon avec cette ref, sinon il ne cache plus le menu d'avatar.
    document.addEventListener('mousedown',clickOutsideAvatarMenu);
    return () =>{
      //La fonction retournée par useEffect est utilisée pour nettoyer l'écouteur d'événements lors du démontage du composant. Cela garantit qu'il n'y a pas de fuites de mémoire ou d'écouteurs d'événements inutiles après que le composant a été retiré du DOM.
      document.removeEventListener('mousedown',clickOutsideAvatarMenu);
    };
  }, [])

  const [avatarMenu,setAvatarMenu] = useState(false);
  return (
    <div className='cHomeRow ' style={{isolation:'isolate'}}>
      <div className='d-flex flex-column align-items-center'>
        <div className='top-0 bottom-0 position-fixed  ' style={{zIndex:'-1',left:0,right:0}}>
          <img src={bg1} className='w-100 h-100' alt="bg1" />
        </div> 

        <div className=' d-flex flex-column align-items-center pt-3 dashboard-container'>
          <div className='w-100 h-100 d-flex flex-column-reverse flex-sm-row align-items-center justify-content-around my-3 px-1' style={{maxHeight:'300px'}}>
            <Form onSubmit={submitSearch} className='position-relative search-video'>
              <BiSearchAlt color='gray' className='position-absolute'/>
              <Form.Control
              type='text'
              placeholder='Search'
              className='w-100'
              value={searchVideo}
              onChange={handleSearch}
              />
            </Form>
            <div className='d-flex align-items-center justify-content-end gap-2 flex-nowrap avatar-container position-relative'>
              <div className='d-flex align-items-center justify-content-center gap-1 flex-nowrap'>
                <CaretDown weight='regular' cursor='pointer' onClick={()=>setAvatarMenu(!avatarMenu)} ref={avatarBtnRef}/>
                <span className='text-nowrap' style={{fontSize:'12px',fontWeight:'400'}}>Houda Chaouch</span>
              </div>
              <div className='avatar'></div>
              {avatarMenu && <div className="avatar-menu bg-white d-flex justify-content-center align-items-center position-absolute" ref={avatarMenuRef}>
                <ul className='p-0 m-0'>
                  <li><NavLink className='text-decoration-none' >Create new account</NavLink></li>
                  <li><NavLink className='text-decoration-none text-nowrap'>Login with another account</NavLink></li>
                </ul>
              </div>}
            </div>
          </div>
          <div className={`w-100 d-flex align-items-center justify-content-center mt-4 section-one`}>
            <div className='w-100 d-flex flex-column flex-md-row justify-content-around pt-5 px-3 overflow-hidden'>
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
          </div> 
          <div className='w-100 d-flex align-items-center justify-content-center'>
            <MatchSlider/> 
          </div>
          
          <div className='w-100 d-flex align-items-center justify-content-center'>
            <Lives/>
          </div>

          <div className='w-100 d-flex flex-column align-items-center justify-content-center'>
              <div className='w-100 mt-3' style={{backgroundColor:'var(--bg-color)'}}><FAQ/></div>
              <div className='w-100' style={{backgroundColor:'var(--bg-color)'}}><Contact/></div>
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