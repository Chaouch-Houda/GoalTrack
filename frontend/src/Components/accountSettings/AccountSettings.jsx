import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import RenderInput from '../signup/RenderInput';
import './AccountSettings.css';
import {Eye, EyeSlash, Image} from 'phosphor-react';
import { Link } from 'react-router-dom';
import { countries } from 'countries-list';
import {ToastContainer, toast} from 'react-toastify'
import { AuthContext } from '../../pages/userDashboard/AuthContext';
import axios from 'axios';

const AccountSettings = () => {

  //for creating a Country Select Component
  // const countryOptions = Object.keys(countries).map(countryCode => 
  //   ({
  //   value: countries[countryCode].name,
  //   label: countries[countryCode].name,
  // })
  // );
  const countryOptions = Object.keys(countries).map(countryCode => countries[countryCode].name);

    
  const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange"}); 
  // const {updateFormData} = useContext(ProfileContext);
  // const handleProfileSubmit = async (data) =>{
  //   updateFormData({ ...data, photo: imageSrc });// Mettre à jour les données du formulaire dans le contexte
  //   console.log(data);
  //   toast.success('Your changes have been successfully saved!', {
  //   position: 'bottom-center',
  //   autoClose: 3000, // La notification se fermera automatiquement après 3 secondes
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  // });
  // }


// dans la form , tous les inputs doivent avoir l'attribut name = meme name dans la base.par exp, pour l'input first name doit avoir l'attribut name= 'firstName'.
//pour qu'il, dans submit function,peut attribuer les valeurs de l'input correctement depuis le paramètre data.
 
// State variable to track password visibility
const [showPassword, setShowPassword] = useState(false); 

const {user,setUser}= useContext(AuthContext);

  const [imgUrl, setImgUrl] = useState(user.photo); // imgUrl pour stocker le chemin sous forme de Data URI faite par FileReader pour l'afficher dans le front puisque les chemins réels ne sont pas autorisés
  const [imgSrc, setImgSrc] = useState(null); //imgSrc pour stocker le chemin réel (chemin sur la machine physique) de photo de profile (e.target.files[0]) 

// const onSubmit = async (data) => {
//   // const token = localStorage.getItem('token');
//   console.log(data); 
//   // updateFormData({ ...data, photo: imageSrc });// Mettre à jour les données du formulaire dans le contexte
  
//   try{
//     const token = localStorage.getItem('token'); // Récupérer le token du localStorage
//       console.log('token'+token)
//     //  const response = await axios.put('http://localhost:3100/updateData', data, {
//     //     headers: {
//     //       authorization: `Bearer ${token}`, // Ajouter le token à l'en-tête
//     //     },
//     //   });
//     const response = await axios.put('http://localhost:3100/updateData', data);
//       if(response.status === 200) {
//         localStorage.setItem('userData',JSON.stringify(data));
//         const updatedData = JSON.parse( localStorage.getItem('userData'));
//         setUser(updatedData);
//         toast.success('Your changes have been successfully saved!', {
//             position: 'top-right',
//             autoClose: 3000, // La notification se fermera automatiquement après 3 secondes
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           });
//           console.log('user'+ user)
//       }
//   }catch{

//   }
// };

