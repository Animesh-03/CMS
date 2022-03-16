const express = require('express');
const dotenv = require('dotenv');   //Used to access environment variables in env
const cors = require('cors');   //Enables frontend to send requests to backend


const app = express();
dotenv.config();    //Configure backend by getting the .env file

app.use(cors());    //Enable CORS

const PORT = process.env.PORT; //Acess the PORT variable in the .env

app.get("/", (req,res) => {
    res.json({response: "Working"});
});

app.listen(PORT,() => console.log("Backend running at port: " + PORT));