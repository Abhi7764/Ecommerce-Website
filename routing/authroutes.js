const express=require("express");
const router=express.Router();

router.get("/dashboard",(req,res)=>{
    res.render("dashboard",{name:req.session.Name});
})

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/");
})

router.get("/profile",(req,res)=>{
    res.send("Profile");
})

module.exports=router;