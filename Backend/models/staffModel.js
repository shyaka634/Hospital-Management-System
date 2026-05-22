import mongoose from 'mongoose'
const staffSchema= new mongoose.Schema({

    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Phone:{
        type:String,
        unique:true,
        required:true
    },
    Address:{
        type:String,
    },
    Gender:{
        type:String,
        enum:['male','female'],
        lowercase:true,
        required:true
    },
    Date_Of_Birth:{
        type:Date,
        required:true
    },
},{timestamps:true})

const staff= mongoose.model('Staff', staffSchema)

export default staff;