import axios from 'axios';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function DropzoneComponent() {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);

// const onDrop = useCallback(async (acceptedFiles) => {
//     const selectedFile = acceptedFiles[0];
//     if (!selectedFile) {
//         alert("Please select a video file.");
//         return;
//       }
//     const formData = new FormData(); // Crée un objet FormData pour envoyer le fichier
//     formData.append('file', selectedFile); // Ajoute le fichier au FormData avec la clé 'file'
//         setSelectedFile(null);  // pour éviter qu'après uploading video et en cliquant sur btn il ne fait pas le téléchargement de meme video d'autres fois.

//     try {
//       const response = await axios.post('http://localhost:3001/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setUploadPercentage(percentCompleted); // Met à jour la progression du téléchargement
//         },
//       });

//       console.log(response.data);
//       setUploadFinished(true);
//     } catch (error) {
//       console.error(error);
//       alert('An error occurred while uploading the file. Please try again.');
//     }
//   }, []);

  const {getRootProps,getInputProps} = useDropzone({onDrop});

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div>Drag and drop your images here.</div>
    </div>
  )
}

export default DropzoneComponent;