const e = require("express");
const express=require("express");
const path=require("path");
const isJson = require('is-json');

const json2xls = require('json2xls');

const bodyParser = require('body-parser');

const fs = require('fs');

// const exceljs=require("exceljs");
const XLSX = require('xlsx');

const app=express();
require("./db/conn");
const { Register, Add}=require("./models/registers");
const port=process.env.PORT||3000;

app.set("view engine","ejs");
const static_path=path.join(__dirname,"../public");
app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// const bodyParser = require("body-parser");
const { json } = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>
{
    res.send("welcome to home page");
})

app.get("/register",(req,res)=>
{
    res.render("register");
})

app.post("/register",async(req,res)=>
{try{
    const registrationData=new Register({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    })
const registered=await registrationData.save();
res.status(201).render("index");
}catch(error)
{
    res.status(400).send(error);
}
    
})

app.get("/login",(req,res)=>
{
    res.render("login");
})

app.post("/login",async(req,res)=>
{
    try{
        const email=req.body.email;
        const password=req.body.password;
        const useremail=await Register.findOne({email:email});
        if(useremail.password===password)
        {
            res.status(201).render("userprofile");
        }
        else{
            res.send("incorrect password");
        }
    }catch(err)
    {
        res.status(400).send(err);
    }
})

app.get("/userprofile",(req,res)=>
{   
    res.render("userprofile");
})


app.get("/add",(req,res)=>
{    
    
    res.render("add");
})

app.post("/add",async(req,res)=>
{    
    try{
        const addData=new Add({
            name:req.body.name,
            email:req.body.email,
            number:req.body.number,
            address:req.body.address,
            semester:req.body.semester
        })
    const registered=await addData.save();
    res.status(201).render("userprofile");
    }
    catch(error)
    {
        res.status(400).send(error);
    }
});

// app.get("/exportdata",async(req,res)=>
// {
//     try{
//         const userdata=await Add.find().sort();
//         res.send(userdata);

//     }catch(e)
//     {res.send(e);}
// })

app.get("/viewdata",async(req,res)=>
{
    try{
        Add.find({},function(err,datas)
        {
            res.render("viewdata",{
                dataList:datas
            })
        })
    }catch(e)
    {res.send(e);}
})

app.post('/exportdata',(req,res)=>{
    var wb = XLSX.utils.book_new(); //new workbook
    Add.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var down = __dirname+'/exportdata.xlsx'
           XLSX.utils.book_append_sheet(wb,ws,"sheet1");
           XLSX.writeFile(wb,down);
           res.download(down);
        }
    });
});

app.get("/add1",(req,res)=>
{
    res.render("add1");
})

app.get("/add2",(req,res)=>
{
    res.render("add2");
})

// app.post('/downloaddata',(req,res) => {

//     var jsondata = req.body.json

//     var exceloutput = Date.now() + "output.xlsx"

//     if(isJson(jsondata)){
//         var xls = json2xls(JSON.parse(jsondata));

//         fs.writeFileSync(exceloutput, xls, 'binary');

//         res.download(exceloutput,(err) => {
//             if(err){
//                 fs.unlinkSync(exceloutput)
//                 res.send("Unable to download the excel file")
//             }
//             fs.unlinkSync(exceloutput)
//         })
//     }
//     else{
//         res.send("JSON Data is not valid")
//     }

// })

app.get("*",(req,res)=>
{
    res.send("404 error! oop's page not found!");
})

app.listen(port,()=>
{
    console.log("connection successful at portal "+port);
});