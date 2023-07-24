import React from 'react';
import {Row,Col,Container,Form} from "react-bootstrap";
import "./Footer.css"
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
            <Form action='' className='m-0'>
              <Row className='form-row'>
                <Col className='mb-3 fs-5' md={12} xs={12} >
                  <strong>Sign up for our newsletter</strong>
                </Col>
                <Col md={10} xs={9} className='d-flex justify-content-center'>
                  <Form.Label style={{fontSize:"15px",fontWeight:"600"}}>Email address</Form.Label>
                  <Form.Control contrast="true" type='email' label='Email address' className='m-4 mt-0' style={{maxWidth:"350px"}}/>
                </Col>
                <Col md={2} xs={3}>
                  <button className="form-btn" type='submit'>Subscribe</button>
                </Col>
              </Row>
            </Form>
        </Col>
          <Col md={4} xs={4} className='mb-4 mb-md-0 flex-column colF'>
            <h6 className='text-uppercase'> Information and Presentation</h6>

            <ul className='list-unstyled mb-0 '>
              <li>
                <a href='#Home'>Home</a>
              </li>
              <li>
                <a href='#About'>About Us</a>
              </li>
              <li>
                <a href='#Testimonials'>Testimonials</a>
              </li>
              <li>
                <a href='#Contact'> Contact Us</a>
              </li>
            </ul>
          </Col>

          <Col md={4} xs={4} className='mb-4 mb-md-0 flex-column colF'>
            <h6  className='text-uppercase'>Features and Plans</h6>

            <ul className='list-unstyled mb-0'>
              <li>
                <a href='#Plans'>Plans</a>
              </li>
              <li>
                <a href='#FAQ'>FAQ</a>
              </li>
              <li>
                <a href='#!' >Featured Matches</a>
              </li>
              
              <li>
                <a href='#!'> AI Algorithms</a>
              </li>
            </ul>
          </Col>
          <Col  md={4} xs={4} className='mb-4 mb-md-0 flex-column colF'>
            <h6  className='text-uppercase'>Resources and Support</h6>

            <ul className='list-unstyled mb-0'>
              <li>
                <a href='#!' >Related Websites</a>
              </li>
              <li>
                <a href='#!'>Updates</a>
              </li>
              <li>
                <a href='#!'>Community</a>
              </li>
              
              <li>
                <a href='#!'> help & Support</a>
              </li>
            </ul>
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