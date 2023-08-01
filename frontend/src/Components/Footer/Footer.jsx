import React from 'react';
import {Row,Col,Container,Form, Nav} from "react-bootstrap";
import "./Footer.css"
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <section className='footer text-center'>
      <Container className='p-4' style={{fontSize:"13px"}}>
        {/* <Row className='align-items-center mb-3'>
        <Col className='mb-4' xs={12} md={4}>
            <p style={{maxWidth:"400px" ,marginTop:'2rem',textAlign:"justify"}}>Whether you're a player, a coach, or a dedicated fan, let AI Match Analyser be your ally in the pursuit of sporting excellence. Embrace the power of AI, and let's create a future where every match is an inspiration to achieve greatness.</p>
          </Col>
        </Row> */}
        <Row>
        <Col xs={12} md={12}>
            <Form action='' className='form-f m-0'>
              <Row className='form-f-row'>
                <Col className='mb-3 fs-5' md={12} xs={12} >
                  <strong>Sign up for our newsletter</strong>
                </Col>
                <Col md={10} xs={9} className='d-flex justify-content-center'>
                  <Form.Label style={{fontSize:"15px",fontWeight:"600"}}>Email address</Form.Label>
                  <Form.Control contrast="true" type='email' label='Email address' placeholder='name@gmail.com' className='mx-1 m-4 mt-0' style={{maxWidth:"350px"}}/>
                </Col>
                <Col md={2} xs={3}>
                  <button className="form-f-btn" type='submit'>Subscribe</button>
                </Col>
              </Row>
            </Form>
        </Col>
        </Row>
        <Row className='justify-content-evenly'> 
          <Col md={2} xs={12} className='colF mb-4 mb-md-0  text-start '>
            <h6 className='text-capitalize'> Information and Presentation</h6>

            <Nav className='nav-list list-unstyled mb-0 d-flex flex-column'>
              <Nav.Link href='#Home'>Home</Nav.Link>
              <Nav.Link href='#About'>About Us</Nav.Link>
              <Nav.Link href='#Testimonials'>Testimonials</Nav.Link>
              <Nav.Link href='#Contact'>Contact Us</Nav.Link>
            </Nav>
          </Col>

          <Col md={2} xs={12} className='colF mb-4 mb-md-0 text-start '>
            <h6  className='text-capitalize'>Features and Plans</h6>

            <Nav className=' nav-list list-unstyled mb-0 d-flex flex-column'>
              <Nav.Link href='#Plans'>Plans</Nav.Link>
              <Nav.Link href='#FAQ'>FAQ</Nav.Link>
              <Nav.Link href='#'>Featured Matches</Nav.Link>
              <Nav.Link href='#'>AI Algorithms</Nav.Link>
            </Nav>
          </Col>

          <Col  md={2} xs={12} className='colF mb-md-0 text-start '>
            <h6  className='text-capitalize'>Resources and Support</h6>

            <Nav className='nav-list list-unstyled mb-0 d-flex flex-column'>
              <Nav.Link href='#'>Related Websites</Nav.Link>
              <Nav.Link href='#login'>Updates</Nav.Link>
              <Nav.Link href='#'>Community</Nav.Link>
              <Nav.Link href='#'>help & Support</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>

      <div className='text-center d-flex p-3 justify-content-around' style={{ boxShadow:" 0px 0px 3px rgba(0, 0, 0, 0.3)",fontSize:'12px'}}>
        <span>© AI Sports Highlights, 2023</span>
        <span>Terms</span>
        <span>Privacy Policy</span>
      </div>
    </section>
  );
}