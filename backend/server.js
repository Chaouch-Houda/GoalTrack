import express, { query, response } from "express";    //en utilisant "type": "module" dans package.json, vous pouvez profiter des avantages de la syntaxe et des fonctionnalités modernes des modules ES6 (import/export) tout en bénéficiant de la compatibilité native avec les navigateurs modernes.
import mysql from "mysql" ;
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt, { hash } from "bcrypt"
import {config} from "dotenv" ; // where we create all our sensetive infprmations : password , host ...

config({path:'./.env'});

const salt = await bcrypt.genSalt(10); //hashing the password with 10 lettres
const app = express();
const port = 3100;

app.use(cors());
app.use(express.json()); //app.use est un middlewere de json permet de : si on fait post/put ou any request dans le body, il permet de mettre ce body content dans req.body
app.use(cookieParser());

// Configuration de la connexion MySQL
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


app.listen(port, () => {
  console.log("listening");
});

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
app.post('/signup',async (req,res) => {
    const { firstName,lastName, email, password } = req.body;
    try{
      const hashedPassword = await bcrypt.hash(password.toString(), salt);
      const SQL = "INSERT INTO user (firstName,lastName,email,password) VALUES (?,?,?,?)";
      db.query(SQL,[firstName,lastName, email, hashedPassword], (err, result) => {
        if (err) {
          res.status(500).json({ message: 'Inserting data Error :',err });
        } else {
          res.status(201).json({ message: 'User registered successfully'+[firstName,lastName, email, hashedPassword] });
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




// Post pour vérifier si cet email existe dans la base de données avec cet mot de passe 
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try{
//     const sql = "SELECT * FROM user WHERE email = ?";
//     db.query(sql, [email], (err, user) => {
//       if (err) {
//         return res.json({ Error: "Error while getting data from server" });
//       }
//       if (user.length === 0) {
//         return res.json({ Error: "User not found" });
//       }
//     });
//       const hashedPassword = user[0].password;
//        bcrypt.compare(password.toString(),hashedPassword,(error,response)=> {
//         if(error) return res.json({Error:"Password Comare error"});
//         if(response) {
//           return res.json({Status : "Success"});
//         }
//        });
//           if(isPasswordValid) {
//             res.status(200).send("Logged in successfully !")
//             return res.json(isPasswordValid);
//           }
//     } catch (err) {
//       res.status(500).json({ message: err.message});
//     }
//  });   

app.post("/login", (req, res) => {
  // const pass = 'Houda1234*';
  // const hashh = bcrypt.hashSync(pass, salt);
  // const rs = bcrypt.compareSync(pass,hashh);
  // console.log("rs : "+rs+"   hashh :  "+hashh);
  const { email, password } = req.body;

  const sql = "SELECT * FROM user WHERE email = ?";

  db.query(sql, [email], (err, data) => {
    if (err) {
      return res.json({ Error: "Error while getting data from server" });
    }

    if (data.length === 0) {
      return res.json({ Error: "User not found" });
    }

    const hashedPassword = data[0].password;
    const isMatch = bcrypt.compareSync(password, hashedPassword);
    if (isMatch) {
      console.log("correct password !");
      return res.json({ Status: "success" });
    } else {
      console.log("incorrect password");
      return res.json({ Error: "password not matched" });
    }
  });
});





    // console.log(hashedPassword);
//     console.log(isPasswordValid)
//     console.log(results[0])
//     console.log(password)
// const isPasswordValid = password === hashedPassword;
    // if (isPasswordValid === true) {
    //   return res.json({ authenticated: isPasswordValid });
    // } else {
    //   return res.json({ authenticated: "Incorrect password  " + isPasswordValid });
    // }
  


// async function comparePassword(password, hashed) {
//   try {
//     const result =await bcrypt.compare(password, hashed);
//     return result;
//   } catch (error) {
//     console.error("Error while comparing passwords", error);
//     throw error; // Lève une erreur pour signaler que la comparaison a échoué
//   }
// }
  
/* Pour cette vérification on peut faire avec post que avec get , c'est pourquoi on choisit le faire avec post :
 -  Plus sécurisée : car le mot de passe n'est pas envoyé en clair sur le réseau.
 -De plus, cette approche peut permettre une meilleure séparation des préoccupations, car vous pouvez laisser la logique d'authentification au niveau du serveur.
*/
