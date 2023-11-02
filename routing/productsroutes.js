const express=require('express');
const router=express.Router();
const client=require("mongodb").MongoClient;
let productData;
const ObjectId = require("mongodb").ObjectId;
client.connect("mongodb://127.0.0.1:27017").then((database)=>{
    console.log("Database Connected....");
    dbinstance=database.db("Ecommerce");
    productData=dbinstance.collection("productData");
})
router.get("/",(req,res)=>{
    productData.find({}).toArray().then((data)=>{
        if(req.session.username){
            res.render("index",{products:data});
        }
        else{
            res.render("login",{message:""});
        }
    })
    // if(req.session.username){
    //     let arr=fs.readFileSync("products.json");
    //     let result=JSON.parse(arr);
    //     res.render("index",{products:result});
    // }
    // else{
    //     res.render("login",{message:""});
    // }
    
})
router.get('/productDetails/:id',(req,res)=>{
    productData.find({_id:new ObjectId(req.params.id)}).toArray().then((data)=>{
        res.render("index",{products:data});
        // console.log(data);
        // res.end();
    })
})

router.get('/add',(req,res)=>{
    res.render('create');
})
router.post('/add',(req,res)=>{
    let obj={};
    obj.name=req.body.name;
    obj.price=req.body.price;
    obj.image="https://picsum.photos/300/300";
    obj.description=req.body.description;
    productData.insertOne(obj).then((data)=>{
        res.redirect("/products");
    }).catch((err)=>{
        console.log(err);
    })  
})

router.get('/edit/:id',(req,res)=>{
    productData.find({_id:new ObjectId(req.params.id)}).toArray().then((data)=>{
        //console.log(data);
        res.render("edit",{products:data});
    })
      
})

router.post('/edit',(req,res)=>{
    console.log(req.body);
    productData.updateOne({'_id':new ObjectId(req.body._id)},{$set:{"name":req.body.name,"price":req.body.price,"description":req.body.description}}).then((data)=>{
        //console.log(data);
        res.redirect("/products");
    })  
})


router.get('/delete/:id',(req,res)=>{
    productData.find({_id:new ObjectId(req.params.id)}).toArray().then((data)=>{
        //console.log(data);
        res.render("delete",{products:data});
    })
      
})

router.post('/delete',(req,res)=>{
    //console.log(req.body);
    productData.deleteOne({'_id':new ObjectId(req.body._id)}).then((data)=>{
        console.log(data);
        res.redirect("/products");
    })
})


module.exports=router;