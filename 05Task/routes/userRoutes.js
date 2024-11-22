import express from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";

const router= express.Router();

router.post("/",createUser);
router.get("/",getUsers);
router.get("/:id", getUserById);
router.delete("/:id",deleteUser);
router.put("/:id",updateUser);

export default router;