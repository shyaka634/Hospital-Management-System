export async function Auth(req,res, next){
    if(req.session && req.session.userId){
        next();
    } else{
        res.status(401).json({message:"Not Authenticated"})
    }
}

export default Auth;