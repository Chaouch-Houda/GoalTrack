import "./Header.css"
import logo from "../../Images/logo.png";
import menu from "../../Images/list-light.svg"
import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const handleNavbarToggle = () => {
    setExpanded(!expanded);
  };

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
            <Nav.Link href="#Home" className="aHovered">Home</Nav.Link>
            <Nav.Link href="#About" className="aHovered">About</Nav.Link>
            <Nav.Link href="#Services" className="aHovered">Plans</Nav.Link>
            <Nav.Link href="#Contact" className="aHovered">Contact</Nav.Link>
          </Nav>
          <Nav className="nav-buttons">
            <Nav.Link  href="#login"  ><Button className="login font1">Login</Button></Nav.Link>
            <Nav.Link href="#signup"><Button className="signUp font1">Sign up</Button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;




// const Header = () => {
//   return (
//     <div className="navbar">
//       <img src={logo} alt="" className='logo'/>
//       <ul className='font1'>
//         <li><a href="#Home">home</a></li>
//         <li><a href="#About">about</a></li>
//         <li><a href="#Plan">plans</a></li>
//         <li><a href="#Contact">contact</a></li>
//       </ul>
//       <div className="nav-buttons">
//         <button className='font1'>log in</button>
//         <button  className='font1'>sign up</button>
//       </div>
//     </div>
//   )
// }


// export default Header vbar