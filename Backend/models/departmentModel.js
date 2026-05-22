import mongoose from 'mongoose';
const departmentSchema=new mongoose.Schema({

    DepName:{
        type:String,
        required:true
    },
})

const department= mongoose.model("Department", departmentSchema);
export default department;