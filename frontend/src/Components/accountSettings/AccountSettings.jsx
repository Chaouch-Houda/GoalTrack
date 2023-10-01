import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import RenderInput from '../signup/RenderInput';
import './AccountSettings.css';
import {Eye, EyeSlash} from 'phosphor-react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { countries } from 'countries-list';
import { ProfileContext } from '../profile/ProfileContext';

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
    updateFormData(data);
    console.log(data);
  }
  const handleInputChange =() =>{

  }

  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false); 
  // state variable to handle the About input's content
  const [aboutMsg, setAboutMsg] = useState('');

  const handleAboutMsg = (event) => {
    setAboutMsg(event.target.value);
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
            <div  className='w-100 d-flex justify-content-evenly flex-column'>
              <div className='img-ac'></div>
              <RenderInput name="Photo" label="" type="file" placeholder= "Photo" inputClasses='bg-transparent text-white' control={control} errors={errors} 
              rules={{onchange:{handleInputChange},}}
              />
            </div>
          </div>
          <div className='d-flex flex-column justify-content-end'>
            <RenderInput name="userName" label="Username" type="text" placeholder= "" inputClasses='input-ac ' control={control} errors={errors} 
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
              />  
          </div>
          <RenderInput name="firstName" label="First name" type="text" placeholder= "houda" inputClasses='input-ac' control={control} errors={errors} 
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
          <RenderInput name="lastName" label="Last name" type="text" placeholder= "chaouch" inputClasses='input-ac ' control={control} errors={errors} 
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
          <RenderInput name="email" label="Email" type="email" placeholder= "houdachaouch05@gmail.com" inputClasses='input-ac' control={control} errors={errors} 
                                    rules={{
                                    required: 'This field is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Adresse e-mail invalide',
                                    }
                                    }}
          />
          <div className='input-pwd'>
            <RenderInput name="password" label="Password" type={showPassword? "text": "password"}  placeholder= "***********" inputClasses='input-ac ' control={control} errors={errors} 
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
        <Form.Group controlId="message">
              <Form.Label style={{paddingLeft:"0.7rem"}}>About</Form.Label>
              <Form.Control
                as="textarea"
                name='about'
                rows={3}
                value={aboutMsg}
                placeholder='Brief description for your profile'
                onChange={handleAboutMsg}
                style={{maxWidth:'700px'}}
              />
        </Form.Group>
        <div>
          <h6>Personal information</h6>
          <div className='block-ac'>
            <Form.Group className='input-ac input-country'>
              <Form.Label className='label'>Country</Form.Label>
              <Select options={countryOptions} name='country' className='text-black'/>
            </Form.Group>

            <RenderInput name="phone" label="Phone number" type="tel" placeholder= "" inputClasses='input-ac' control={control} errors={errors} 
            rules={{
            required: 'This field is required',
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Phone number invalide',
            }
            }}
            />

          <Form.Group>
            <Form.Label className='label'>Birthdate</Form.Label>
            <Form.Control 
                type="date"
                name='birthdate'
                placeholder="Choose"
                className="input-ac"
                autoComplete="off"
                data-lpignore="true"
            />
          </Form.Group>

          <Form.Group>
          <Form.Label className='label'>Gender</Form.Label>
          <div className='d-flex align-items-end h-50 gap-5'>
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={handleGenderChange} 
              className="custom-radio"
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={handleGenderChange}
              className="custom-radio"
            />
            </div>
          </Form.Group>
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
        <div className='d-flex justify-content-end gap-3 mt-5' style={{maxWidth:'700px'}}>
        <Button className='transparent-g-btn cancel-btn text-capitalize'><Link to="/connected">cancel</Link></Button>
        <Button type="submit" className='green-btn text-capitalize' onClick={()=>{alert("Your informations was updated")}}>save</Button>
        </div>
      </Form>
    </div>
  )
}

export default AccountSettings;