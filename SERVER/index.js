const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000
//  import routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect }= require("./config/cloudinary");
const fileUpload = require("express-fileupload");
//data base connect 
database.connect();

// middleware 
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)
// enable multipart/form-data parsing
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        // createParentPath: true,
    })
);

// cloudinary connection 
cloudinaryConnect();

// routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);

// default route
app.get("/",(req,res)=>{
    return res.send("Welcome to StudyNotion");
});

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
});