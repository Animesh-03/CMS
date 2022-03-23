const express = require('express');
const dotenv = require('dotenv');   //Used to access environment variables in env
const cors = require('cors');   //Enables frontend to send requests to backend
const mysql = require('mysql2');

const app = express();
dotenv.config();    //Configure backend by getting the .env file
//Configure MYSQL module
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: 'cms'
});

app.use(cors());    //Enable CORS

const PORT = process.env.PORT; //Acess the PORT variable in the .env

app.get("/login/admin", (req,res) => {
    //Get all admins form DB and send to frontend
    connection.query("SELECT * FROM ADMIN", (error, results, fields) => {
        res.json(results);
        console.log(req);
    });
});

app.listen(PORT,() => console.log("Backend running at port: " + PORT));