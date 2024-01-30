import { Router } from "express";
import { getUsers,getUserById,putUserById,deleteUserById,passwRec,accPassRec } from "../controllers/users.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";
import { upload } from "../config/multer.js";


const userRouter = Router();

userRouter.get('/',passportError('jwt'), authorization('Admin'), getUsers)  
userRouter.get('/:id',passportError('jwt'), authorization('Admin'), getUserById)
userRouter.put('/:id',passportError('jwt'), authorization('Admin'), putUserById)
userRouter.delete('/:id',passportError('jwt'), authorization('Admin'), deleteUserById)
userRouter.post('/:id/documents', (req,res) => {
    console.log(req.body)
    console.log(req.file)
    res.status(200).send("Imagen cargada")
});
userRouter.post('/password-recovery',passportError('jwt'), authorization('user'), passwRec)
userRouter.post('/reset-password/:token',passportError('jwt'), authorization('user'), accPassRec)


export default userRouter