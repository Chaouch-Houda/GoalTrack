import React, { useContext, useState } from 'react'
import {X,Square,CheckSquare,InstagramLogo,FacebookLogo,LinkedinLogo,GoogleLogo} from 'phosphor-react'
import {Row,Col, Form, Button, Container} from "react-bootstrap";
import "../Signup/Signup.css"
import ReactModal from 'react-modal';
import { LoginContext } from './LoginContext';


const Login = () =>{
  const [checked,setChecked] = useState(false);
  const handleChecked=()=>{
    setChecked(!checked);
  }

  const handleLogin = (event) => {
    event.preventDefault();
    };

const {showLogin,closeLogin} = useContext(LoginContext);
ReactModal.setAppElement('#Home');

  return (
    <ReactModal overlayClassName="custom-overlay" isOpen={showLogin} className="signup"  id='Login'>
        <Container className='signup-container'>
            <Row>
                <Col className='d-flex justify-content-end' xm={12}  >
                    <X width="24px" height={"24px"} color='rgba(255,255,255,0.5)' cursor={"pointer"} onClick={closeLogin}/>
                </Col>
                
            </Row>
            <Row className=' text-white text-center'>
                <Col xm={12}>
                    <h1 className='fs-1 font1 text-light'>log in</h1>
                    <span className='fs-6'>Welcome Back!</span>
                    <Form onSubmit={handleLogin} className='form-signup'>
                        <Form.Control type="email" name='email' placeholder="Email"  className='input-ls' />
                        <Form.Control type='password' name='password' placeholder="Password" className='input-ls'/>
                        <div className='d-flex gap-1'>
                            <div>{
                                !checked ? (<Square onClick={()=>handleChecked()} color='var(--green)' cursor={"pointer"}/>):
                                (<CheckSquare onClick={()=>handleChecked()} color='var(--green)' cursor={"pointer"}/>)}
                            </div>
                            <div className='terms'>
                                <span className="d-inline-block" style={{ marginRight: '1rem' }}>Remember me </span>
                                <span>Forgot Password </span>
                            </div>
                        </div>
                        <Button type="submit" className='btn-form-signup'>Log in</Button>
                    </Form>
                    
                    <div className='d-flex justify-content-center align-items-center gap-1 m-3'>
                        <div className='empty-div'></div>
                        <span>or</span>
                        <div className='empty-div'></div>
                    </div>
                    <div className='d-flex justify-content-center fs-2 gap-2 mb-3'>
                        <InstagramLogo cursor={"pointer"}/>
                        <FacebookLogo cursor={"pointer"}/>
                        <LinkedinLogo cursor={"pointer"}/>
                        <GoogleLogo cursor={"pointer"}/>
                    </div>
                    <div>
                        <span className="switch-text" >don't have an account ?</span>
                        <span className="switch">sign up</span>
                    </div>
                </Col>
            </Row>
        </Container>
    </ReactModal>
  )
}

export default Login