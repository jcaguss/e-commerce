import { Router } from "express";
import { login,register,getGitHubLogin,getGitHubRegister,getLogaut,getCurrent } from "../controllers/session.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";
import passport from "passport";

const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'), login)
sessionRouter.post('/register', passport.authenticate('register'), register)
sessionRouter.get('/github', passport.authenticate(('github'), {scope: ['user:email']}), getGitHubLogin)
sessionRouter.get('/githubCallback', passport.authenticate(('github')), getGitHubRegister)
sessionRouter.get('/logaut', getLogaut)
sessionRouter.get('/current', passportError('jwt'), authorization('user'), getCurrent)

export default sessionRouter;