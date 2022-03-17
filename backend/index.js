const express = require('express');
const dotenv = require('dotenv');   //Used to access environment variables in env
const cors = require('cors');   //Enables frontend to send requests to backend
const mysql = require('mysql');


const app = express();
dotenv.config();    //Configure backend by getting the .env file

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: 'cms'
});

app.use(cors());    //Enable CORS

const PORT = process.env.PORT; //Acess the PORT variable in the .env

app.get("/", (req,res) => {
    connection.query("SELECT * FROM ADMIN",(error, results, fields) => {
        // console.log(error);
        // console.log(fields);
        // console.log(results);
        res.json(results);
    })
});

app.listen(PORT,() => console.log("Backend running at port: " + PORT));