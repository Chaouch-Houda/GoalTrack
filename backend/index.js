import express from "express"; 
import multer from "multer";    //la bibliothèque multer permet de gérer les fichiers téléchargés
import path from "path";        //le module path pour travailler avec les chemins de fichiers
import cors from 'cors';        //le module CORS pour gérer la politique Same-Origin Policy

const app = express();         // Création d'une instance d'Express
app.use(cors());                // Utilisation de CORS pour autoriser les requêtes depuis un autre domaine

/******  Uploading videos  ******/
const videoStorage = multer.diskStorage({  // Configuration du stockage des fichiers téléchargés
  destination: (req, file, cb) => {  // Définition du dossier de destination des fichiers avec la fonction destination
    cb(null, 'uploads/videos/');           // Dans ce cas, les fichiers seront stockés dans le dossier "uploads/"
  },
    //req représente la requête HTTP.
    //file représente les informations sur le fichier qui est en cours de téléchargement.
  filename: (req, file, cb) => {     // Définition du nom de fichier
    const ext = path.extname(file.originalname);  // Récupération de l'extension du fichier original
    cb(null, `${Date.now()}${ext}`);  // Le fichier sera renommé avec un horodatage unique pour éviter les doublons
  } //cb(error, destination) : est une fonction de rappel (callback) qui doit être appelée pour indiquer à multer que l'opération s'est terminée.
    //  Le 1er arg err est utilisé pour indiquer s'il y a eu une err lors de l'opération, et le 2ème arg dest est le chemin où le fichier doit être stocké.
});
const uploadVideo = multer({ storage: videoStorage  });  // Création d'une instance de multer avec la configuration de stockage définie précédemment
app.post('/uploadVideo', uploadVideo.single('file'), (req, res) => {  // Définition d'une route POST à l'URL '/upload'.Le middleware upload.single('file') de Multer est utilisé pour traiter le téléchargement d'un seul fichier à partir d'un champ de formulaire nommé 'file'. Cela signifie qu'il attend un seul fichier à la fois et le traite en conséquence.
  res.send('Video uploaded successfully');  // Réponse envoyée lorsque le fichier est téléchargé avec succès
});

// /******  Uploading the profile image  ******/
// const imageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/images/');
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}${ext}`);
//   }
// });

// const uploadImage = multer({ storage: imageStorage });

// app.post('/uploadImage', uploadImage.single('image'), (req, res) => {
//   res.send('Image uploaded successfully');
// });


app.listen(3001, () => {  // Démarrage du serveur Express sur le port 3001
  console.log('Server is running on http://localhost:3001');  
});