const onSubmit = async (data) => {
  console.log('data:  '+ data); 
  //FormData est un objet JavaScript qui permet de créer un ensemble de paires clé-valeur, similaire à ce que vous pourriez envoyer via un formulaire HTML.
  //Il est particulièrement utile lors de l'envoi de données à un serveur via une requête HTTP, notamment lorsqu'il s'agit de télécharger des fichiers ou d'envoyer des données complexes.
  const formData = new FormData();
  formData.append('photo',imgSrc); // on va envoyer dans la req de updateImage le chemin réel de l'image (e.target.files[0]) 
   // Afficher le contenu de formData
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  try{
    const res = await axios.post('http://localhost:3100/updateImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }})
    console.log(res.data.message);
    if(res.status === 200){  // si l'enregistrement de l'image dans le serveur est faite avec succés en peut poursuire updateData
      data.photo = res.data.photo; // le chemin de photo de profile (qui va etre enregistré dans la BD) doit etre son chemin dans le dossier "uploads/images" pourqu'on peut le recupérer après de plus l'utilisation de son chemin réel (sur votre machine) n'est pas sécurié et les navigateurs ne l'autorise pas.
      const response = await axios.put('http://localhost:3100/updateData', data);
      if(response.status === 200) {
        localStorage.setItem('userData',JSON.stringify(data));
        toast.success('Your changes have been successfully saved!', {
          position: 'top-right',
          autoClose: 3000, // La notification se fermera automatiquement après 3 secondes
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        const updatedData = JSON.parse(localStorage.getItem('userData'));
        setUser(updatedData);
        console.log('updatedData: '+ updatedData)
        console.log('user : '+user)
        console.log('updatedData.photo: '+ user.photo)
        // setImgUrl(updatedData.photo); //tant que l'utilisateur est connecté l'image doit etre affiché le chemin est récupiré depuis localStorage

        }
        else{
          console.error("Error in updateData")
        }
    }
  }catch (error) {
    console.log('Error in updateData :', error.message);
  }
};

console.log('imgUrl '+imgUrl);
  return (
    <div className='accountSettings'>
      <div className='light'></div>
      <h1 className='mb-3'>Account</h1>
      <div>
          <h6>Profile</h6>
          <span style={{fontSize:"0.7rem",color:'rgba(255,255,255,0.7)'}}>Keep your personal details private. Information you add here is visible to any who can view your profile.</span>
      </div>
      <Form className='form-ac' onSubmit={handleSubmit(onSubmit)}>
        <div className='d-flex justify-content-center gap-2 flex-column mt-2 input-ac bg-transparent'>
            <span className=''>Photo</span>
            {/* <div  className='w-100 d-flex justify-content-evenly flex-column'> */}
              {/* <div className='img-ac'> */}
              
            <Controller
              name="photo"
              control={control}
              rules={{
                // required:'This field is required',
              }}
              defaultValue={user.photo}
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
                        name='photo'
                        accept="image/png, image/jpeg, image/bmp"
                        // required='Photo field is required'
                        onChange={(e) => {
                          // Récupérer le fichier sélectionné par l'utilisateur
                          const file = e.target.files[0];
                          setImgSrc(file)
                          //file est simplement un objet de fichier brut, et non une URL que vous pouvez afficher dans votre interface utilisateur.
                          // Le processus avec FileReader est nécessaire pour lire le contenu du fichier et le convertir en une URL utilisable.
                          // Créer une nouvelle instance de FileReader
                          const reader = new FileReader();
                          // Définir une fonction de rappel pour le chargement du fichier
                          reader.onload = (e) => {
                          // Récupérer l'URL de l'image sous forme de Data URI
                          const imageUrl = e.target.result;
                          // console.log('img link'+imageUrl)
                          setImgUrl(imageUrl);
                          }
                          // Lire le contenu du fichier en tant que Data URI
                          reader.readAsDataURL(file);
                        }}
                        // onChange={(e)=> 
                        //   {
                        //     const file =e.target.files[0];
                        //      setSrc(file)}}
                        className='w-100 h-100 opacity-0 position-absolute' style={{cursor:'pointer'}}
                      />
                      <div className='w-100 h-100'>
                        {imgUrl && <img src={imgUrl} alt='profile' style={{width:'100%',height:'100%',objectFit:'cover'}}/>}
                      </div>
                    </div>
                  </Form.Group>
                  <h5 style={{color:'var(--green)'}}>{user.firstName} {user.lastName}</h5>
                  {/* {errors.photo &&
                    <Form.Text className="text-danger" style={{position:"absolute",bottom:"-10px",left:"0",textAlign:"start",width:"100%",fontSize:"min(12px,4vw)"}}>
                       {errors.photo.message}
                    </Form.Text>
                  } */}
                </div>
              )}
            />
                
              {/* </div> */}
              {/* <RenderInput name="Photo" label="" type="file" placeholder= "Photo" inputClasses='bg-transparent text-white' control={control} errors={errors} 
              // rules={{onchange:{handleInputChange},}}
              /> */}
            {/* </div> */}

          </div>
          <div className={`block-ac` }>
          
          <RenderInput name="firstName" label="First name" type="text" placeholder= "" defaultValue={user.firstName} inputClasses='input-ac' control={control} errors={errors} 
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
          <RenderInput name="lastName" label="Last name" type="text" placeholder= "" defaultValue={user.lastName} inputClasses='input-ac ' control={control} errors={errors} 
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
          <RenderInput name="email" label="Email" type="email" placeholder= "" defaultValue={user.email} inputClasses='input-ac' control={control} errors={errors} 
                                    rules={{
                                    required: 'This field is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Adresse e-mail invalide',
                                    }
                                    }}
          />
          <div className='input-pwd'>
            <RenderInput name="password" label="Password" type={showPassword? "text": "password"}  placeholder= "***********" defaultValue='' inputClasses='input-ac ' control={control} errors={errors} 
                                    rules={{
                                        required: 'Please enter your current password to confirm the changes',
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
        defaultValue={user.about}
        render={({ field }) => (
          <Form.Group controlId="message">
            <Form.Label style={{paddingLeft:"0.7rem"}}>About</Form.Label>
            <Form.Control
              {...field}
              as="textarea"
              name='about'
              rows={3}
              placeholder='Brief description for your profile'
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
              defaultValue={user.country}
              control={control}
              rules={{
                // required:'This field is required',
              }}
              render={({ field }) => (
                <div className='position-relative'>
                  <Form.Group className='input-ac input-country'>
                    <Form.Label className='label'>Country</Form.Label>
                      <Form.Control as="select" {...field}>
                        {countryOptions.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </Form.Control>
                  </Form.Group>
                  {errors.country &&
                    <Form.Text className="text-danger" style={{position:"absolute",bottom:"-20px",left:"0",textAlign:"start",width:"100%",fontSize:"min(12px,4vw)"}}>
                      {errors.country.message}
                    </Form.Text>
                  }
                </div>
              )}
              />
            <RenderInput name="phone" label="Phone number" type="tel" placeholder= "" defaultValue={user.phone} inputClasses='input-ac' control={control} errors={errors} 
            rules={{
            // required: 'This field is required',
            pattern: {
                // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Phone number invalide',
            }
            }}
            />
            <RenderInput name="birthdate" label="Birthdate" type="date" placeholder= "" defaultValue={user.birthdate} inputClasses='input-ac' control={control} errors={errors} 
            rules={{
            // required: 'This field is required',
            // pattern: {
            //   value: /\d{2}-\d{2}-\d{4}/,
            //   message: 'Please enter a valid date (JJ-MM-AAAA)'
            // }
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
                defaultValue={user.birthdate}
            />
          </Form.Group> */}

          <Controller
            name="gender"
            control={control}
            defaultValue={user.gender}
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
                      { ...field }
                      value="male"
                      defaultChecked={user.gender === 'male'}
                      // onChange={() => setGender('male')} // Mettez à jour gender ici 
                      className="custom-radio"
                    />
                    <Form.Check
                      type="radio"
                      label="Female"
                      { ...field }
                      value="female"
                      defaultChecked={user.gender === 'female'}
                      // onChange={() => setGender('female')} // Mettez à jour gender ici
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
                <span>Desactivate account </span>
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