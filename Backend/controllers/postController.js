import post from "../models/postModel.js";

export async function insertPost(req,res){
    try {
        const {postTitle, Department} = req.body;
        const findPost= await post.findOne({postTitle})
        if(findPost) return res.status(400).json({message:"Post Already Exist"});
        const Post= await post.create({postTitle, Department})
        res.status(201).json(Post);
    } catch (error) {
        console.error("Error Occured when creating post", error);
        res.status(500).json({message:"Internal Server error"})
    }
}

export async function getAllPosts(req, res){
    try {
        const posts = await post.find()
            .populate('Department')
            .sort({ postTitle: 1 });
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error Occured when getting posts", error);
        res.status(500).json({message:"Internal Server error"})
    }
}