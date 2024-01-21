import { Router } from "express";
import { getUsers,getUserById,putUserById,deleteUserById,passwRec,accPassRec } from "../controllers/users.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";


const userRouter = Router();

userRouter.get('/',passportError('jwt'), authorization('Admin'), getUsers)  
userRouter.get('/:id',passportError('jwt'), authorization('Admin'), getUserById)
userRouter.put('/:id',passportError('jwt'), authorization('Admin'), putUserById)
userRouter.delete('/:id',passportError('jwt'), authorization('Admin'), deleteUserById)
userRouter.post('/password-recovery',passportError('jwt'), authorization('user'), passwRec)
userRouter.post('/reset-password/:token',passportError('jwt'), authorization('user'), accPassRec)


export default userRouter