const express=require("express");
const postRoute=express.Router();
const {PostModel}=require("../model/postModel.js");
const {authentication}=require("../middleware/authentication.js")


postRoute.get("/",authentication,async(req,res)=>{
    try {
        const AllPosts=await PostModel.find({userId:req.body.userId,user:req.body.user});
        res.send(AllPosts)
    } catch (error) {
        console.log(error)
    }
})


postRoute.post("/add",authentication,async(req,res)=>{
    const {title,body,device,userId,user}=req.body;
    try {
        const NewPost= new PostModel({title,body,device,userId,user})
        await NewPost.save()
        res.status(200).send({ message:`New post ${title} created`, NewPost})
    } catch (error) {
        console.log(error)
        res.status(400).send({ error: "Something went wrong" })
    }
})


postRoute.patch("/update/:postId",authentication,async(req,res)=>{
   
    try {
        const {postId}=req.params
        const updatePost=req.body
        await PostModel.findByIdAndUpdate({_id:postId},updatePost)
       
        res.send(" post updated")
    } catch (error) {
        console.log(error)
    }
})


postRoute.delete("/delete/:postId",authentication,async(req,res)=>{
  
    try {
        const {postId}=req.params
        await PostModel.findByIdAndDelete({_id:postId})
        res.send("post deleted")
    } catch (error) {
        console.log(error)
    }
})
module.exports={postRoute}