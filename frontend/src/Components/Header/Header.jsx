import "./Header.css"
import logo from "../../Images/logo.png";
import React, { useContext, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { SignupContext } from "../Signup/SignupContext";
import Signup from "../Signup/Signup";
import { LoginContext } from "../Login/LoginContext";
import Login from "../Login/Login";


const Header = () => { 

  const [expanded, setExpanded] = useState(false);

  const handleNavbarToggle = () => {
    setExpanded(!expanded);
  };
  const closeNavbarToggle = () => {
    setExpanded(false)
  }

  // to open the signup form 
  const { showSignup, openSignup} = useContext(SignupContext);
    // to open the login form 
  const { showLogin, openLogin} = useContext(LoginContext);



  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      expanded={expanded}
      className={expanded ? 'navbar navbar-sm-bg' : 'navbar'}
    >
      <Container>
        <Navbar.Brand href="#"><img src={logo} alt="" className='logo'/></Navbar.Brand>
        {/* <img src={menu} alt="" aria-controls="responsive-navbar-nav" onClick={handleNavbarToggle} className="menu" /> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleNavbarToggle} className="menu" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto font1 ">
            <Nav.Link href="#Home" className="aHovered" onClick={closeNavbarToggle}>Home</Nav.Link>
            <Nav.Link href="#About" className="aHovered" onClick={closeNavbarToggle}>About</Nav.Link>
            <Nav.Link href="#Plans" className="aHovered" onClick={closeNavbarToggle}>Plans</Nav.Link>
            <Nav.Link href="#Contact" className="aHovered" onClick={closeNavbarToggle}>Contact</Nav.Link>
          </Nav>
          <Nav className="nav-buttons">
            <Nav.Link  href="#login"  ><Button className="login font1" onClick={()=>{openLogin();closeNavbarToggle()}}>Login</Button></Nav.Link>
            <Nav.Link href="#SignUp"><Button className="signUp font1" onClick={()=>{openSignup();closeNavbarToggle()}}>Sign up</Button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {showSignup && <Signup/>}
      {showLogin && <Login/>}
    </Navbar>
  );
};

export default Header;
