import express, { query } from "express";    //en utilisant "type": "module" dans package.json, vous pouvez profiter des avantages de la syntaxe et des fonctionnalités modernes des modules ES6 (import/export) tout en bénéficiant de la compatibilité native avec les navigateurs modernes.
import mysql from "mysql" ;
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt"
const salt=10; //hashing the password with 10 lettres
const app = express();
const port = 3100;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Configuration de la connexion MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "goal-track"
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
//     // const sql = "INSERT INTO user (`name`,`email`,`password`) VALUES (?)";
//     // bcrypt.hashSync(req.body.password.toString(),salt,(err,hash)=>{
//     //     if(err) return res.json({Error : "Error for hashing password"});
//     //     const values = [
//     //         req.body.name,
//     //         req.body.email,
//     //         // req.body.password,
//     //         hash
//     //     ]
//     //     db.query(sql,[values],(err,data) => {
//     //         if(err) {
//     //             return res.json({Error : "Inserting data error in server"});
//     //         }
//     //         return res.json({Status: "Success"}+data);
//     //     });
//     // });
    const { username, email, password } = req.body;
    try{
      const hashedPassword = await bcrypt.hash(password.toString(), salt);
      const SQL = "INSERT INTO user (username,email,hashedPassword) VALUES (?,?,?)";
      db.query(SQL,[username, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          res.status(500).json({ message: 'Error registering user' });
        } else {
          res.status(201).json({ message: 'User registered successfully' });
        }
      });
    }catch(error){
      console.error('Error hashing password:', error);
    res.status(500).json({ message: 'Error registering user hashing' });
    }
});

// Route GET pour vérifier si l'e-mail existe déjà dans la base de données 
app.get("/emails", (req, res) => {
    const { email } = req.query;
    const sql = `SELECT * FROM user WHERE email ='${email}'`;
    db.query(sql,(err,data)=>{
        if(err) {
            return res.json({Error: "getting data error in server"})
        }
        return res.json(data);
    });
  });




// Post pour vérifier si cet email existe dans la base de données avec cet mot de passe 
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM user WHERE email = ?";

  db.query(sql, [email], async (err, data) => {
    if (err) {
      return res.json({ Error: "Error while getting data from server" });
    }

    if (data.length === 0) {
      return res.json({ Error: "User not found" });
    }

    const hashedPassword = data[0].password;
    // const isPasswordValid = await comparePassword(password, hashedPassword);
const isPasswordValid = password === hashedPassword;
    if (isPasswordValid===true) {
      return res.json({ authenticated: isPasswordValid });
    } else {
      return res.json({ authenticated: "Incorrect password  " + isPasswordValid });
    }
  });
});

async function comparePassword(password, hashed) {
  try {
    const result = bcrypt.compare(password, hashed);
    return result;
  } catch (error) {
    console.error("Error while comparing passwords", error);
    throw error; // Lève une erreur pour signaler que la comparaison a échoué
  }
}
  
/* Pour cette vérification on peut faire avec post que avec get , c'est pourquoi on choisit le faire avec post :
 -  Plus sécurisée : car le mot de passe n'est pas envoyé en clair sur le réseau.
 -De plus, cette approche peut permettre une meilleure séparation des préoccupations, car vous pouvez laisser la logique d'authentification au niveau du serveur.
*/
 app.listen(port, () => {
    console.log("listening");
});