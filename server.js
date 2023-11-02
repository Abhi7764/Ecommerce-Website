const express=require("express");
const app=express();
<<<<<<< HEAD
//const fs=require("fs");
const cookieparser=require("cookie-parser");
const session=require("express-session");
const client=require("mongodb").MongoClient;
//app.use(express.static("public"));
app.set("view engine","ejs");
let dbinstance;
let userData;

client.connect("mongodb://127.0.0.1:27017").then((database)=>{
    console.log("Database Connected....");
    dbinstance=database.db("Ecommerce");
    userData=dbinstance.collection("userData");
    //productData=dbinstance.collection("productData");
})

app.use(express.urlencoded({extends:true})); 
app.use(cookieparser());
let oneday=1000*60*60*24;
app.use(session({
        saveUninitialized:true,
        secret:"i37489dshsdk342190*&*%2",
        cookie:{maxAge:oneday},
        resave:false
}))

const authRoutes=require("./routing/authroutes");
const productsroutes=require("./routing/productsroutes");
app.use("/products",productAuth ,productsroutes);
function productAuth(req,res,next){
    if(req.session.username){
        next()
    }
    else{
        res.redirect("/");
    }
}

app.use("/users",auth,authRoutes)

function auth(req,res,next){
    if(req.session.username)
        next();
    else
        res.redirect("/");
}

app.get("/",(req,res)=>{
    if(req.session.username){
        res.redirect("users/dashboard");
    }
    else{
        res.render("login",{message:""});
    }
    // fs.readFile("products.json","utf-8",(err,data)=>{
    //     let productsData=JSON.parse(data);
    //     res.render("index",{products:productsData});

    // })
    
})

// app.get("/productDetails/:id",(req,res)=>{
//     fs.readFile("products.json","utf-8",(err,data)=>{
//         let productsData=JSON.parse(data);
//         let results=productsData.filter((item)=>{
//             if(item.id==req.params.id){
//                 return true;
//             }
//         })
//         res.render("index",{products:results});

//     })
// })

app.get("/login",(req,res)=>{
    if(req.session.username)
        res.redirect("/users/dashboard");
    else
        res.render("login",{message:""});
})

app.post("/login",(req,res)=>{
    userData.findOne({$and:[{'username':req.body.username},{"password":req.body.password}]}).then((data)=>{
        //console.log(data);
        if(data==null){
            res.render("login",{message:"Invalid Username/Password"})
        }
        else{
            req.session.username=data.username;
            req.session.Name=data.Name;
            res.redirect("/users/dashboard");
        }
    })
    // fs.readFile("users.txt","utf-8",(err,data)=>{
    //     let usersData=JSON.parse(data);
    //     let results=usersData.filter((item)=>{
    //         if(item.username==req.body.username && item.password==req.body.password){
    //             return true;
    //         }
    //     })
    //     if(results.length==0){
    //         res.render("login",{message:"Invalid Username/Password"})
    //     }
    //     else{
    //         req.session.username=results[0].username;
    //         req.session.Name=results[0].Name;
    //         res.redirect("/users/dashboard");
    //     }
    // })

})

app.listen(3000,(err)=>{
    console.log("Server Started....");
=======
const fs=require('fs');
const path=require("path");

const cookieparser=require("cookie-parser");
const session=require("express-session")

const oneday=1000*60*60*24;
app.use(cookieparser());
app.use(session({
    saveUninitialized:true,
    ressave:false,
    secret:"dsmgfdweiu&*3ddd",
    cookie:{maxAge:oneday}
}));
 
app.use(express.static("public"));
app.use(express.urlencoded());

const userroutes=require("./routing/userroutes");
app.use("/users",test,userroutes);

const adminroutes=require("./routing/adminroutes");
app.use("/admin",admintest,adminroutes);

function test(req,res,next){
    if(req.session.username)
        next();
    else{
        res.redirect("/");
    }
}

function admintest(req,res,next){
    if(req.session.role=="admin")
        next();
    else{
        res.redirect("/");
    }
}
app.get("/",(req,res)=>{
    if(req.session.username){
        res.sendFile(path.join(__dirname,"./public/dashboard.html"));
        return;
    }
    res.sendFile(__dirname+"/public/login.html");
})
//!Authentication

app.get("/login",(req,res)=>{
    //console.log(req.session);
    if(req.session.username)
        res.redirect("/dashboard");
    else
        res.sendFile(__dirname+"/public/login.html");
})

app.get("/dashboard",(req,res)=>{
    if(req.session.username)
        res.sendFile(path.join(__dirname,"./public/dashboard.html"));
        //res.sendFile(__dirname+"/public/dashboard.html");
    else
        res.redirect('/login');
    
})

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/login");
})

app.post("/login",(req,res)=>{
    fs.readFile("users.txt","utf-8",(err,data)=>{
        //console.log(req.body)
        let records = JSON.parse(data);
        let results=records.filter((item)=>{
            if(item.username == req.body.username && item.password ==req.body.password){
                return true;
            }
        })
        if(results.length==0){
            res.send("Invalid User/Password");
        }
        else{
            // res.send("Login Successfully....");
            req.session.username=req.body.username; 
            req.session.role=results[0].role;

            res.redirect("/dashboard");
        }
    })
})
app.listen(3000,(err)=>{
    if(err)
        console.log("Server can not started");
    else
        console.log("Server started.....");
>>>>>>> da28389 (Initial commit)
})