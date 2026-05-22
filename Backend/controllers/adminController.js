import admin from "../models/adminModel.js";
import bcrypt from 'bcrypt';


export async function register(req,res){
    try {
        const {username, password}=req.body;
        const findUser= await admin.findOne({username});
        if(findUser) return res.status(400).json("User Already Exists");
            const hashed= await bcrypt.hash(password,10);
            const user= await admin.create({username, password:hashed})
            res.status(201).json(user);
        
    } catch (error) {
        console.error("Error Occured When Registering User",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function login(req,res){
    try {
        const {username,password}=req.body;
        const user= await admin.findOne({username})
        if (!user) return res.status(401).json("User Doesn't exist");
        const unhash= await bcrypt.compare(password, user.password)
        if(!unhash) return res.status(401).json("Password Not Correct")
            
        req.session.userId= user._id;
        res.status(200).json({message:"Logged in successfully"})
    } catch (error) {
        console.error("Error Occured When Loging in",error)
        res.status(500).json({message:"Internal Server Error"})

    }
}

export async function logout(req,res){
    try {
        req.session.destroy((err)=>{
            if (err) return res.status(400).json("Failed to logout");
            res.status(200).json("Logged out successfully");
        })
    } catch (error) {
        console.error("Error Occured when logging out",error);
        res.status(500).json({message:'Internal server error'});
    }
}