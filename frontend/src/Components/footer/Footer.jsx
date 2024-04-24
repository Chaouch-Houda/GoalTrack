import React from 'react';
import {Form, Nav, Button} from "react-bootstrap";
import "./Footer.css"
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <section className='w-100 footer text-center text-white'>
      <div className='w-100 p-4 px-2' style={{fontSize:"13px"}}>

        <div className='w-100 d-flex flex-column align-items-center justify-content-center gap-3 my-5 pb-3'>
          <div>
            <strong style={{fontSize:'min(20px,7vw)',whiteSpace:'nowrap'}}>Sign up for our newsletter</strong>
          </div>
          <Form className='w-100 d-flex justify-content-evenly align-items-start' style={{maxWidth:'650px'}}>
            <Form.Group className='w-100 d-flex align-items-baseline gap-2' style={{maxWidth:'500px'}}>
              <Form.Label style={{fontSize:"min(13px,4.5vw)",fontWeight:"600",whiteSpace:'nowrap'}}>Email address</Form.Label>
              <Form.Control contrast="true" type='email' label='Email address' placeholder='name@gmail.com' className='w-100' style={{maxWidth:"350px"}}/>
            </Form.Group>
            <div>
            <Button className="green-btn form-f-btn d-flex justify-content-center align-items-center " type='submit'>Subscribe</Button>
            </div>
          </Form>
        </div>

        <div className='w-100 d-flex flex-column flex-sm-row text-start justify-content-sm-evenly '>
          <div className='w-100 d-flex flex-column gap-1 ' style={{maxWidth:'250px'}}>
            <h6 className='text-capitalize'> Information and Presentation</h6>
            <Nav className='nav-list list-unstyled mb-0 d-flex flex-column'>
              <Nav.Link href='#Home'>Home</Nav.Link>
              <Nav.Link href='#About'>About Us</Nav.Link>
              <Nav.Link href='#Testimonials'>Testimonials</Nav.Link>
              <Nav.Link href='#Contact'>Contact Us</Nav.Link>
            </Nav>
          </div>
          <div className='w-100 d-flex flex-column gap-1 ' style={{maxWidth:'250px'}}>
            <h6 className='text-capitalize'> Features and Plans</h6>
            <Nav className='nav-list list-unstyled mb-0 d-flex flex-column'>
              <Nav.Link href='#Home'>Plans</Nav.Link>
              <Nav.Link href='#About'>FAQ</Nav.Link>
              <Nav.Link href='#Testimonials'>Featured Matches</Nav.Link>
              <Nav.Link href='#Contact'> AI Algorithms</Nav.Link>
            </Nav>
          </div>
          <div className='w-100 d-flex flex-column gap-1 ' style={{maxWidth:'250px'}}>
            <h6 className='text-capitalize'> Resources and Support</h6>
            <Nav className='nav-list list-unstyled mb-0 d-flex flex-column'>
              <Nav.Link href='#Home'>Related Websites</Nav.Link>
              <Nav.Link href='#About'>Updates</Nav.Link>
              <Nav.Link href='#Testimonials'>Community</Nav.Link>
              <Nav.Link href='#Contact'>help & Support</Nav.Link>
            </Nav>
          </div>
        </div>
      </div>

      <div className='text-center d-flex py-3 px-2 justify-content-around' style={{ boxShadow:" 0px 0px 3px rgba(0, 0, 0, 0.3)",fontSize:'min(12px,4vw)',whiteSpace:'nowrap'}}>
        <span>© AI Sports Highlights, 2023 </span>
        <span>Terms </span>
        <span>Privacy Policy</span>
      </div>
    </section>
  );
}