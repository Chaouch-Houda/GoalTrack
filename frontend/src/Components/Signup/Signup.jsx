 import React, {useState } from 'react'
import {X,InstagramLogo,FacebookLogo,LinkedinLogo,GoogleLogo,Eye,EyeSlash, User, Lock } from 'phosphor-react'
import { Form, Button} from "react-bootstrap";
import "./Signup.css";
import { Link, NavLink } from 'react-router-dom';
import {useForm,Controller} from "react-hook-form"
import axios from "axios"
import RenderInput from './RenderInput';

const Signup = () => {
   // State variable to track password visibility
   const [showPassword, setShowPassword] = useState(false); 

   //Vérifier si l'email existe déjà dans la BDD
   const checkEmailExists = async(email)=>{
        try{
            const res = await axios.get(`http://localhost:3100/emails?email=${email}`);
            return res.data;
        }catch (error) {
            console.error("Error while checking the existence of the email in the DB :", error);
            return false;
        }
    };

    const { control, handleSubmit, formState: { errors } } = useForm({mode: "onChange"}); // use mode to specify the event that triggers each input field 
    //Submitting action
    const onSubmit = async (data) => {
        try {
          // Effectuer la requête POST vers le serveur avec Axios
          const response = await axios.post("http://localhost:3100/signup", data);
          console.log(response.data);
        } catch (error) {
          console.error("Error registering user :", error);
        }
      };

    return (
        <div className='custom-overlay d-flex justify-content-center align-items-center p-3'>
            <div className='signup-container'>
                <div className='d-flex justify-content-end'>
                    <NavLink to='/'><X width="24px" height={"24px"} color='rgba(255,255,255,0.5)' cursor={"pointer"} /></NavLink>
                 </div>
                <div className=' text-white text-center'>
                        <h1 className='fs-1 font1 text-light'>sign up</h1>
                        <span className='fs-6'>Welcome to GoalTrack</span>
                        <Form onSubmit={handleSubmit(onSubmit)} className='form-signup'>
                            <div className='input-signup'>
                                <span><User/></span>
                                <RenderInput name="name" label="" type="text" placeholder= "Name" inputClasses='input-ls' control={control} errors={errors} 
                                    rules={{
                                        required: 'This field is required',
                                        maxLength: {
                                            value: 20, // Longueur maximale de 20 caractères
                                            message: 'the maximum length of name is 20 characters',
                                        },
                                        pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: 'Name invalide',
                                        },
                                    }}
                                />
                            </div>
                            <div className='input-signup'>
                                <span><User/></span>
                                <RenderInput name="email" label="" type="email" placeholder= "Email" inputClasses='input-ls' control={control} errors={errors} 
                                    rules={{
                                    required: 'This field is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Adresse e-mail invalide',
                                    },
                                    validate: {
                                        emailAvailable: async (value) => await checkEmailExists(value) || "This email already exists.",
                                    },
                                    }}
                                />
                            </div>
                            
                            <div className='input-signup'>  
                                <span><Lock/></span>
                                <RenderInput name="password" label="" type={showPassword? "text": "password"} placeholder= "Password" inputClasses='input-ls' control={control} errors={errors} 
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
                                    }} 
                                    />
                                <span style={{position:"absolute",right:"10px",cursor:"pointer"}}  onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeSlash />: <Eye/>}</span>
                            
                            </div>

                            {/* Add the checkbox field */}
                            {/* <div className='input-signup d-flex border-0  text-start'>
                                <RenderInput name='terms'type='checkbox'placeholder='' control={control} errors={errors}
                                rules={{required: 'You must agree to the terms and privacy policy',}}
                                />
                            <div className='terms-text'>
                                    <span>By clicking on Sign up, you agree to our </span>
                                    <span>Terms of service </span>
                                    <span>and </span>
                                    <span>Privacy policy</span>
                            </div>   
                            </div> */}
                            
                            {/* Add the checkbox field */}
                            <Controller
                            name="terms"
                            control={control}
                            defaultValue={false}
                            rules={{ required: "You must agree to the terms of service" }}
                            render={({ field }) => ( 
                                <div className='terms'>
                                    <div className='d-flex gap-1 w-100'>
                                        {  <Form.Check
                                            {...field}
                                            type='checkbox'
                                            className="input-checkbox"
                                        />
                                        }
                                        <div className='terms-text'>
                                            <span>By clicking on Sign up, you agree to our </span>
                                            <span>Terms of service </span>
                                            <span>and </span>
                                            <span>Privacy policy</span>
                                        </div>
                                    </div> 
                                    {errors["terms"] &&
                                        <Form.Text className="text-danger" style={{fontSize:"min(12px,4vw)",paddingLeft:"1rem"}}>
                                            {errors["terms"].message}
                                        </Form.Text>
                                    }
                                </div>
                            )}
                            />




                            {/* {renderInput('confirmPassword', 'password', 'Confirm Password', {
                                    required: 'This field is required',
                                    validate: (value) => value === password || 'Passwords do not match', //validate : propriété à l'objet rules.La valeur de validate est une fonction qui prend la valeur actuelle du champ "confirmPassword" en argument.La fonction compare cette valeur avec la valeur du champ "Password" (stockée dans la variable password, qui est obtenue à l'aide de watch('password')). 
                                })} */}

                            {/* <Form.Control type="text" name="name" placeholder="Name"  className='input-ls' onChange={handleChange}  />
                            <Form.Control type="email" name="email" placeholder="Email" className='input-ls' onChange={handleChange}/>
                            <Form.Control type='password' name="password" placeholder="Password" className='input-ls' onChange={handleChange}/>
                            <Form.Control type='password' name="confirm_password" placeholder="Confirm Password" className='input-ls' onChange={handleChange}/>
                            */}

                            {/* <div className='terms d-flex gap-1'>
                                <div>{
                                    checked ? (<CheckSquare onClick={()=>handleChecked()} color='var(--green)' cursor={"pointer"}/>) :
                                    (<Square onClick={()=>handleChecked()} color='var(--green)' cursor={"pointer"}/>)
                                    }
                                </div> 
                                
                                
                                <div className='terms-text'>
                                    <span>By clicking on Sign up, you agree to our </span>
                                    <span>Terms of service </span>
                                    <span>and </span>
                                    <span>Privacy policy</span>
                                </div>
                            </div> */}

                            <Button type="submit" className='btn-form-signup'>Sign Up</Button>
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
                            <span className="switch-text" >Already have an account ?</span>
                            <Link to='/login' className= "switch">Log in</Link>
                        </div>
                    </div>
                </div>
        </div>
  )
}
export default Signup;