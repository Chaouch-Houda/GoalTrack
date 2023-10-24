import express from "express";    //en utilisant "type": "module" dans package.json, vous pouvez profiter des avantages de la syntaxe et des fonctionnalités modernes des modules ES6 (import/export) tout en bénéficiant de la compatibilité native avec les navigateurs modernes.
import cors from "cors";
import { expressjwt as jwtMid } from 'express-jwt';
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import db from "./config/db.js";
import { loginValidation, signupValidation } from "./validation.js";
import verifyToken from "./middleware/authMiddleware.js";

// config({path:'./.env'});

const salt = await bcrypt.genSalt(10); //hashing the password with 10 lettres
const app = express();
const port = 3100;

app.use(cors());
app.use(express.json()); //app.use est un middlewere de json permet de : si on fait post/put ou any request dans le body, il permet de mettre ce body content dans req.body
  
// Initialisation de votre middleware express-jwt, il doit etre appliqué avant les routes dans le fichier de configuration d'Express. Si le middleware est appliqué après la définition des routes, il se peut qu'il ne soit pas correctement exécuté.
  const jwtMiddleware = jwtMid({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256']

  }).unless({ path: ['/signup','/login','/checkEmail','/updateData'] }); //Exclusion des routes non authentifiées
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
        const id = data[0].id ;
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

app.put("/updateData",(req,res)=> {
  // const data = [req.body.firstName,res.body.lastName,res.body.email,res.body.password,res.body.photo,res.body.about,res.body.country,res.body.phone,res.body.birthdate,res.body.gender];
  const {password , ...data} = req.body ;
  console.log(data);
  // const data =req.body;
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