import React, { useState } from 'react'
import { TbSettings } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'
import {notifications as notifArray} from '../../componentsData/notifData';
import { IoMdClose } from 'react-icons/io';
import './AllNotifications.css'
const AllNotifications = () => {
    const [notifications, setNotifications] = useState(notifArray);
    const deleteNotification = (index) => {
      // Mettez à jour les notifications en excluant celle qui doit être supprimée
      const updatedNotifications = notifications.filter((notif) => notif.id !== index);
      setNotifications(updatedNotifications);
    };
  return (
    <div className="w-100 d-flex justify-content-center py-5 ">
    <div className='all-notifications '>
        <div className='w-100 p-2 d-flex justify-content-between'style={{boxShadow: '0 0px 0.9px rgba(0,0,0,0.5)' }}>
            <h2>Notifications</h2>
            <NavLink to='/connected/notificationsSettings'><TbSettings size={24} color='white'/></NavLink>
        </div>
        <div className='w-100 p-1 pb-0 d-flex  justify-content-between align-itels-center' >
        </div>
        <div className='w-100 p-2'>
            {notifications.map((notif)=>(
            <div key={notif.id} className={`d-flex justify-content-between px-1 py-3`}>
                <div className='d-flex gap-2'>
                    <div>
                        <img src={notif.image} alt="img" style={{width:'40px',height:'40px',borderRadius:'50%'}}/>
                        {/* <img src="" alt="" /> */}
                    </div>
                    <div className='d-flex flex-column'>
                        <span style={{fontSize:'min(5vw,15px)'}}>{notif.subject}</span>
                        <span style={{fontSize:'min(7vw,12px)',color:'var(--green)'}}>{notif.time}</span>
                    </div>
                </div>
                <div>
                <button className='bg-transparent p-0' onClick={() => deleteNotification(notif.id)}><IoMdClose size={20}/></button> 
                </div>
            </div>))}
        </div>
      </div>
      </div>
  )
}

export default AllNotifications