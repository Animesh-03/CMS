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
app.use(express.urlencoded({extended: true})); // Enables accessing request parameters
app.use(express.json());

const PORT = process.env.PORT; //Acess the PORT variable in the .env

//URL when admin logins
app.post("/login/admin", (req,res) => {
    //Gets the user with the given username
    connection.execute("SELECT * FROM ADMIN WHERE username='" + req.body.data.username + "'", (error, results, fields) => {
        res.json(results);
    });
});

//URL when admin adds a student
app.post("/add/student", (req,res) => {
    //Inserts into student table using data provided from request
    connection.execute("INSERT INTO STUDENT VALUES( ?, ? , ? , ? )", [req.body.student_id, req.body.first_name, req.body.last_name, req.body.password], (error, results, fields) => {
        res.json(results);
    });
});

app.listen(PORT,() => console.log("Backend running at port: " + PORT));