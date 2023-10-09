import React, {useEffect, useRef, useState } from 'react'
import {Form} from 'react-bootstrap'
import {CaretDown} from 'phosphor-react';
import {BiSearchAlt} from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import './DashboardHeader.css'
const DashboardHeader = () => {
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
        if(avatarMenuRef.current && avatarBtnRef.current && !avatarMenuRef.current.contains(event.target) && !avatarBtnRef.current.contains(event.target))
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
    <div className='w-100 h-100 d-flex flex-column-reverse flex-sm-row align-items-center justify-content-around mb-2 my-md-3 px-2' style={{maxHeight:'300px'}}>
            <Form onSubmit={submitSearch} className='search-video position-relative'>
              <BiSearchAlt color='gray' className='position-absolute'/>
              <Form.Control
              type='text'
              placeholder='Search'
              className='w-100'
              value={searchVideo}
              onChange={handleSearch}
              />
            </Form>
            <div className='avatar-container d-flex align-items-center justify-content-end gap-2 flex-nowrap position-relative'>
              <div className='d-flex align-items-center justify-content-center gap-1 flex-nowrap'>
                <CaretDown weight='regular' cursor='pointer' onClick={()=>setAvatarMenu(!avatarMenu)} ref={avatarBtnRef}/>
                <span className='text-nowrap' style={{fontSize:'12px',fontWeight:'400'}}>Houda Chaouch</span>
              </div>
              <div><NavLink to='/connected/profile 'className='h-100 w-100'><div  className='avatar'></div></NavLink></div>
              {avatarMenu && <div className="avatar-menu bg-white d-flex justify-content-center align-items-center position-absolute overflow-hidden" ref={avatarMenuRef}>
                <ul className='p-0 m-0'>
                  <li><NavLink to='/signup' className='text-decoration-none' >Create new account</NavLink></li>
                  <li><NavLink to='/login' className='text-decoration-none text-nowrap'>Login with another account</NavLink></li>
                </ul>
              </div>}
            </div>
          </div>
  )
}

export default DashboardHeader