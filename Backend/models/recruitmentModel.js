import mongoose from 'mongoose'

const recruitmentSchema= new mongoose.Schema({
    HireDate:{
        type:Date,
        required:true
    },
    Salary:{
        type:String,
        required:true
    },
    Status:{
        type: String,
        required:true
    },
    EmployeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required:true
    }
})

const recruitment= mongoose.model('Recruitment',recruitmentSchema)

export default recruitment;