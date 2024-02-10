const express=require("express");
const { connection } = require("./connection/connection.js");
const app=express();
app.use(express.json());
require("dotenv").config();
const PORT=process.env.port;











app.listen(PORT,async()=>{
   try {
    await connection
    console.log(`server is running on port ${PORT}`);
    
   } catch (error) {
    console.log("error in connection to DB",error);
   }
})