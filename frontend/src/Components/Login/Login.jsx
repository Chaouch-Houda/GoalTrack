import React, {useState } from 'react';
import {X,InstagramLogo,FacebookLogo,LinkedinLogo,GoogleLogo, User, Lock, Eye, EyeSlash} from 'phosphor-react';
import {Button,Form} from "react-bootstrap";
import "../Signup/Signup.css";
import { useForm } from 'react-hook-form';
import RenderInput from '../Signup/RenderInput';
import axios from 'axios';
import { Link, NavLink} from 'react-router-dom';

const Login = (props) =>{
    // State variable to track password visibility
   const [showPassword, setShowPassword] = useState(false); 

   //Vérifier si l'email existe déjà dans la BDD
//    const checkUserExists = async(data)=>{
//         try{
//         const res = await axios.post(`http://localhost:3100/login`,data);
//         console.log("authenticated:"+res.data.authenticated);
//         return res.data.authenticated;
//         }catch (error) {
//             console.error("Error while checking the existence of the user in the DB:", error);
//             return false;
//         }
//     };
    // const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange"}); 
    const OnSubmit = async (data) => {
        try {
            const response = await axios.post(`http://localhost:3100/login`, data);
            if (response.data.authenticated===true) {
                console.log("connection successful !");
                // navigate('/');
                props.history.push('/');
            }
            else {
            console.log("connection failed !");
            }
            console.log(response.data.authenticated);
            }catch (error) {
            console.error(error);
          }
            
            // try {
            //   const res = await axios.post("http://localhost:3100/login", data);
            //   if (res.data.authenticated) {
            //     // L'utilisateur est authentifié avec succès
            //     console.log("Login successful!");
            //   } else {
            //     // L'utilisateur n'existe pas dans la base de données ou le mot de passe est incorrect
            //     console.log("Invalid email or password");
            //   }
            // } catch (error) {
            //   console.error("Error while checking the existence of the user in the DB:", error);
            // }
          };
 
  return (
    <div className="custom-overlay d-flex justify-content-center align-items-center p-3">
        <div className='signup-container'>
            <div className='d-flex justify-content-end'>
                <NavLink to='/'><X width="24px" height={"24px"} color='rgba(255,255,255,0.5)' cursor={"pointer"} /></NavLink>
            </div>
            <div className=' text-white text-center'>
                    <h1 className='fs-1 font1 text-light'>log in</h1>
                    <span className='fs-6'>Welcome Back!</span>
                    <Form onSubmit={handleSubmit(OnSubmit)} className='form-signup'>
                        <div className='input-signup'>
                            <span><User/></span>
                            <RenderInput name="email" label="" type="email" placeholder= "Email" inputClasses='input-ls' control={control} errors={errors} 
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
                            <RenderInput name="password" label="" type={showPassword? "text": "password"}  placeholder= "Password" inputClasses='input-ls' control={control} errors={errors} 
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
                                    // validate: {
                                    //     Available: ({email,password}) => checkUserExists({email,password}) || "The password or the password you entered is incorrect. Please try again or Reset your password",
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