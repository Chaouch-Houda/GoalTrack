import React, { useContext, useState } from 'react'
import {X,Square,CheckSquare,InstagramLogo,FacebookLogo,LinkedinLogo,GoogleLogo, Link} from 'phosphor-react'
import {Row,Col, Form, Button, Container} from "react-bootstrap";
import "./Signup.css"
import { SignupContext } from './SignupContext';
import Modal from 'react-modal';
import axios from "axios";
const Signup = () => {
    const [checked,setChecked] = useState(false);
    const handleChecked=()=>{
        setChecked(!checked);
    }    

    const [values,setValues] = useState({
        name: "",
        email: "",
        password: "" ,
        confirm_password : "",
    });
    const handleChange = (event) =>{
        setValues({...values,[event.target.name]:[event.target.value]})
    }

    // const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/#SignUp',values)
        .then(res =>{
            // if(res.status === "Success"){
                // navigate("/Login");
                console.log(res.values)
            // }
            // else{
            //     alert("Error");
            // }
        })
        .catch(err => console.log(err));
      };

    
    // to close the signup form 
    const { showSignup, closeSignup} = useContext(SignupContext);

    Modal.setAppElement('#Home');
    return (
        <Modal overlayClassName="custom-overlay" isOpen={showSignup} className='signup' id='SignUp'> 
        <Container className='signup-container'>
            <Row>
                <Col className='d-flex justify-content-end' xm={12}  >
                    <X width="24px" height={"24px"} color='rgba(255,255,255,0.5)' cursor={"pointer"} onClick={closeSignup}/>
                </Col>
                
            </Row>
            <Row className=' text-white text-center'>
                <Col xm={12}>
                    <h1 className='fs-1 font1 text-light'>sign up</h1>
                    <span className='fs-6'>Welcome to GoalTrack</span>
                    <Form onSubmit={handleSubmit} className='form-signup'>
                        <Form.Control type="text" name="name" placeholder="Name"  className='input-ls' onChange={handleChange} />
                        <Form.Control type="email" name="email" placeholder="Email" className='input-ls' onChange={handleChange}/>
                        <Form.Control type='password' name="password" placeholder="Password" className='input-ls' onChange={handleChange}/>
                        <Form.Control type='password' name="confirm_password" placeholder="Confirm Password" className='input-ls' onChange={handleChange}/>
                        <div className='d-flex gap-1'>
                            <div>{
                                checked ? (<CheckSquare onClick={()=>handleChecked()} color='var(--green)' cursor={"pointer"}/>) :
                                (<Square onClick={()=>handleChecked()} color='var(--green)' cursor={"pointer"}/>)
                                }
                            </div>
                            <div className='terms'>
                                <span>By clicking on Sign up, you agree to our </span>
                                <span>Terms of service </span>
                                <span>and </span>
                                <span>Privacy policy</span>
                            </div>
                        </div>
                        <Button type="submit" className='btn-form-signup'>Sign Up</Button>
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
                        <span className="switch-text" >Already have an account ?</span>
                        <a href='#Login' className= "switch">Log in</a>
                    </div>
                </Col>
            </Row>

        </Container>
        </Modal>
  )
}

export default Signup