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

const Register=new mongoose.model("Register",registrationSchema);
const Add=new mongoose.model("Add",detailsSchema);

module.exports= {Register,Add};


