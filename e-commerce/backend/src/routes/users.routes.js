import { Router } from "express";
import { getUsers,getUserById,putUserById,deleteUserById,passwRec,accPassRec,deleteInactiveUsers } from "../controllers/users.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";
import { upload } from "../config/multer.js";


const userRouter = Router();

userRouter.get('/', passportError('jwt'), authorization('user'), getUsers)
userRouter.get('/:id', passportError('jwt'), authorization('admin'), getUserById)
userRouter.put('/:id', passportError('jwt'), authorization('admin'), putUserById)
userRouter.delete('/deleteInactiveUsers', passportError('jwt'), authorization('admin'), deleteInactiveUsers)
userRouter.delete('/:id', passportError('jwt'), authorization('admin'), deleteUserById)
userRouter.post('/:id/documents', (req,res) => {
    console.log(req.body)
    console.log(req.file)
    res.status(200).send("Imagen cargada")
});
userRouter.post('/password-recovery',passportError('jwt'), authorization('admin'), authorization('user'), passwRec)
userRouter.post('/reset-password/:token',passportError('jwt'), authorization('admin'), authorization('user'), accPassRec)


export default userRouter