 import React, {useState } from 'react'
import {X,InstagramLogo,FacebookLogo,LinkedinLogo,GoogleLogo,Eye,EyeSlash, User, Lock,EnvelopeSimple } from 'phosphor-react'
import { Form, Button} from "react-bootstrap";
import "./Signup.css";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from "axios"
import RenderInput from './RenderInput';
import {useForm,Controller} from "react-hook-form"
/*useForm : simplicité : encapsule toute la logique complexe de gestion des formulaires dans un seul hook
         gestion de l'état et des valeurs : gère automatiquement l'état des champs de formulaire, y compris leur valeur actuelle. Il suit également l'état de validation du formulaire, ce qui facilite la détection et la gestion des erreurs de validation.
         validation facilité : Il fournit un mécanisme robuste et flexible pour la validation des champs de formulaire. Vous pouvez définir des règles de validation telles que la nécessité, le formatage, les longueurs minimales/maximales, etc.
         Optimisation des Rendus : react-hook-form est conçu pour minimiser les rendus inutiles et les mises à jour du DOM, ce qui peut améliorer les performances de votre application.
         Intégration avec les Composants Contrôlés(input, select, textarea, etc.)
         Collecte Facilitée de Données
         Personnalisation des Erreurs
*/
/* Controller :
    il enveloppe un composant de formulaire standard (comme input, select, textarea, etc.)
    Controller se connecte avec le système de gestion de formulaire de react-hook-form, permettant ainsi d'effectuer des validations, de gérer les erreurs et de collecter les données du formulaire.
    Chaque champ que vous souhaitez inclure dans data doit être correctement enregistré avec Controller parce que Controller est un composant fourni par react-hook-form qui permet de lier un champ de formulaire à l'état géré par useForm.
    il est important de s'assurer que le name attribué à chaque champ du formulaire correspond au nom de la propriété que vous attendez dans l'objet data lors de la soumission du formulaire.
    value et defaultValue : Si vous utilisez value ou defaultValue sur un champ de formulaire, assurez-vous que ces valeurs sont correctement initialisées. 
    defaultValue : doit être utilisé pour les champs non contrôlés 
    et value : pour les champs contrôlés.
*/   

    //  Vérifie si l'adresse e-mail existe déjà.   
    export const  checkEmailExists = async (email)=>{ //  Ce requête ne sera envoyée qu'après avoir d'abord vérifié les règles (syntaxe, etc.), évitant ainsi une surcharge du serveur.
        try{
            const res = await axios.get(`http://localhost:3100/checkEmail?email=${email}`);
            // console.log(res.data.emailExists)
            return res.data.emailExists;
        }catch (error) {
            console.error("Error while checking the existence of the email in the DB :", error);
        }
    }; 
    
    const Signup = () => {
   // State variable to track password visibility
   const [showPassword, setShowPassword] = useState(false); 

    const { control, handleSubmit, formState: { errors } } = useForm({mode: "onChange"}); // use mode to specify the event that triggers each input field 
    const navigate = useNavigate();
    //Submitting action
    const handleSignup = async (data) => {
        try {
          // Effectuer la requête POST vers le serveur avec Axios
          const response = await axios.post("http://localhost:3100/signup", data);
        //   console.log(response.data);
          if(response.status === 201) navigate('/login');
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
                        
                        <form onSubmit={handleSubmit(handleSignup)} className='form-signup'>
                            <div className='input-signup'>
                                <span><User/></span>
                                <RenderInput name="firstName" label="" type="text" placeholder= "First Name" defaultValue="" inputClasses='input-ls' control={control} errors={errors} 
                                    rules={{
                                        required: 'This field is required',
                                        maxLength: {
                                            value: 20, // Longueur maximale de 20 caractères
                                            message: 'the maximum length of first name is 20 characters',
                                        },
                                        pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message:'First name invalide',
                                        },
                                    }}
                                />
                            </div>
                            <div className='input-signup'>
                                <span><User/></span>
                                <RenderInput name="lastName" label="" type="text" placeholder= "Last Name" defaultValue="" inputClasses='input-ls' control={control} errors={errors} 
                                    rules={{
                                        required: 'This field is required',
                                        maxLength: {
                                            value: 20, // Longueur maximale de 20 caractères
                                            message: 'the maximum length of last name is 20 characters',
                                        },
                                        pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: 'First name invalide',
                                        },
                                    }}
                                />
                            </div>
                            <div className='input-signup'>
                                <span><EnvelopeSimple/></span>
                                <RenderInput name="email" label="" type="email" placeholder= "Email" defaultValue="" inputClasses='input-ls' control={control} errors={errors} 
                                    rules={{
                                    required: 'This field is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Adresse e-mail invalide',
                                    },
                                    validate: async (value) => {
                                        const emailExists = await checkEmailExists(value);
                                        if (emailExists) {
                                          return "Try an other email !";
                                        }
                                        // return true;
                                      },
                                    }}
                                />
                            </div>
                            
                            <div className='input-signup'>  
                                <span><Lock/></span>
                                <RenderInput name="password" label="" type={showPassword? "text": "password"} defaultValue="" placeholder= "Password" inputClasses='input-ls' control={control} errors={errors} 
                                    rules={{
                                        required: 'This field is required',
                                        minLength: {
                                            value: 6, // Longueur minimale de 8 caractères
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
                        </form>
                        
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