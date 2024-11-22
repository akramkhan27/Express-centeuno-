import userSchema from "../validation/userValidation.js";
import User from "../models/users.js";

export const createUser= async(req,res)=>{
    const {error}= userSchema.validate(req.body);
    if(error) return res.status(400).send({error: error.details[0].message});

    try{
        const newUser= await User.create(req.body);
        res.status(200).send(newUser);
    }
    catch(e){
        res.status(500).send({error: e.message});
    }
}

export const getUsers= async(req,res)=>{
    try{
        const users= await User.findAll();
        res.status(200).send(users);
    }
    catch(e){
        res.status(500).send({error: e.message});
    }
}

export const getUserById= async(req,res)=>{
    try{
        const user=await User.findOne({where:{id : req.params.id} });
        res.status(200).send(user);
    }
    catch(e){
        res.status(500).send({error: e.message});
    }
}

export const updateUser= async(req, res)=>{
    const {error}= userSchema.validate(req.body);
    if(error) return req.status(400).send({error : error.details[0].message});
    try{
        // const {name,email}= req.body;
        // const [updatedRows]= await User.update({name,email},{where:{id: req.params.id}});

        const [updatedRows]= await User.update(req.body,{where:{id: req.params.id}});
        if(!updatedRows) return res.status(404).send("User not found");

        res.status(200).send({message :"Updation sucussecfully"})
    }
    catch(e){
        console.log(e);
        res.status(500).send({error: e.message});
    }
}

export const deleteUser= async(req,res)=>{
    try{
        const [deletedRows]=await User.destroy({where: {id :req.params.id}});
        if(!deletedRows) return res.status(404).send("User not found");

        res.status(200).send({message: "deleted successfully"})
    }
    catch(e){
        res.status(500).send({error: e.message});
    }
}
