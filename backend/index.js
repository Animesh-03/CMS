const express = require('express');
const dotenv = require('dotenv');   //Used to access environment variables in env
const cors = require('cors');   //Enables frontend to send requests to backend
const mysql = require('mysql2');
const res = require('express/lib/response');

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

const PORT = process.env.PORT || 3000; //Acess the PORT variable in the .env

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
//URL to add a professor
app.post("/add/professor", (req,res) => {
    connection.execute("INSERT INTO PROFESSOR VALUES(?, ?, ?, ?, ?)",[req.body.professor_id, req.body.password, req.body.email, req.body.first_name, req.body.last_name], (error,results,fields) => {
        res.json(results);
        console.log(error);
    });
});

//URL to get all professors
app.get("/view/professor/all", (req,res) => {
    //If name in search query is null then get all the professors else get the professors whose first name or last name matches
    if(req.query.name != null)
    {
        //Gets all the professors whose name matches with the given name
        connection.execute("SELECT * FROM PROFESSOR WHERE FIRST_NAME LIKE '" + "%" + req.query.name + "%'" + "OR LAST_NAME LIKE '" + "%" + req.query.name + "%'", (error,results,fields) => {
            res.json(results);
            console.log(error);
        });
    }
    else
    {
        //Gets all the professors
        connection.execute("SELECT * FROM PROFESSOR", (error,results,fields) => {
            res.json(results);
            console.log(error);
        });
    }
});

//URL to delete a professor
app.delete("/delete/professor", (req,res) => {
    //Deletes a professor with the given id
    connection.execute("DELETE FROM PROFESSOR WHERE PROFESSOR_ID=?", [req.body.professor_id], (error,results,fields) => {
        res.json(results);
        console.log(error);
    });
});

//URL to get num courses
app.get("/view/course",(req,res) => {
    //Gets num courses from courses table
    connection.execute("SELECT * FROM COURSE LIMIT ?",[req.query.num], (error,results,fields) => {
        res.json(results);
        console.log(error);
    });
});

//URL to view all courses
app.get("/view/course/all", (req,res) => {
    //If name parameter is not null then get all the courses with matching names else get all courses
    if(req.query.name != null)
    {
        connection.execute("SELECT * FROM COURSE WHERE COURSE_NAME LIKE '%" + req.query.name + "%'", (error,results,fields) => {
            res.json(results);
            console.log(error);
        });
    }
    else
    {
        connection.execute("SELECT * FROM COURSE", (error,results,fields) => {
            res.json(results);
            console.log(error);
        })
    }
});

//URL to add course
app.post("/add/course", (req,res) => {
    //Adds a course into course table
    connection.execute("INSERT INTO COURSE VALUES(?, ?, ?)",[req.body.course_id, req.body.ic, req.body.course_name], (error,results,fields) => {
        res.json(results);
        console.log(error);
    });
});

//URL to delete a course
app.delete("/delete/course", (req,res) => {
    //Fill code to delete the course from many tables
    res.send({msg:"ok"});
});

//URL to login a professor
app.post("/login/professor", (req,res) => {
    //Gets the professor haing the professor_id
    connection.execute("SELECT * FROM PROFESSOR WHERE PROFESSOR_ID=?",[req.body.professor_id], (error, results, fields) => {
        res.json(results);
        console.log(error);
    });
});
//URL to login student
app.post("/login/student", (req,res) => {
    //Gets the student with the student_id
    connection.execute("SELECT * FROM STUDENT WHERE STUDENT_ID=?", [req.body.student_id], (error,results,fields) => {
        res.json(results);
        console.log(error);
    });
});

//URL to get courses by IC
app.post("/view/course/ic", (req,res) => {
    //Gets the courses whose ic is given
    connection.execute("SELECT * FROM COURSE WHERE IC=?",[req.body.ic], (error, results, fields) => {
        res.json(results);
        console.log(error);
    });
});

//URL to get a specific course
app.get("/view/course/:id", (req,res) => {
    //Gets the course from id
    connection.execute("SELECT * FROM COURSE WHERE COURSE_ID=?", [req.params.id], (error,results,fields) => {
        res.json(results);
        console.log(error);
    });
});

