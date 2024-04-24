import mysql from "mysql" ;
import dotenv from "dotenv" ; // where we create all our sensetive infprmations : password , host ...

dotenv.config(); //ou config({path:'./.env'}); avec import {config} from "dotenv" ;

// Configuration de la connexion MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

/* MySQL peuvent gérer automatiquement la création et la fermeture des connexions.Cela signifie que lorsque
 vous effectuez une requête vers la base de données (db.query), la bibliothèque vérifie automatiquement si
 une connexion à la base de données est déjà établie. Si aucune connexion n'est disponible, elle en crée une
 de manière transparente pour exécuter la requête, puis la ferme une fois la requête terminée.*/
// Connexion à la base de données MySQL
db.connect((err) => {
    if (err) {
      console.error('Error connecting to database');
    }
    console.log("Connected to MySQL database!");
  });
export default db;