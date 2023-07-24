import React from 'react'
import { Container, Row, Col, Form} from "react-bootstrap";
import "./Contact.css";
import {FacebookLogo,InstagramLogo,LinkedinLogo,EnvelopeSimple} from "phosphor-react";
const Contact = () => {
  return(
    <section className="contact-us" id='Contact'>
      <Container className='contact-container'>
        <Row className='contact-row'>
          <Col xs={12} sm={12} md={11}  className='form-c'>
            <div>
              <h1>Contact Us</h1>
              <Form>
                <Form.Control type="text" placeholder="Enter your name" className='input-c'/>
                <Form.Control type="email" placeholder="Enter your email" className='input-c' />
                <Form.Control as="textarea" rows={5} placeholder="Enter your message ..." className='input-c' />
                <button type='submit'>Submit</button>
              </Form>
            </div>
          </Col>

        <Col xs={12} sm={12} md={1} className='socialMedia-c'>
          <div>
            
            <div>
              <FacebookLogo size={24} cursor={'pointer'}/>
              {/* <span>Goal Track</span>  */}
            </div>
            <div>
              <InstagramLogo size={24} cursor={'pointer'}/>
              {/* <span>Goal Track</span> */}
            </div>
            <div>
              <LinkedinLogo size={24} cursor={'pointer'}/>
              {/* <span>Goal_Track</span> */}
            </div>
            <div>
              <EnvelopeSimple size={24} cursor={'pointer'}/>
              {/* <span>contact@goaltrack.com</span> */}
            </div>
          </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact