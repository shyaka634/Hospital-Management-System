import staff from "../models/staffModel.js";

export async function registerStaff(req, res){
    try {
        const {postId, FirstName, LastName,Email,Phone, Address, Gender, Date_Of_Birth}= req.body;
        const findStaff= await staff.findOne({Email,Phone})
        if(findStaff) return res.status(400).json ({message:"Employee Already Exists"});
        const Staff= await staff.create({postId, FirstName, LastName,Email,Phone, Address, Gender, Date_Of_Birth})
        res.status(201).json(Staff);
    } catch (error) {
        console.log("Error Occured when creating staff", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}
export async function getAllStaff(req, res){
    try {
        const getstaff= await staff.find()
        .populate("postId")
        res.status(200).json(getstaff)

    } catch (error) {
        console.log("Error Occured when getting staff", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}
export async function getStaffById(req, res){
    try {
        const record= await staff.findById(req.params.id)
        .populate("postId")
        if(!record) return res.status(400).json({message:"Invalid employee"})
            
        res.status(200).json(record)

    } catch (error) {
        console.log("Error Occured when getting staff", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}
export async function updateStaffById(req, res){
    try {
        const update= await staff.findByIdAndUpdate(req.params.id,req.body)
        
        res.status(200).json(update)

    } catch (error) {
        console.log("Error Occured when getting staff", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function deleteStaffById(req, res){
    try {
        await staff.findByIdAndDelete(req.params.id)
        
        res.status(200).json({message:"Deleted Successfully"})

    } catch (error) {
        console.log("Error Occured when getting staff", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