//URL to get the sections of a course
app.get("/view/section/all", (req,res) => {
    //Joins the section and teaches table and gets everything
    connection.execute("SELECT * FROM SECTION WHERE COURSE_ID=? ORDER BY SECTION_ID",[req.query.course_id], (error,results,fields) => {
        res.json(results);
        console.log(error);
    });
});

//URL to add a section to a course
app.post("/add/section", (req,res) => {
    //Add a section with section id and course id
    connection.execute("INSERT INTO SECTION VALUES(?, ?)", [req.body.section_id, req.body.course_id], (error,results,fields) => {
        res.json(results);
        console.log(error);
    });
});
//URL to add professors to teaches table
app.post("/add/section/professors", (req,res) => {
    //For each professor in the list add to teaches table
    req.body.professors.map(p => {
        connection.execute("INSERT INTO TEACHES VALUES(?,?,?)",[p,req.body.section_id,req.body.course_id], (error,results,fields) => {
            res.json(results)
            console.log(error);
        });
    });
});

//URL to get a professor's sections
app.post("/professor/view/sections", (req,res) => {
    connection.execute("SELECT * FROM TEACHES T JOIN COURSE C ON T.COURSE_ID=C.COURSE_ID WHERE PROFESSOR_ID=?",[req.body.professor_id], (error, results, fields) => {
        res.json(results);
        console.log(error);
    });
});

//URL to view a specific section
app.post("/view/course/section", (req,res) => {
    //Chains SQL queries required to get all info of the section
    connection.execute("SELECT PROFESSOR_ID AS professor_id FROM TEACHES WHERE SECTION_ID=? AND COURSE_ID=?",[req.body.section_id, req.body.course_id], (error1, results1, fields1) => {
        console.log(error1);
        var topics = [];
        connection.execute("SELECT * FROM TOPIC WHERE SECTION_ID=? AND COURSE_ID=?",[req.body.section_id,req.body.course_id], (error2, results2, fields2) => {
            console.log(error2);
            
            for(let i = 0; i < results2.length; i++)
            {
                connection.execute("SELECT * FROM ITEM WHERE TOPIC_ID=?",[results2[i].topic_id], (error3,results3,fields3) => {
                    let topic = {
                        topic: results2[i],
                        items: []
                    };

                    results3.forEach(item => {
                        topic.items.push(item);
                    });
                    topics.push(topic);

                    if(i === results2.length - 1)
                    {
                        const obj = {
                            professors: results1,
                            topics: topics,
                            length: 3
                        };
                        
                        res.json(obj);
                        console.log(error3);
                    }
                });

                
            }
        })
    });
});

//URL to add a topic to section
app.post("/section/add/topic", (req, res) => {
    connection.execute("INSERT INTO TOPIC (TYPE, HEADING, SECTION_ID, COURSE_ID) VALUES(?, ?, ?, ?)",[req.body.type, req.body.heading, req.body.section_id, req.body.course_id], (error,results, fields) => {
        res.json(results);
        console.log(error);
    });
});
//URL to add an item to topic
app.post("/section/add/topic/item", (req, res) => {
    connection.execute("INSERT INTO ITEM (TOPIC_ID, DESCRIPTION, FILE_LINK) VALUES(?, ? ,?)",[req.body.topic_id, req.body.description, req.body.file_link], (error, results, fields) => {
        res.json(results);
        console.log(error);
    })
});

//URL to register student to section
app.post("/student/add/section", (req, res) => {
    connection.execute("INSERT INTO STUDIES VALUES(?, ?, ?)", [req.body.student_id, req.body.section_id, req.body.course_id], (error, results, fields) => {
        res.json(results);
        console.log(error);
    });
});

//URL to get a student's sections
app.post("/student/view/section", (req,res) => {
    connection.execute("SELECT * FROM STUDIES S JOIN COURSE C ON S.COURSE_ID=C.COURSE_ID WHERE STUDENT_ID=?",[req.body.student_id], (error,results, fields) => {
        res.json(results);
        console.log(error);
    });
});

//URL to unenrol from a section from studies table
app.delete("/student/remove/section", (req, res) => {
    connection.execute("DELETE FROM STUDIES WHERE SECTION_ID=? AND COURSE_ID=? AND STUDENT_ID=?", [req.body.section_id, req.body.course_id, req.body.student_id], (error, results, fields) => {
        res.json(results);
        console.log(error);
    });
});

app.listen(PORT,() => console.log("Backend running at port: " + PORT));