import React, {useContext, useEffect, useState } from 'react';
import {X,InstagramLogo,FacebookLogo,LinkedinLogo,GoogleLogo, User, Lock, Eye, EyeSlash} from 'phosphor-react';
import {Button,Form} from "react-bootstrap";
import "../signup/Signup.css";
import { useForm } from 'react-hook-form';
import RenderInput from '../signup/RenderInput';
import axios from 'axios';
import { Link, NavLink,useNavigate} from 'react-router-dom';
import { AuthContext } from '../../pages/userDashboard/AuthContext';

const Login = (props) =>{
    // State variable to track password visibility
   const [showPassword, setShowPassword] = useState(false); 

    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange"}); 
   
    // axios.defaults.withCredentials = true ;
    const navigate = useNavigate();
    const {setUser,user} = useContext(AuthContext);

    const handleLogin = async (data) => {
        try {
            const response = await axios.post("http://localhost:3100/login", data);
            // console.log(response.data);
            // Si l'authentification réussit, rediriger vers la route /connected
            if (response.status === 200)
            {   navigate('/connected');
                // const token = response.data.token;
                // localStorage.setItem('token', token);
                // localStorage.setItem('user',response.data.userData)
                // put the user data in the status user

                // Stocker le token dans localStorage
                localStorage.setItem('token', response.data.token);
                // Stocker les informations de l'utilisateur dans localStorage
                localStorage.setItem('userData', JSON.stringify(response.data.userData));
                const savedUserData = JSON.parse(await localStorage.getItem('userData'));
                setUser(savedUserData); //sinon user=null
            } 
        }catch (err) {
            console.error(err);
            alert("Check your informations, email or password is incorrect !")
        }
    };
  useEffect(()=>{
    console.log('user:'+ user);
  },[user])
  return (
    <div className="custom-overlay d-flex justify-content-center align-items-center p-3">
        <div className='signup-container'>
            <div className='d-flex justify-content-end'>
                <NavLink to='/'><X width="24px" height={"24px"} color='rgba(255,255,255,0.5)' cursor={"pointer"} /></NavLink>
            </div>
            <div className=' text-white text-center'>
                    <h1 className='fs-1 font1 text-light'>log in</h1>
                    <span className='fs-6'>Welcome Back!</span>
                    <Form onSubmit={handleSubmit(handleLogin)} className='form-signup'>
                        <div className='input-signup'>
                            <span><User/></span>
                            <RenderInput name="email" label="" type="email" placeholder= "Email" defaultValue="" inputClasses='input-ls' control={control} errors={errors} 
                                rules={{
                                required: 'This field is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Adresse e-mail invalide',
                                },
                                }}
                            />
                        </div>
                        
                        <div className='input-signup'>  
                            <span><Lock/></span>
                            <RenderInput name="password" label="" type={showPassword? "text": "password"}  placeholder= "Password" defaultValue="" inputClasses='input-ls' control={control} errors={errors} 
                                rules={{
                                    required: 'This field is required',
                                    minLength: {
                                        value: 8, // Longueur minimale de 8 caractères
                                        message: 'Password must be at least 8 characters long',
                                    },
                                    maxLength: {
                                        value: 20, // Longueur maximale de 20 caractères
                                        message: ' the maximum length of password is 20 characters',
                                    },
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                        message: 'Password must contain : lowercase letter(s), uppercase letter(s),digit(s) and special character(s)',
                                    },
                                    // validate: async (value) => {
                                    //     const emailExists = await checkEmailExists(value);
                                    //     if (!emailExists) {
                                    //       return "Check your informations!";
                                    //     }
                                    //     // return true;
                                    //   },
                                }}
                                />
                            <span style={{position:"absolute",right:"10px",cursor:"pointer"}}  onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeSlash />: <Eye/>}</span>
                        </div>

                        <div className='d-flex gap-2 align-center' style={{width:"87%",marginTop:"1rem"}}>
                            <div>
                                {/* // !checked ? (<Square onClick={()=>handleChecked()} color='var(--green)' cursor={"pointer"}/>):
                                // (<CheckSquare onClick={()=>handleChecked()} color='var(--green)' cursor={"pointer"}/>) */}
                                <Form.Check type='checkbox' className="input-checkbox"/>
                            </div>
                            <div className='d-flex justify-content-between' style={{fontSize:"min(12px,4vw)",paddingTop:"2px",width: "-webkit-fill-available"}}>
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
                        <InstagramLogo className='social-icon'/>
                        <FacebookLogo className='social-icon'/>
                        <LinkedinLogo className='social-icon'/>
                        <GoogleLogo className='social-icon'/>
                    </div>
                    <div>
                        <span className="switch-text" >don't have an account ?</span>
                        <Link to='/signup' className="switch">sign up</Link>
                    </div>
               
            </div>
        </div>
    </div>
  )
}

export default Login