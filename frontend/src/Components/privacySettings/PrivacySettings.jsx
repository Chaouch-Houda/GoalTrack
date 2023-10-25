
import React, { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RenderInput from '../signup/RenderInput';
import { useForm } from 'react-hook-form';
import {Eye, EyeSlash} from 'phosphor-react';
import './PrivacySettings.css';
import '../profile/Profile.css'
import '../notificationsSettings/NotificationsSettings.css';
import { ToastContainer, toast } from 'react-toastify';

function PrivacySettings() {
  const privacyTab = [
    {title:'Privacy and Content Settings'},
    { setting: 'Profile Visibility Settings', explanation: 'Manage the visibility of your profile.', selectOptions: ['Public', 'Friends only', 'Private'] },
    { setting: 'Data Sharing Settings', explanation: 'Allow sharing your data with our partners' },
    { setting: 'Subscriber-Only Content', explanation: 'Access exclusive content reserved for subscribers.' },
    { setting: 'Geolocation Consent', explanation: 'Allow the use of geolocation data for personalized content.' },
    { setting: 'Language Preference', explanation: 'Select your preferred language for the site.', selectOptions: ['English', 'Français', 'Española', 'Deutsch', 'العربية'] },
    { setting: 'Content Sharing', explanation: 'Enable sharing content on social media.' },
    { setting: 'Advertising Preferences', explanation: 'Customize the ads you want to see.', selectOptions: ['General ads', 'Interest-based ads', 'Local ads', 'No ads'] },
    {title:'Payment and Security Settings'},
    {setting:'Credit Card Number',explanation:'Enter your credit card number.',numberInput:true},
    {setting:'Auto Renewal',explanation:'Enablethe automatic renewal of your subscription.'},
    {setting:'Password Change Required',explanation:'Require a password change at the next login.'},
    {setting:'Two-Factor Authentication',explanation:'Protect your account with two-factor authentication. '},
    {setting:'Password Manager',explanation:'Use a password manager to secure your profile.'},
    {setting:'Account Recovery Email',explanation:'Set up an email address for account recovery.',emailInput:true},
    {setting:'PIN Code',explanation:'Create a personal identification number (PIN) for added security.',passwordInput:true},
    {title:'Privacy and Content Settings'},
    {setting:'Video Streaming Quality',explanation:'Select your preferred video streaming quality.',selectOptions:['Standard quality','High quality','Data saver']},
    {setting:'Subtitle Preferences',explanation:'Display subtitles on videos.'},
    {setting:'Viewing History',explanation:'Enable the retention of your viewing history. '},
    {setting:'Autoplay Videos',explanation:'Enable autoplay for videos.'},
    {setting:'Content Download Preferences',explanation:'Choose whether to allow content downloads.'},
    {setting:'Parental Controls',explanation:''},
  ];

  const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange"}); 

  const [selectedOptions, setSelectedOptions] = useState({});
  const handleSelectChange = (index, selectedValue) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [index]: selectedValue,
    }));
  };

  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false); 
  return (
    <div className='settingsPrivacy'>
      <h1>Privacy Settings</h1>
      <Table className='table-notif'>
        <tbody>
          {privacyTab.map((item, index) => (
            item.title ? <tr key={index}><td><h6>{item.title}</h6></td></tr> :
            <tr key={index}>
              <td>
                <div>
                  <span>{item.setting}</span>
                  <span>{item.explanation}</span>
                </div>
              </td>
              <td>
                {item.selectOptions ? (
                  <Form.Select
                    value={selectedOptions[index] || ''}
                    onChange={(e) => handleSelectChange(index, e.target.value)}
                    className='input-p'
                  >
                    <option value=''>{item.selectOptions[0]}</option>
                    {item.selectOptions.slice(1).map((option, i) => (
                      <option value={option} key={i} className="">
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                ): item.numberInput ? (
                  <RenderInput name="credit card number" label="" type="text" placeholder= "e.g., 4111 1111 1111 1111" inputClasses='input-p' control={control} errors={errors} 
                  rules={{
                  // required: 'This field is required',
                  pattern: {
                      value:/^4[0-9]{12}(?:[0-9]{3})?$|^5[1-5][0-9]{14}$|^3[47][0-9]{13}$|^3(?:0[0-5]|[68][0-9])[0-9]{11}$|^6(?:011|5[0-9]{2})[0-9]{12}$|^(?:2131|1800|35\d{3})\d{11}$/i,
                    //  Visa|MasterCard|American Express|Diners Club|Discover|JCB
                      message: 'credit card invalide',
                  }
                  }}
                  />
                ): item.emailInput ?(
                  <RenderInput name="email" label="" type="email" placeholder= "houdachaouch05@gmail.com" inputClasses='input-p' control={control} errors={errors} 
                  rules={{
                  // required: 'This field is required',
                  pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Adresse e-mail invalide',
                  }
                  }}
                  />
                ): item.passwordInput ? (
                  <div className='input-p position-relative'>
                    <RenderInput name="PIN Code" label="" type={showPassword? "text": "password"}  placeholder= "****" inputClasses='input-p' control={control} errors={errors} 
                                            rules={{
                                                pattern: {
                                                    value: /^\d{4}$/,
                                                    message: 'PIN Code must contain four chiffres',
                                                },
                                            }}
                    />
                    <span style={{position:"absolute",right:"3%",top:'20%',cursor:"pointer",color:'black'}}  onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeSlash />: <Eye/>}</span>
                  </div>
                ):(
                  <Form.Check
                    type='checkbox'
                    checked={selectedOptions[index]}
                    onChange={() => handleSelectChange(index, !selectedOptions[index])}
                    className='d-flex align-items-center justify-content-start custom-checkbox '
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className='d-flex justify-content-end gap-3 mt-5' style={{ maxWidth: '745px' }}>
        <Button className='transparent-g-btn cancel-btn text-capitalize'>
          <Link to='/connected'>cancel</Link>
        </Button>
        <Button type='submit' className='green-btn text-capitalize' 
            onClick={() => { toast.success('Your changes have been successfully saved!', {
            position: 'top-right',
            autoClose: 3000, // La notification se fermera automatiquement après 3 secondes
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }); 
        }}>
          save
        </Button>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default PrivacySettings;