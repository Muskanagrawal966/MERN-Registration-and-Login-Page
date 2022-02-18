const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/registration-form")
.then(()=>
{
    console.log("connection successful");
}).catch((e)=>
{
    console.log("no connection");
});

