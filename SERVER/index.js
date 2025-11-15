const express = require("express");
const app = express();

// middleware 
app.use(express.json());


// listen server
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

// default route
app.get("/",(req,res)=>{
    res.send("Welcome to StudyNotion")
})