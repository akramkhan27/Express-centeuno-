import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { createTask, deleteTask, getTask, updateTask } from "../controllers/taskController.js";
import { tokenValidator } from "../token/tokenValidator.js";

const router= express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/todo",tokenValidator, createTask)
router.get("/todo",tokenValidator, getTask)
router.put("/todo/:id",tokenValidator, updateTask)
router.delete("/todo/:id",tokenValidator, deleteTask)

export default router;