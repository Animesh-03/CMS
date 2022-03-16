const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');


const app = express();
dotenv.config();

app.use(cors());

const PORT = process.env.PORT;

app.get("/", (req,res) => {
    res.json({response: "Working"});
});

app.listen(PORT,() => console.log("Backend running at port: " + PORT));