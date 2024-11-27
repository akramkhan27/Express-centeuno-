import {login, register} from "../validator/validate.js"
import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const registerUser= async(req,res)=>{
    try{
        const {value, error}= register.validate(req.body);
        if(error) return res.status(400).json({error : error.details[0].message})
        console.log(value);
        const {username, mobile, password}= value;

        const existUser= await user.findOne({
            where: {
                [Op.or]: [
                    {username: username},
                    {mobile: mobile}
                ]
            }
        })

        if(existUser) return res.status(400).json({message: "User already exist"});
        console.log(password);
        const hashedPassword= bcrypt.hashSync(password, 8);

        const newUser= await user.create({username, mobile, password: hashedPassword});
        if(!newUser) return res.status(500).json("User not created")

        res.status(201).json({message: "Registeration successfully"});
    }
    catch(e){
        console.log(e);
        res.status(500).json({error: e.message});
    }
}

export const loginUser= async(req,res)=>{
    try{
        const {value,error}= login.validate(req.body);
        if(error) return res.status(400).json({error: error.details[0].message})

        const {usernameOrMobile, password}= value;
        console.log(password);
        const myUser= await user.findOne({
            where:{
                [Op.or]:[
                    {username: usernameOrMobile},
                    {mobile: usernameOrMobile}
                ]
            }
        })
        if(!myUser){
            res.status(400).json({message: "User not available"});
        }
        const ispasswordValid= bcrypt.compareSync(password, myUser.password);
        if(!ispasswordValid) return res.status(400).json({message: "wrong password"});

        const token= jwt.sign({
            id: myUser.id, username: myUser.username
        }, 
        process.env.JWT_SECRET_KEY, 
        {expiresIn: "10m"}
        );

        res.status(200).json({
            message: "Succesfully Login",
            token
        })

    }
    catch(e){
        console.log(e);
        res.status(500).json({error: e.message});
    }
}