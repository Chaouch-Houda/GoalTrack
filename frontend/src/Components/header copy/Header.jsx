import React, { useState } from 'react'
import logo from "../../assets/images/logo.png";
import {Nav,Button} from 'react-bootstrap'
import { Link} from 'react-router-dom';
import {CgMenuRightAlt,CgMenu} from 'react-icons/cg'
import './Header.css'
const Header = () => {
    const [menuOpen,setMenuOpen]=useState(false);
  return (
    <Nav className='header-content w-100 d-flex flex-nowrap justify-content-around align-items-center p-2 '>
        <div className=' d-flex align-items-center justify-content-between px-2' >
            <img src={logo} alt="logo" height='62px'/>
            <div className='menu-btn'>
                {menuOpen ? <CgMenuRightAlt size={28} cursor={'pointer'} color='white' onClick={()=>setMenuOpen(false)}/> 
                : <CgMenu size={28} cursor={'pointer'} color='white' onClick={()=>setMenuOpen(true)}/>}
            </div>
        </div>
        <div className={`${!menuOpen && 'nav-links-hidden'} nav-links font1`}>
            <Nav.Link href="#Home" className="link" onClick={()=>setMenuOpen(false)}>Home</Nav.Link> {/*<Nav.Link> pour les liens de navigation sont stylisés pa défaut comme des liens standard,*/}
            <Nav.Link href="#About" className="link" onClick={()=>setMenuOpen(false)}>About</Nav.Link>
            <Nav.Link href="#Plans" className="link" onClick={()=>setMenuOpen(false)}>Plans</Nav.Link>
            <Nav.Link href="#Contact" className="link" onClick={()=>setMenuOpen(false)}>Contact</Nav.Link>
        </div>
        <div className={`${!menuOpen && 'nav-links-hidden'} nav-links gap-2 text-center `}>
            <Link to="/login" ><Button className="transparent-g-btn font1" onClick={()=>console.log('show login')}>Login</Button></Link>
            <Link to="/signup"><Button className="green-btn font1" onClick={()=>console.log('show signup')} >Sign up</Button></Link>
        </div>
        
    </Nav>
  )
}

export default Header