import { Router } from "express";
import { getUsers,getUserById,putUserById,deleteUserById } from "../controllers/users.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";


const userRouter = Router();

userRouter.get('/', getUsers)  
userRouter.get('/:id', getUserById)
userRouter.put('/:id', putUserById)
userRouter.delete('/:id',passportError('jwt'), authorization('Admin'), deleteUserById)

export default userRouter