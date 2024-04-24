import React from 'react'
import './ErrorPage.css'
import errorBg from "../../assets/videos/errorBg.mp4";
import {NavLink} from 'react-router-dom';
const ErrorPage = () => {
  return (
    <div className='error-page w-100 h-100'>
        <div className='position-absolute w-100 left-0 overflow-hidden' style={{height:'120%',top:'-10%'}}>
          <video autoPlay loop muted playsInline><source src={errorBg} type='video/mp4' /></video>
        </div>
        <div className="error-content w-100 h-100 d-flex flex-column justify-content-between align-items-center">
          <div className='d-flex flex-column text-center error-text'>
            <span>404</span>
            <span>Something's missing</span>
            <span>The page  you're looking for is not found</span>
          </div>
          <button><NavLink to='/' className='text-decoration-none'style={{color:'var(--bg-color)',fontWeight:'bold'}}>Go to homepage</NavLink></button>
        </div>
    </div>
  )
}

export default ErrorPage