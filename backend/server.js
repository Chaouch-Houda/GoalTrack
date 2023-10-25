import express from "express";    //en utilisant "type": "module" dans package.json, vous pouvez profiter des avantages de la syntaxe et des fonctionnalités modernes des modules ES6 (import/export) tout en bénéficiant de la compatibilité native avec les navigateurs modernes.
import cors from "cors";
import { expressjwt as jwtMid } from 'express-jwt';
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import db from "./config/db.js";
import { loginValidation, signupValidation } from "./validation.js";
import verifyToken from "./middleware/authMiddleware.js";
import path from 'path';
import multer from 'multer'
// config({path:'./.env'});

const salt = await bcrypt.genSalt(10); //hashing the password with 10 lettres
const app = express();
const port = 3100;


const corsOptions = {
  origin: 'http://localhost:3000', // L'origine du client React
  credentials: true, // Autoriser les en-têtes d'autorisation
};
app.use(cors());
app.use(cors(corsOptions));
app.use(express.json()); //app.use est un middlewere de json permet de : si on fait post/put ou any request dans le body, il permet de mettre ce body content dans req.body
app.use('/images', express.static('uploads/images')); // to make the photos from server accessibles   

// Initialisation de votre middleware express-jwt, il doit etre appliqué avant les routes dans le fichier de configuration d'Express. Si le middleware est appliqué après la définition des routes, il se peut qu'il ne soit pas correctement exécuté.
  const jwtMiddleware = jwtMid({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256']

  }).unless({ path: ['/signup','/login','/checkEmail','/updateImage','/updateData','uploads/images'] }); //Exclusion des routes non authentifiées
  // Application de votre middleware express-jwt
  app.use(jwtMiddleware);
  
app.listen(port, () => {
  console.log("The server is listening on port : " + process.env.PORT);
});

// app.use(cors({
//   origin:["http://localhost:3100"],
//   methods:["POST","GET"],
//   credentials: true,
// }));
// app.use(cookieParser());

/* MySQL peuvent gérer automatiquement la création et la fermeture des connexions.Cela signifie que lorsque
 vous effectuez une requête vers la base de données (db.query), la bibliothèque vérifie automatiquement si
 une connexion à la base de données est déjà établie. Si aucune connexion n'est disponible, elle en crée une
 de manière transparente pour exécuter la requête, puis la ferme une fois la requête terminée.*/
// Connexion à la base de données MySQL
// db.connect((err) => {
//     if (err) {
//       throw err;
//     }
//     console.log("Connected to MySQL database!");
//   });

//créer API

/**********************  Uploading videos  **********************/
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

/********************** Signup **********************/
app.post('/signup',signupValidation,async (req,res) => {
    const { firstName,lastName, email, password } = req.body;
    try{
      const hashedPassword = await bcrypt.hash(password.toString(), salt);
      const SQL = "INSERT INTO user (firstName,lastName,email,password) VALUES (?,?,?,?)";
      db.query(SQL,[firstName,lastName, email, hashedPassword], (err, result) => {
        if (err) {
          res.status(500).json({ Error: 'Inserting data Error in server'});
        } else {
          res.status(201).json({ message: 'User registered successfully'});
        }
      });
      
    }catch(error){
    res.status(500).json({ message: 'Erreur lors du hachage du mot de passe' });
    }
});

/********************** checkEmail **********************/
// Route GET pour vérifier si l'e-mail existe déjà dans la base de données 
app.get("/checkEmail", (req, res) => {
  try{
    const email = req.query.email;
    console.log(email);
    const sql = `SELECT * FROM user WHERE email = ?`;
    db.query(sql,[email],(err,data) => {
        if(err) {
            return res.json({Error: "getting data error in server"})
        }
        if(data.length > 0) return res.json({emailExists : true});
        else return res.json({emailExists : false});
    });
  }catch(err){
    res.status(500).json({ message: err.message})
  }
  });

  /********************** login **********************/
app.post("/login", loginValidation , (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [email], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Email or password is incorrect! (email not found)" });
    }
    if (data.length > 0) {
      const hashedPassword = data[0].password;
      const isMatch = bcrypt.compareSync(password, hashedPassword);
      if (isMatch) {
        //get user id
        const id = data[0].userId ;
        // console.log(data[0])
        //create the token 
        const token = jwt.sign({id},process.env.SECRET_KEY,{expiresIn:'1d'});
        console.log("Correct password !")
        //send the token and user's data in the response
        return res.status(200).send({
          msg: 'Logged in!',
          token,
          userData:data[0],
        });
      } else {
        console.log("Incorrect password");
        return res.status(401).json({ error: "Check your informations" });
      }
    } else {
      console.log("User not found");
      return res.status(404).json({ error: "Check your informations" });
    }
  });
});

/******  Uploading the profile image  ******/
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});
const uploadImage = multer({ storage: imageStorage });
app.post("/updateImage",uploadImage.single('photo'),(req,res)=> {
  const photo = req.file.filename;
  console.log('photo :'+photo);
  const imageUrl = `http://localhost:3100/images/${photo}`;
  res.status(200).json({ success: true, message: 'Photo uploaded successfully', photo: imageUrl });
});

/********************** updateData **********************/
app.put("/updateData",(req,res)=> { 
  // app.put("/updateData",verifyToken,(req,res)=> { 
  // Cette route nécessite une authentification
  // Le middleware verifyToken s'exécute avant la fonction de routage
  // Si le token est valide, il appelle next() pour poursuivre le traitement de la requête
  // Sinon, il renvoie une erreur 403 (Token invalide)

  // const data = [req.body.firstName,res.body.lastName,res.body.email,res.body.password,res.body.photo,res.body.about,res.body.country,res.body.phone,res.body.birthdate,res.body.gender];
  const {password , ...data} = req.body ;
  console.log(data);
  const userEmail = req.body.email;
  const userPwd = req.body.password;

  const sql = "SELECT * FROM user WHERE email = ?";
db.query(sql, [userEmail], (err, userData) => {
    if (err) {
      return res.status(500).json({ error: "Server error (select user in updateData) !" });
    }
    if (userData.length > 0) {
      const hashedPassword = userData[0].password;
      const isMatch = bcrypt.compareSync(userPwd, hashedPassword);
      if (isMatch) {  
        
        const sql = 'UPDATE user SET ? WHERE email = ? ';
        db.query(sql,[data,userEmail],(err,result) =>{
          if(err) {
            console.error('Error while updating the profile: ', err);
            res.status(500).send({ message: 'Server error (update user in updateData)' });
          } else {
            res.status(200).send({ message: 'Profile updated successfully.'});
          }
        });
      } else {
        return res.status(400).json({ error: "Incorrect password!" });
      }
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  
  });
});



 
/* Pour cette vérification on peut faire avec post que avec get , c'est pourquoi on choisit le faire avec post :
 -  Plus sécurisée : car le mot de passe n'est pas envoyé en clair sur le réseau.
 -De plus, cette approche peut permettre une meilleure séparation des préoccupations, car vous pouvez laisser la logique d'authentification au niveau du serveur.
*/

// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});