// import React, { useState, useEffect } from 'react';

// function Notifications() {
//   // Exemple de données de notification (à remplacer par vos propres données)
//   const [notifications, setNotifications] = useState([
//     {
//       title: 'Match en cours',
//       message: 'Le match Real Madrid vs. FC Barcelona est en cours.',
//       date: '2023-09-03 14:30:00',
//     },
//     {
//       title: 'Nouvelle vidéo',
//       message: 'Nouvelle vidéo de faits saillants du match Arsenal vs. Manchester United.',
//       date: '2023-09-02 18:45:00',
//     },
//     {
//       title: 'Analyse disponible',
//       message: 'Analyse détaillée du joueur Lionel Messi est maintenant disponible.',
//       date: '2023-09-01 10:15:00',
//     },
//   ]);

//   useEffect(() => {
//     // Ici, vous pouvez ajouter un appel à une API pour obtenir les notifications en temps réel ou mettre à jour l'état des notifications
//     // Par exemple, vous pouvez utiliser axios ou fetch pour interroger un serveur.
//   }, []); // Le tableau vide signifie que cet effet s'exécutera une seule fois après le rendu initial.

//   return (
//     <div className="notifications-page">
//       <h1>Notifications</h1>
//       <ul className="notification-list">
//         {notifications.map((notification, index) => (
//           <li className="notification" key={index}>
//             <div className="notification-header">
//               <strong>{notification.title}</strong>
//               <span className="notification-date">{notification.date}</span>
//             </div>
//             <div className="notification-message">{notification.message}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Notifications;
import React, { useContext, useState } from 'react'
import '../Signup/Signup.css'; // on n'est pas obligé de l'importer mais juste pour comprendre qu'on va utiliser des public classes from Signup.css :custom-overlay
import {IoMdClose} from 'react-icons/io'
import {TbSettings} from "react-icons/tb";
import {MdOutlineNotificationsActive} from "react-icons/md";
import {notifications as notifArray} from '../../componentsData/notifData';
import './Notifications.css'
import { NavLink } from 'react-router-dom';
import {sidebarContext} from '../sidebar/sidebarContext';
const Notifications = ({toggleNotifications}) => {
  // const {toggleNotifications} = props;
  const [notifications, setNotifications] = useState(notifArray);
  const deleteNotification = (index) => {
    // Mettez à jour les notifications en excluant celle qui doit être supprimée
    const updatedNotifications = notifications.filter((notif) => notif.id !== index);
    setNotifications(updatedNotifications);
  };
const {open} = useContext(sidebarContext);
  return (
    <div className={`notifications-list ${open ? 'mOpen-notif' : 'mClosed-notif'}`}>
      {/* <button className='bg-transparent p-0 m-0'><IoMdClose size={20}/></button> */}
      <div className='w-100 p-1 d-flex justify-content-between align-itels-center position-sticky top-0 ' style={{backgroundColor:'#27374B', boxShadow: '0 0px 0.9px rgba(0,0,0,0.5)' }}>
      <NavLink to='notificationsSettings'><TbSettings size={24} color='white'/></NavLink>
        <h2>Notifications</h2>
        <button className='bg-transparent p-0' onClick={()=>toggleNotifications()}><IoMdClose size={32}/></button>
      </div>
      <div className='w-100 p-1 pb-0 d-flex  justify-content-between align-itels-center' >
        <NavLink to='allNotifications' style={{color:'var(--green)'}}><h6>show all</h6></NavLink>
      </div>
      <div className='w-100 p-1'>
        {notifications.map((notif)=>(
          <div key={notif.id} className={`d-flex justify-content-between px-1 py-2`}>
            <div className='d-flex gap-2'>
              <div>
                <img src={notif.image} alt="img" style={{width:'40px',height:'40px',borderRadius:'50%'}}/>
                {/* <img src="" alt="" /> */}
              </div>
              <div className='d-flex flex-column'>
                <span style={{fontSize:'min(8vw,14px)'}}>{notif.subject}</span>
                <span style={{fontSize:'min(7vw,12px)',color:'var(--green)'}}>{notif.time}</span>
              </div>
            </div>
            <div>
              <button className='bg-transparent p-0' onClick={() => deleteNotification(notif.id)}><IoMdClose size={20}/></button> 
            </div>
          </div>

        ))}
      </div>
      
      </div>
      
  )
}

export default Notifications