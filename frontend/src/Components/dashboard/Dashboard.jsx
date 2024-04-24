import React, {useCallback, useContext, useState } from 'react'
import './Dashboard.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import UploadVideo from '../uploadVideo/UploadVideo'
import MatchSlider from '../matchSlider/MatchSlider'
// import bg1 from '../../assets/images/bg1.jpg'
// import bg1 from '../../assets/images/tt.png'
import bg3 from "../../assets/images/bg3.jpg"
import Lives from '../lives/Lives'
import Footer from '../footer/Footer'
import FAQ from '../faq/FAQ'
import Contact from '../contact/Contact'
import DropzoneComponent from '../Drop&Down';
import DashboardHeader from '../dashboardHeader/DashboardHeader';
import NewsSlider from '../newsSlider/NewsSlider';
import { AuthContext } from '../../pages/userDashboard/AuthContext';
const Dashboard = () => {

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
 
  return (
    <div className='cHomeRow ' style={{isolation:'isolate'}}>
      <div className='d-flex flex-column align-items-center'>
        <div className='top-0 bottom-0 position-fixed' style={{zIndex:'-1',left:0,right:0}}>
          <img src={bg3} className='w-100 h-100' alt="bg1" />
          {/* <div className='green-tache'></div> */}
        </div> 

        <div className='dashboard-container d-flex flex-column align-items-center pt-1  pt-sm-3 mt-0 mt-sm-4 mt-lg-5 '>
          <DashboardHeader/>
          <div className={`w-100 d-flex flex-column align-items-center justify-content-between section-one`}>
            <NewsSlider/>
            <div className='w-100 d-flex flex-column flex-md-row justify-content-around pt-3 pt-sm-4 pt-lg-5 px-3 overflow-hidden'>
              <div className='d-flex flex-column justify-content-center align-items-center gap-5 ' style={{flexGrow:1}}>
                <UploadVideo/>
                <DropzoneComponent />
              </div> 
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