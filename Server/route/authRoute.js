const express=require("express");
const authRoute=express.Router();
require("dotenv").config();
const cookieParser=require("cookie-parser")
const {UserModel}=require("../model/userModel");
const jwt =require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { TokenModel}=require("../model/tokenModel.js")

authRoute.post("/register",async(req,res)=>{
    try {
         const {name,email,gender,password}=req.body;
         const isUserPresent=await UserModel.findOne({email})
         if(isUserPresent) {
          res.status(400).send({error:`user with Email ${email} already exist`})
         }

        else{bcrypt.hash(password,10,async function(err,hash){
            if(err){
                res.status(400).send({error: "Internal Server Error"})
                console.log(err)
            }else{
                const newUser=new UserModel({name,email,gender,password:hash})
                await newUser.save()
                res.status(200).send({ message:`${name} Registered Successfully`})
            }
         })}
         
    } catch (error) {
        res.status(400).send({error: "Internal Server Error"});
        console.log(error)
    }
})



authRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        const accessToken = jwt.sign(
          { userId: user._id, user: user.name },
          process.env.key1,
          { expiresIn:1800 }
        );
  
        const refreshToken = jwt.sign(
          { userId: user._id, user: user.name },
          process.env.key2,
          { expiresIn: 3600 }
        );
  
        // console.log(`accessToken:${accessToken}, refreshToken:${refreshToken}`);
  
        res.cookie("access-Token", accessToken);
        res.cookie("refresh-Token", refreshToken);
  
        res.status(200).send({ message:`${user.name} Logged in successfully`,accessToken, refreshToken });
        // console.log("Logged in");
      } else {
        console.log("Wrong credentials");
        res.status(401).send({ error: "Wrong credentials" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  


  authRoute.get("/logout", async (req, res) => {
    try {
        const cookies = req.cookies;
        const accessToken = cookies["access-Token"];

        if (!accessToken) {
            return res.status(401).send({ "message": "Invalid token" });
        }

        
        const newToken = new TokenModel({ token: accessToken });
        await newToken.save();
        console.log("token saved to database")


        res.clearCookie('access-Token');
        res.status(200).send({ "message": "User logged out successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ "error": "Internal server error" });
    }
});

module.exports={authRoute}