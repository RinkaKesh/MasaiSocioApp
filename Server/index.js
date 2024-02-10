const express=require("express");
const { connection } = require("./connection/connection.js");
const app=express();
const cors=require("cors")
app.use(cors({
   origin:"http://localhost:3000",
   credentials:true
}))
const cookieParser=require("cookie-parser")

app.use(cookieParser())
app.use(express.json());
require("dotenv").config();
const PORT=process.env.port;
const {authRoute}=require("./route/authRoute.js")
app.use("/users",authRoute)
const {postRoute}=require("./route/postRoute.js")
app.use("/posts",postRoute)











app.listen(PORT,async()=>{
   try {
    await connection
    console.log(`server is running on port ${PORT}`);
    
   } catch (error) {
    console.log("error in connection to DB",error);
   }
})