import jwt from "jsonwebtoken";

export const tokenValidator= async(req,res, next)=>{
    const token= req.headers["authorization"]
    if(!token) res.status(400).json({message : "No token provided"});

    try{
        const decoded= jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded.id);
        
        req.userId= decoded.id;
        console.log(req.userId);
        next();
    }
    catch(e){
        res.status(400).json({message: "Unauthorized or expired token"});
    }
}