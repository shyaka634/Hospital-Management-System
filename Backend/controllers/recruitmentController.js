import recruitment from "../models/recruitmentModel.js";

export async function registerRecruitment(req,res){
    try {
        const { HireDate,Salary,Status,EmployeeId}= req.body;
        const findRecruitment= await recruitment.findOne({EmployeeId})
        if (findRecruitment) return res.status(400).json({message:"User Already exists"});
        const Recruitment= await recruitment.create({HireDate,Salary,Status,EmployeeId});
        res.status(201).json(Recruitment);
    } catch (error) {
        console.error("Error Occured when recruiting Employee", error)
        res.status(500).json({message:"internal Server Error"});
    }
}
export async function getRecruitment(req,res){
    try {

        const getrecruit= await recruitment.find()
               .populate("EmployeeId")
               if(!getrecruit) return res.status(400).json({message:"Invalid employee"})
                   
               res.status(200).json(getrecruit)
       
        
    } catch (error) {
        console.error("Error Occured when recruiting Employee", error)
        res.status(500).json({message:"internal Server Error"});
    }
}