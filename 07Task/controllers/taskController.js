import task from "../models/task.js";
import { Op } from "sequelize";

export const createTask= async(req, res)=>{
    try{
        const {taskTitle, taskDetail}= req.body;
        const userId= req.userId;

        const currentUserTask= await task.create({
            taskTitle, taskDetail, userId
        })

        if(!currentUserTask){
            return res.status(500).json({message: "task not created"});
        }

        res.status(200).json({message : "created task successfully", currentUserTask})
    }
    catch(e){
        console.log(e);
        res.status(400).json({error: e.message});
    }
}

export const getTask= async(req,res)=>{
        try{
            const userId=req.userId;
            const userTasks= await task.findAll({
                where:{
                    userId
                }
            })

            console.log(userTasks);
            res.status(200).json({userTasks});
        }
        catch(e){
            console.log(e);
            res.status(400).json({error: e.message})
        }
}

export const updateTask= async(req, res)=>{
    try{
        const userId=req.userId;
        const {taskTitle, taskDetail}=req.body;
        console.log(req.body);
        const updateTaskId= await task.update(req.body,{
            where :{
                [Op.and]: [{id: req.params.id} ,{userId: userId}]
            }
        })

        res.status(200).json({message: "Data updated successfully", updateDetail})

    }
    catch(e){
        console.log(e);
        res.status(500).json({error: e.message});
    }
}

export const deleteTask= async(req, res)=>{
    try{
        const userId= req.userId;
        const id=req.params.id;
        const deleteTaskId= await task.destroy({
            where: {
                [Op.and]: [{id: id}, {userId: userId}]
            }
        })
        res.status(200).json({message: "Delete task Successfully", deleteTaskId})
    }
    catch(e){
        console.log(e);
        res.status(500).json({error: e.message})
    }
}