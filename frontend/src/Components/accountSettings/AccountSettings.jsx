import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import RenderInput from '../signup/RenderInput';
import './AccountSettings.css';
import {Eye, EyeSlash, Image} from 'phosphor-react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { countries } from 'countries-list';
import { ProfileContext } from '../profile/ProfileContext';
import {ToastContainer, toast} from 'react-toastify'

const AccountSettings = () => {
  //for creating a Country Select Component
  const countryOptions = Object.keys(countries).map(countryCode => ({
    value: countryCode,
    label: countries[countryCode].name,
  }));
  //for the gender Select component
    const [gender, setGender] = useState('');
  
    const handleGenderChange = (event) => {
      setGender(event.target.value);
    };

  const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange"}); 
  const {updateFormData} = useContext(ProfileContext);
  const handleProfileSubmit = async (data) =>{
    updateFormData({ ...data, photo: imageSrc });// Mettre à jour les données du formulaire dans le contexte
    console.log(data);
    toast.success('Your changes have been successfully saved!', {
    position: 'bottom-center',
    autoClose: 3000, // La notification se fermera automatiquement après 3 secondes
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
  }

  const handleInputChange =() =>{

  }

  // const handleProfileSubmit = async (data) =>{
  //   console.log(data);
  // }

  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false); 
  // state variable to handle the About input's content
  // const [aboutMsg, setAboutMsg] = useState('');

  // const handleAboutMsg = (event) => {
  //   setAboutMsg(event.target.value);
  // };
// dans la form , tous les inputs doivent avoir l'attribut name = status name ici.par exp, pour l'input first name doit avoir l'attribut name= 'firstName'.
//pour qu'il, dans submit function,peut attribuer les valeurs de l'input correctement depuis le paramètre data.
const [imageSrc, setImageSrc] = useState(null);  
const onSubmit = (data) => {
  console.log(data);
  updateFormData({ ...data, photo: imageSrc });// Mettre à jour les données du formulaire dans le contexte
  toast.success('Your changes have been successfully saved!', {
    position: 'bottom-center',
    autoClose: 3000, // La notification se fermera automatiquement après 3 secondes
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
  return (
    <div className='accountSettings'>
      <div className='light'></div>
      <h1 className='mb-3'>Account</h1>
      <div>
          <h6>Profile</h6>
          <span style={{fontSize:"0.7rem",color:'rgba(255,255,255,0.7)'}}>Keep your personal details private. Information you add here is visible to any who can view your profile.</span>
      </div>
      <Form className='form-ac' onSubmit={handleSubmit(handleProfileSubmit)}>
        <div className={`block-ac` }>
          <div className='d-flex justify-content-center gap-2 flex-column mt-2 input-ac bg-transparent'>
            <span className=''>Photo</span>
            {/* <div  className='w-100 d-flex justify-content-evenly flex-column'> */}
              {/* <div className='img-ac'> */}
              
            <Controller
              name="photo"
              control={control}
              rules={{
                required:'This field is required',
              }}
              render={({ field }) => (
                <div className='position-relative'>
                 <Form.Group {...field} controlId="photo" className='upload-profile-img position-relative d-flex flex-column m-md-2'>
                    <Form.Label className='profile-img-label position-absolute w-100 d-flex justify-content-center align-items-center '>
                      <div className='d-flex flex-column align-items-center gap-1'>
                        <Image size={24} color="#ffffff" weight="light" />
                        <span>Change photo</span>
                      </div>
                    </Form.Label>
                    <div className='position-relative w-100 h-100 profile-img-input'>
                      <Form.Control
                        
                        type="file"
                        accept="image/png, image/jpeg, image/bmp"
                        // required='Photo field is required'
                        onChange={(e) => {
                          // Récupérer le fichier sélectionné par l'utilisateur
                          const file = e.target.files[0];
                          // Créer une nouvelle instance de FileReader
                          const reader = new FileReader();
                          // Définir une fonction de rappel pour le chargement du fichier
                          reader.onload = (e) => {
                          // Récupérer l'URL de l'image sous forme de Data URI
                          const imageUrl = e.target.result;
                          console.log('img link'+imageUrl)
                            setImageSrc(imageUrl);
                          }
                          // Lire le contenu du fichier en tant que Data URI
                          reader.readAsDataURL(file);
                        }}
                        className='w-100 h-100 opacity-0 position-absolute' style={{cursor:'pointer',backgroundColor:'red'}}
                      />
                      <div className='w-100 h-100'>
                        {imageSrc!== null && <img src={imageSrc} alt='profile' style={{width:'100%',height:'100%',objectFit:'cover'}}/>}
                      </div>
                    </div>
                  </Form.Group>
                  <h5 style={{color:'var(--green)'}}>Houda-chaouch</h5>
                  {errors.photo &&
                    <Form.Text className="text-danger" style={{position:"absolute",bottom:"-10px",left:"0",textAlign:"start",width:"100%",fontSize:"min(12px,4vw)"}}>
                       {errors.photo.message}
                    </Form.Text>
                  }
                </div>
              )}
            />
                
              {/* </div> */}
              {/* <RenderInput name="Photo" label="" type="file" placeholder= "Photo" inputClasses='bg-transparent text-white' control={control} errors={errors} 
              // rules={{onchange:{handleInputChange},}}
              /> */}
              
            {/* </div> */}
          </div>
          <div className='d-flex flex-column justify-content-end'>
            {/* <RenderInput name="userName" label="UserName" type="text" placeholder= "Houda-Chaouch" inputClasses='input-ac ' control={control} errors={errors} 
                                      rules={{
                                          required: 'This field is required',
                                          maxLength: {
                                              value: 20, // Longueur maximale de 20 caractères
                                              message: 'the maximum length of name is 20 characters',
                                          },
                                          pattern: {
                                          value: /^[A-Za-z]+$/,
                                          message: 'Username invalide',
                                          },
                                      }}
              />   */}
          </div>
          <RenderInput name="firstName" label="First name" type="text" placeholder= "houda" defaultValue="" inputClasses='input-ac' control={control} errors={errors} 
                                  rules={{
                                      required: 'This field is required',
                                      maxLength: {
                                          value: 20, // Longueur maximale de 20 caractères
                                          message: 'the maximum length of the first name is 20 characters',
                                      },
                                      pattern: {
                                      value: /^[A-Za-z]+$/,
                                      message: 'First name invalide',
                                      },
                                  }}
          />
          <RenderInput name="lastName" label="Last name" type="text" placeholder= "chaouch" defaultValue="" inputClasses='input-ac ' control={control} errors={errors} 
                                  rules={{
                                      required: 'This field is required',
                                      maxLength: {
                                          value: 20, // Longueur maximale de 20 caractères
                                          message: 'the maximum length of the last name is 20 characters',
                                      },
                                      pattern: {
                                      value: /^[A-Za-z]+$/,
                                      message: 'Last name invalide',
                                      },
                                  }}
          />
          <RenderInput name="email" label="Email" type="email" placeholder= "houdachaouch05@gmail.com" defaultValue="" inputClasses='input-ac' control={control} errors={errors} 
                                    rules={{
                                    required: 'This field is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Adresse e-mail invalide',
                                    }
                                    }}
          />
          <div className='input-pwd'>
            <RenderInput name="password" label="Password" type={showPassword? "text": "password"}  placeholder= "***********" defaultValue="" inputClasses='input-ac ' control={control} errors={errors} 
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
            <span style={{position:"absolute",right:"3%",top:'50%',cursor:"pointer",color:'black'}}  onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeSlash />: <Eye/>}</span>
          </div>
        </div>
        <Controller
        name="about"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Form.Group controlId="message">
            <Form.Label style={{paddingLeft:"0.7rem"}}>About</Form.Label>
            <Form.Control
              {...field}
              as="textarea"
              name='about'
              rows={3}
              // value={aboutMsg}
              placeholder='Brief description for your profile'
              // onChange={handleAboutMsg}
              style={{maxWidth:'700px'}}
            />
          </Form.Group>
          )}
        />
        <div>
          <h6>Personal information</h6>
          
              <div className='block-ac'>
                <Controller
                  name="country"
                  defaultValue=""
                  control={control}
                  rules={{
                    required:'This field is required',
                  }}
                  render={({ field }) => (
                    <div className='position-relative'>
                      <Form.Group className='input-ac input-country'>
                        <Form.Label className='label'>Country</Form.Label>
                        <Select options={countryOptions} {...field} className='text-black'/>
                      </Form.Group>
                      {errors.country &&
                        <Form.Text className="text-danger" style={{position:"absolute",bottom:"-10px",left:"0",textAlign:"start",width:"100%",fontSize:"min(12px,4vw)"}}>
                          {errors.country.message}
                        </Form.Text>
                      }
                    </div>
                  )}
                  />
                <RenderInput name="phone" label="Phone number" type="tel" placeholder= "" defaultValue="" inputClasses='input-ac' control={control} errors={errors} 
                rules={{
                required: 'This field is required',
                pattern: {
                    // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Phone number invalide',
                }
                }}
                />
                <RenderInput name="birthdate" label="Birthdate" type="date" placeholder= "" defaultValue="" inputClasses='input-ac' control={control} errors={errors} 
                rules={{
                required: 'This field is required',
                }}
                />

              {/* <Form.Group>
                <Form.Label className='label'>Birthdate</Form.Label>
                <Form.Control 
                    type="date"
                    name='birthdate'
                    placeholder="Choose"
                    className="input-ac"
                    autoComplete="off"
                    data-lpignore="true"
                />
              </Form.Group> */}
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                rules={{
                  required:'This field is required',
                }}
                render={({ field }) => (
                  <div>
                    <Form.Group>
                      <Form.Label className='label'>Gender</Form.Label>
                      <div className='d-flex align-items-end h-50 gap-5'>
                        <Form.Check
                          type="radio"
                          label="Male"
                          // name="gender"
                          value="male"
                          { ...field }
                          checked={gender === 'male'}
                          onChange={handleGenderChange} 
                          className="custom-radio"
                        />
                        <Form.Check
                          type="radio"
                          label="Female"
                          // name="gender"
                          { ...field }
                          value="female"
                          checked={gender === 'female'}
                          onChange={handleGenderChange}
                          className="custom-radio"
                        />
                      </div>
                    </Form.Group>
                    {errors.gender &&
                        <Form.Text className="text-danger" style={{position:"absolute",bottom:"-10px",left:"0",textAlign:"start",width:"100%",fontSize:"min(12px,4vw)"}}>
                          {errors.gender.message}
                        </Form.Text>
                      }
                  </div>
                )}
              />
              {/* <Form.Group>
                <Form.Label style={{width:'100%',textAlign:'start',paddingLeft:"0.7rem",appearance: 'auto'}}>Language</Form.Label>
                <Form.Control 
                    as="select" 
                    placeholder="Choose"
                    className="input-ac"
                    autoComplete="off"
                    data-lpignore="true"
                >
                <option>Option 1</option>
                <option>Option 2</option>
              </Form.Control>
              </Form.Group> */}
              </div>
        </div>
        <div className='d-flex justify-content-end gap-3 mb-5' style={{maxWidth:'700px'}}>
        <Button className='transparent-g-btn cancel-btn text-capitalize'><Link to="/connected">cancel</Link></Button>
        <Button type="submit" className='green-btn text-capitalize'>save</Button>
        </div>
      </Form>
      <ToastContainer/>
        <div>
          <h6>Deactivation and deletion</h6>
          <div className='text-align-justify d-flex flex-column gap-3'>
            <div className='d-flex justify-content-between align-items-center' style={{maxWidth:'400px'}}>
              <div className='d-flex flex-column gap-1'>
                <span>Deactivate account </span>
                <span style={{fontSize:"0.7rem",maxWidth:'300px',color:'rgba(255,255,255,0.7)'}}>Temporarily hide your profile, Pins and boards.</span>
              </div>
              <Button className='green-btn btn-acc text-capitalize'>Deactivate account</Button>
            </div>
            <div className='d-flex justify-content-between align-items-center' style={{maxWidth:'400px'}}>
              <div className='d-flex flex-column gap-1'>
                <span>Delete your data and account </span>
                <span style={{fontSize:"0.7rem",maxWidth:'250px',color:'rgba(255,255,255,0.7)'}}>Permanently delete your data and everything associated with your account.</span>
              </div>
              <Button className=' green-btn btn-acc text-capitalize'>Delete account</Button>
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default AccountSettings;