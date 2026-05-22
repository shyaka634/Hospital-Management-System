import Department from '../models/departmentModel.js'

export async function insertDepartment(req,res){
    try {
        const { DepName}= req.body;
        const findDepartment= await Department.findOne({DepName})
        if(findDepartment) return res.status(400).json("Department Already Exists");
        const registerDepartment= await Department.create({DepName})
        res.status(201).json(registerDepartment);
    } catch (error) {
        console.error("Error Occured when inserting Department",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function getAllDepartments(req, res){
    try {
        const departments = await Department.find().sort({ DepName: 1 });
        res.status(200).json(departments);
    } catch (error) {
        console.error("Error Occured when getting Departments", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}