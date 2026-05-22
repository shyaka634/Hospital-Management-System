import mongoose from 'mongoose'
const postSchema= new mongoose.Schema({
 
    postTitle:{
        type:String,
        required:true
    },
    Department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Department',
        required:true
    }
})
const post= mongoose.model('Post',postSchema);

export default post;
