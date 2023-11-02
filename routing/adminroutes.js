const express=require("express");
const router=express.Router();

router.get("/allProducts",(req,res)=>{
    res.send("Admin all products")
})
module.exports=router;