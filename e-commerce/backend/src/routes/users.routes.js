import { Router } from "express";
import { getUsers,getUserById,putUserById,deleteUserById } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get('/', getUsers)  
userRouter.get('/:id', getUserById)
userRouter.put('/:id', putUserById)
userRouter.delete('/:id', deleteUserById)

export default userRouter