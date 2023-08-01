import express from "express";    //en utilisant "type": "module" dans package.json, vous pouvez profiter des avantages de la syntaxe et des fonctionnalités modernes des modules ES6 (import/export) tout en bénéficiant de la compatibilité native avec les navigateurs modernes.
import mysql from "mysql" ;
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const salt=20; //hashing the password with 20 lettres
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "goal-track"
});

//create our API
app.post('/SignUp',(req,res) => {
    const sql = "INSERT INTO user (`name`,`email`,`password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(),salt,(err,hash)=>{
        if(err) return res.json({Error : "Error for hashing password"});
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql,[values],(err,data) => {
            if(err) {
                return res.json({Error : "Inserting data error in server"});
            }
            return res.json({Status: "Success"}+data);
        });
    });
});

app.listen(3100, () => {
    console.log("listening");
});