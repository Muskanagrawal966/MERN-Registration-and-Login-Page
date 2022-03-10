const mongoose=require("mongoose");
const { required } = require("nodemon/lib/config");
const registrationSchema=new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true
        },
        email:
        {
            type:String,
            required:true,
            unique:true
        },
        password:
        {
            type:String,
            required:true
        }
    }
)

const detailsSchema=new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true
        },
        email:
        {
            type:String,
            required:true
        },
        number:
        {
            type:Number,
            required:true,
            unique:true

        },
        address:
        {
            type:String,
            required:true
        },


        semester:
        {
            type:Number,
            required:true
        }

    }
)

const csvSchema=new mongoose.Schema(
    {   Timestamp:
        {
            type:Date,
            default:Date.now
        },
        Email:
        {
            type:String,
            required:true
        },
        RegiatrationNumber:
        {
            type:Number,
            required:true
        },
        Name:
        {
            type:String,
            required:true
        },
        ContactNumber:
        {
            type:Number,
            required:true,
            unique:true

        },
        FathersName:
        {
            type:String,
            required:true
        },
        FathersNumber:
        {
            type:Number,
            required:true,
            unique:true

        },
        MothersName:
        {
            type:String,
            required:true
        },
        MothersNumber:
        {
            type:Number,
            required:true,
            unique:true

        },
        Address:
        {
            type:String,
            required:true
        },
        CSbackground:
        {
            type:String,
            required:true
        }

    }
)

const Register=new mongoose.model("Register",registrationSchema);
const Add=new mongoose.model("Add",detailsSchema);
const Uploadcsv=new mongoose.model("Uploadcsv",csvSchema);


module.exports= {Register,Add,Uploadcsv};


