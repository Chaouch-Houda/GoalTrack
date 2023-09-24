import React from 'react'
import { Container, Row, Col, Form, Button} from "react-bootstrap";
import "./Contact.css";
import {motion} from 'framer-motion';
import {FacebookLogo,InstagramLogo,LinkedinLogo,EnvelopeSimple} from "phosphor-react";
const Contact = () => {
  const socialMedias =[{icon : <FacebookLogo size={24} cursor={'pointer'}/> , account:'Goal Track'},
                       {icon : <InstagramLogo size={24} cursor={'pointer'}/> , account:'Goal Track'},
                       {icon : <LinkedinLogo size={24} cursor={'pointer'}/> , account:'Goal_Track'},
                       {icon : <EnvelopeSimple size={24} cursor={'pointer'}/> , account:'contact@goaltrack.com'},
  ]
  return(
    <section className="contact-us" id='Contact'>
      <Container className='contact-container'>
        <Row className='w-100 m-0'>
          <Col xs={12} sm={12} md={11}  className='form-col'>
            <div>
              <h1>Contact Us</h1>
              <Form className='form-contact'>
                <Form.Control type="text" placeholder="Enter your name" className='input-c'/>
                <Form.Control type="email" placeholder="Enter your email" className='input-c' />
                <Form.Control as="textarea" rows={5} placeholder="Enter your message ..." className='input-c' />
                <Button type='submit' className='green-btn'>Submit</Button>
              </Form>
            </div>
          </Col>

          <Col xs={12} sm={12} md={1} className='socialMedia-c'>
            <div>
              {socialMedias.map((s,i)=>(
                <motion.div whileHover={{scale:1.1}} key={i}>
                  {s.icon}
                  {/* {s.account} */}
                </motion.div>
              ))}
            </div>
            </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact