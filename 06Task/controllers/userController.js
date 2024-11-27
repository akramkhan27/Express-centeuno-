import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import user from "../models/user.js";
import {register, login} from "../validation/validate.js";
import {Op} from "sequelize";

export const registerUser= async(req,res)=>{
    try{
        const {value, error}= register.validate(req.body);
        const{username, mobile, password}=value;
        // console.log(register.validate(req.body));

        const existingUser= await user.findOne({
            where : {
                [Op.or]: [
                    {username: username}, 
                    {mobile: mobile}
                ]
            }
        });

        if(existingUser) return res.status(400).json({message :"User already exists"});

        const hashThePassword= bcrypt.hashSync(password,8);

        console.log(hashThePassword);
        const newUser= await user.create({username, mobile, password :hashThePassword});
        res.status(201).json({message: "Registration successfully"});
    }
    catch(e){
        console.log(e);
        res.status(500).json({error: e.message });

    }
}

export const loginUser= async(req,res)=>{
    try{
        const {value,error}=  login.validate(req.body);
        if(error){
            res.status(400).json({error: error.details[0].message});
        }

        console.log(value);
        const { mobileOrUsername, password}=value;

        console.log(mobileOrUsername);
        
        // const ismobile= /^[0-9]{10}$/.test(mobileOrUsername);

        // const user= await user.findOne({where: ismobile? {mobile: ismobile}: {username: mobileOrUsername}});

       const myuser=await user.findOne({
        where :{ 
            [Op.or] : [{mobile: mobileOrUsername},{ username: mobileOrUsername}]
        }
    })



        const isPasswordValid= bcrypt.compareSync(password, myuser.password);
        if(!isPasswordValid){
            return res.status(401).json({message : "wrong password"});
        }

        const token=jwt.sign({id :myuser.id, username: myuser.username}, process.env.JWT_SECRET_KEY, {expiresIn: "10m"});
        res.status(201).json({message: "Login SuccessFull", token });
    }
    catch(e){
        console.log(e);
        res.status(500).json({error: e.message});
    }
}
