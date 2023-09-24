import React, { useState } from 'react';
import axios from 'axios';  // Importation de la bibliothèque Axios pour effectuer des requêtes HTTP
import {IoMdClose} from 'react-icons/io'
import {LiaFileVideoSolid} from 'react-icons/lia';
import { Form } from 'react-bootstrap';
import { MdOutlineCloudUpload } from 'react-icons/md';
import './FileUpload.css'
const FileUpload = () => {
  // Utilisation de l'état local pour gérer les données du composant
  const [selectedFile, setSelectedFile] = useState(null);  // État pour stocker le fichier sélectionné
  const [uploadPercentage, setUploadPercentage] = useState(0);  // État pour la progression du téléchargement
  const [uploadFinished, setUploadFinished] = useState(false);  // État pour indiquer si le téléchargement est terminé

  // Gestionnaire d'événement pour le changement de fichier
  const handleFileChange = (event) => {
    setUploadFinished(false);  // Réinitialise le statut de téléchargement terminé
    setUploadPercentage(0);
    setSelectedFile(event.target.files[0]);  // Met à jour l'état avec le fichier sélectionné par l'utilisateur
    
  };

  // Gestionnaire d'événement pour le téléchargement
  const handleUpload = () => {
    const formData = new FormData();  // Crée un objet FormData pour envoyer le fichier

    formData.append('file', selectedFile);  // Ajoute le fichier au FormData avec la clé 'file'
    setSelectedFile(null);  // pour éviter qu'après uploading video et en cliquant sur btn il ne fait pas le téléchargement de meme video d'autres fois.
    // Envoie une requête POST à l'URL 'http://localhost:3001/upload' avec le FormData
    axios.post('http://localhost:3001/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'  // Définit le type de contenu de la requête
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadPercentage(percentCompleted);  // Met à jour la progression du téléchargement
      }
    })
    .then(response => {
        console.log(response.data);
        setUploadFinished(true);
      })
      
    .catch(error => {
      console.error(error);  // Gère les erreurs en affichant un message d'erreur dans la console
    });
  };

  return (
    <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
      {/* Champ de sélection de fichier avec gestionnaire d'événement onChange */}
        <div className='cadre'>
            <div style={{fontSize:'min(6vw,14px)'}} className='d-flex flex-column align-items-center gap-2'>
                <input type="text" className='w-100 p-1' placeholder='Paste a video URL https://www.youtube.com/watch?v=abcdef12345'/>
                <div className='text-center'><span>or</span></div> 
                <Form>
                    <Form.Group controlId="formFile" className="d-flex flex-column">
                        <Form.Label className="custom-file-upload d-flex justify-content-center align-items-center gap-2">
                        Choose File
                        <MdOutlineCloudUpload size='min(40px,20vw)' color='var(--green)'/>
                        </Form.Label>
                        <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        accept="video/*" 
                        style={{ display: 'none' }} // Cachez le champ de fichier réel
                        />
                    </Form.Group>
                    <span style={{color:'rgba(255,255,255,0.6)',fontSize:'min(11px,7vw)',display:'block',marginTop:'-5px'}}>Files supported: MP4 , AVI , KVM ,MOV ,MPEG </span>
                </Form>
                <button onClick={handleUpload} className='green-btn my-2 upload-btn'>Upload</button>
                
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
                    <div className='w-100  d-flex flex-column align-items-center'>
                    <span>Video uploaded successfully ✅ </span>
                    <span>It is being processed !</span>
                    </div>
                )}
            </div>
          </div>
      {/* <input type="file" onChange={handleFileChange} accept="video/*" /> */}
      {/* Bouton pour démarrer le téléchargement avec gestionnaire d'événement onClick */}
      {/* <button onClick={handleUpload}>Upload</button> */}

      
    </div>
  );
};

// Exporte le composant FileUpload pour être utilisé ailleurs
export default FileUpload;


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