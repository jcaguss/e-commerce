import { Router } from "express";
import { postLogin,postRegister,getGitHubLogin,getGitHubRegister,getLogaut,getTestJWT,getCurrent } from "../controllers/session.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";
import passport from "passport";

const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'), postLogin)
sessionRouter.post('/register', passport.authenticate('register'), postRegister)
sessionRouter.get('/github', passport.authenticate(('github'), {scope: ['user:email']}), getGitHubLogin)
sessionRouter.get('/githubCallback', passport.authenticate(('github')), getGitHubRegister)
sessionRouter.get('/logaut', getLogaut)
sessionRouter.get('/testJWT', passport.authenticate('jwt', {session: false}), getTestJWT)
sessionRouter.get('/current', passportError('jwt'), authorization('user'), getCurrent)

export default sessionRouter;