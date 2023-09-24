import React from 'react'
import './Profile.css'
import {FaLock} from 'react-icons/fa'
import { TbSettings } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'
const Profile = () => {
  return (
    <div className='w-100 d-flex justify-content-center'>
        <div className='profile d-flex flex-column justify-content-center align-items-center my-5 p-1 pb-5'>
            <div className='w-100 d-flex justify-content-end'>
            <NavLink to='../accountSettings'><TbSettings size={24} color='white'/></NavLink>
            </div>
            <h1>Profile</h1>
            <div>
                <div className='img-pro'></div>
            </div>
            <div className='d-flex gap-2' >
                <h6 style={{color:'var(--green)'}}>Houda_Ch</h6>
                <FaLock color='rgba(255,255,255,0.7'/>
            </div>
            <div>
                <h6>Free</h6>
            </div>
            <div className='w-100 d-flex flex-column gap-2 ' style={{maxWidth:'280px'}}>
                <div>
                    <span>Username</span>
                    <div className='info-p'><span>Houda_Ch</span></div>
                </div>
                <div>
                    <span>First name</span>
                    <div className='info-p'><span>Houda</span></div>
                </div>
                <div>
                    <span>Last name</span>
                    <div className='info-p'><span>Chaouch</span></div>
                </div>
                <div>
                    <span>Email</span>
                    <div className='info-p'><span>houdachaouch05@gmail.com</span></div>
                </div>
                <div>
                    <span>About</span>
                    <div className='info-p'><span>houdachaouch05@gmail.com</span></div>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Profile