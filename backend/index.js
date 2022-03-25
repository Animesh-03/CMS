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
//URL to view all students
app.get("/view/student/all", (req,res) => {
    //If name parameter is null then get all students else get the students whose first or last name matches
    if(req.query.name != null)
    {  
        //Query was too long so stored in a separate string
        const query = connection.format("SELECT * FROM STUDENT WHERE FIRST_NAME LIKE '" + "%" + req.query.name + "%'" + "OR LAST_NAME LIKE '" + "%" + req.query.name + "%'" );
        //Gets all the students with the given name
        connection.execute(query, (error,results,fields) => {
            res.json(results);
        });
    }
    else
    {   //Gets all the students
        connection.execute("SELECT * FROM STUDENT", (error,results,fields) => {
            res.json(results);
            console.log(error);
        });
    }
});

//URL to get students list in admin dashboard
app.get("/view/student", (req,res) => {
    //Gets num students from students table
    connection.execute("SELECT * FROM STUDENT LIMIT ?",[req.query.num], (error,results,fields) => {
        res.json(results);
    });
});

//URL to delete student with given ID
app.delete("/delete/student",(req,res) => {
    //Deletes the student having the given student_id
    connection.execute("DELETE FROM STUDENT WHERE STUDENT_ID=?",[req.body.student_id], (error,results,fields) => {
        res.json(results);
        console.log(error);
    });
});

//URL to get num professors
app.get("/view/professor/", (req,res) => {
    //Gets num professors from the rofessor table
    connection.execute("SELECT * FROM PROFESSOR LIMIT ?",[req.query.num], (error,results,fields) => {
        res.json(results);
        console.log(error);
    });
});

app.post("/add/professor", (req,res) => {
    connection.execute("INSERT INTO PROFESSOR VALUES(?, ?, ?, ?, ?)",[req.body.professor_id, req.body.password, req.body.email, req.body.first_name, req.body.last_name], (error,results,fields) => {
        res.json(results);
        console.log(error);
    });
});

app.get("/view/professor/all", (req,res) => {
    if(req.query.name != null)
    {
        connection.execute("SELECT * FROM PROFESSOR WHERE FIRST_NAME LIKE '" + "%" + req.query.name + "%'" + "OR LAST_NAME LIKE '" + "%" + req.query.name + "%'", (error,results,fields) => {
            res.json(results);
            console.log(error);
        });
    }
    else
    {
        connection.execute("SELECT * FROM PROFESSOR", (error,results,fields) => {
            res.json(results);
            console.log(error);
        });
    }
});

app.delete("/delete/professor", (req,res) => {
    connection.execute("DELETE FROM PROFESSOR WHERE PROFESSOR_ID=?", [req.body.professor_id], (error,results,fields) => {
        res.json(results);
        console.log(error);
    });
});

app.listen(PORT,() => console.log("Backend running at port: " + PORT));