import React, { useState,useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';  // Importation de la bibliothèque Axios pour effectuer des requêtes HTTP
import {IoMdClose} from 'react-icons/io'
import {LiaFileVideoSolid} from 'react-icons/lia';
import { Form } from 'react-bootstrap';
import { MdOutlineCloudUpload } from 'react-icons/md';
import {BsCloudUpload} from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';

import './UploadFile.css'
const UploadFile = () => {
  // Utilisation de l'état local pour gérer les données du composant
  const [selectedFile, setSelectedFile] = useState(null);  // État pour stocker le fichier sélectionné
  const [uploadPercentage, setUploadPercentage] = useState(0);  // État pour la progression du téléchargement
  const [uploadFinished, setUploadFinished] = useState(false);  // État pour indiquer si le téléchargement est terminé
  // const [videoUrl, setVideoUrl] = useState('');

  // Gestionnaire d'événement pour le changement de fichier
  const handleFileChange = (event) => {
    // event.preventDefault(); // Empêcher le comportement par défaut de l'événement (éviter le téléchargement du fichier dans le navigateur)
    setUploadFinished(false);  // Réinitialise le statut de téléchargement terminé
    setUploadPercentage(0);
    setSelectedFile(event.target.files[0]);  // Met à jour l'état avec le fichier sélectionné par l'utilisateur
    
  };

  

  // Gestionnaire d'événement pour le téléchargement
  // const handleUpload = () => {
  //   const formData = new FormData();  // Crée un objet FormData pour envoyer le fichier

  //   formData.append('file', selectedFile);  // Ajoute le fichier au FormData avec la clé 'file'
  //   setSelectedFile(null);  // pour éviter qu'après uploading video et en cliquant sur btn il ne fait pas le téléchargement de meme video d'autres fois.
  //   // Envoie une requête POST à l'URL 'http://localhost:3001/upload' avec le FormData
  //   axios.post('http://localhost:3001/upload', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'  // Définit le type de contenu de la requête
  //     },
  //     onUploadProgress: (progressEvent) => {
  //       const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //       setUploadPercentage(percentCompleted);  // Met à jour la progression du téléchargement
  //     }
  //   })
  //   .then(response => {
  //       console.log(response.data);
  //       setUploadFinished(true);
  //     })
      
  //   .catch(error => {
  //     console.error(error);  // Gère les erreurs en affichant un message d'erreur dans la console
  //   });
  // };

  
  // const onDrop = (acceptedFiles) => {
  //   setSelectedFile(acceptedFiles[0]);
  // };

  const handleUpload = async (event) => {
    if(selectedFile === null){
      // toast.success('Your changes have been successfully saved!', {
      //   position: 'bottom-center',
      //   autoClose: 3000, // La notification se fermera automatiquement après 3 secondes
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      // });
    }
    else{
      event.preventDefault();
      const formData = new FormData();
      formData.append('file', selectedFile);
      // setVideoUrl(selectedFile);
      setSelectedFile(null);

      axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadPercentage(percentCompleted);
        }
      })
      .then(response => {
        console.log(response.data);
        setUploadFinished(true);
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while uploading the file. Please try again.');
      });
    }
  };

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  //   maxFiles: 1,
  //   accept: 'video/*'
  // });
  
  // const onDrop = useCallback((acceptedFiles) => {
  //   const selectedFile = acceptedFiles[0];
  //   const formData = new FormData();
  //   formData.append('file', selectedFile);

  //   try {
  //     const response =axios.post('http://localhost:3001/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       onUploadProgress: (progressEvent) => {
  //         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //         setUploadPercentage(percentCompleted);
  //       },
  //     });

  //     console.log(response.data);
  //     setUploadFinished(true);
  //   } catch (error) {
  //     console.error(error);
  //     alert('An error occurred while uploading the file. Please try again.');
  //   }
  // }, []);

  // const { getRootProps, getInputProps } = useDropzone({
  //   // onDrop,
  //   maxFiles: 1,
  //   accept: 'video/*',
  // });

  return (
    <div className='upload-container w-100 d-flex flex-column justify-content-center align-items-center p-4'>
      {/* Champ de sélection de fichier avec gestionnaire d'événement onChange */}
        <div className='w-100 d-flex flex-column align-items-center justify-content-center gap-3'>
            <div className='cadre d-flex flex-column align-items-center justify-content-center gap-2'>
                {/* <input type="text" className='w-100 p-1' placeholder='Paste a video URL https://www.youtube.com/watch?v=abcdef12345'/> */}
                {/* <div className='text-center'><span>or</span></div>  */}
                <Form style={{fontSize:'min(6vw,14px)'}} className='w-100 d-flex flex-column align-items-center gap-2 pt-2' >
                  <Form.Control type="text" placeholder='Paste a video URL https://www.youtube.com/watch?v=abcdef12345' style={{width:'90%',maxWidth:'500px',backgroundColor:'rgba(255,255,255,0.8)',fontSize:'min(6vw,14px)'}}/>
                  <div className='text-center'><span>or</span></div> 
                  <Form.Group controlId="formFile" className="d-flex flex-column">
                    <Form.Label className="custom-file-upload d-flex flex-column justify-content-center align-items-center" style={{fontSize:'min(6vw,14px)'}}>
                      <BsCloudUpload size='min(60px,20vw)' color='var(--green)' className='upload-animate-icon'/>
                      <div className='d-flex flex-column justify-content-center align-items-center gap-1'>
                        <span className='text-white'>Drag & drop to upload</span>
                        <span >or browse</span>
                      </div>
                    </Form.Label>
                    <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    accept="video/*" 
                    style={{ display: 'none' }} // Cachez le champ de fichier réel
                    />
                  </Form.Group>
                </Form>

                {/* <form onSubmit={handleUpload}>
                <div {...getRootProps()} className="d-flex flex-column">
                <input {...getInputProps()} />
                <div className="custom-file-upload d-flex justify-content-center align-items-center gap-2 position-relative"  style={{height:'200px'}} >Drag and drop your images here.
                  <MdOutlineCloudUpload size='min(40px,20vw)' color='var(--green)'/>
                  {videoUrl && (
                    <div className="w-100 h-100 position-absolute">
                      <video controls>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
              </div>
              <button type='onSubmit' className='green-btn my-2 upload-btn'>Upload</button>

                </form> */}
                
                {/* Condition pour afficher la barre de progression pendant le téléchargement */}
                {uploadPercentage > 0 && !uploadFinished && (
                        <div className='w-100  d-flex flex-column align-items-center'>
                        <div>Progression: {uploadPercentage}%</div>
                        {/* Élément <progress> pour afficher la progression */}
                        <progress value={uploadPercentage} max="100" style={{backgroundColor:'var(--green)',width:'100%'}} />
                        </div>
                    )}

                {/* Condition pour afficher un message lorsque le téléchargement est terminé */}
                {uploadFinished && (
                    <div className='w-100  d-flex flex-column align-items-center py-0 '>
                    <span>Video uploaded successfully ✅ </span>
                    {/* <span>It is being processed !</span> */}
                    </div>
                )}
            </div>
            <div className='w-100 d-flex flex-column align-items-center justify-content-between flex-md-row' style={{maxWidth:'700px'}}>
              <span style={{color:'rgba(255,255,255,0.6)',fontSize:'min(11px,7vw)',display:'block',marginTop:'-5px'}}>Files supported: MP4 , AVI , KVM ,MOV ,MPEG </span>
              <button onClick={handleUpload} className='green-btn my-2 upload-btn'>Upload</button>
            </div>
        </div>
        <ToastContainer/>
    </div>
  );
};

// Exporte le composant FileUpload pour être utilisé ailleurs
export default UploadFile;


// const [uploadedVideo, setUploadedVideo] = useState(null);


// .then(response => {
//     setUploadedVideo({
//       name: selectedFile.name,
//       url: `http://localhost:3001/uploads/${selectedFile.name}`
//     });
//     setUploadFinished(true);
//   })

{/* {uploadedVideo && (
  <div>
    <div className='d-flex justify-content-between' style={{backgroundColor:'blue',width:'300px',height:'50px'}}>
      <div className='d-flex justify-content-center align-items-center gap-2'>
        <LiaFileVideoSolid size={24} /> 
        <span>{uploadedVideo.name}</span>
      </div>
      <IoMdClose size={20} onClick={() =>{ setUploadedVideo(null);setSelectedFile(null)}}/>  
    </div>
  </div>
)} */}