const express=require("express");
const router=express.Router();
const path=require("path");
router.get("/dashboard",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/dashboard"))
})

router.get("/profile",(req,res)=>{
    res.send("Profile");
})

module.exports=router;