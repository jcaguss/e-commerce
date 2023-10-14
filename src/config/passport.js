import local from 'passport-local'
import GithubStrategy from 'passport-github2'
import jwt from "passport-jwt"
import passport from 'passport'
import { createHash, validatePassword } from '../utils/bcrypt.js'
import {userModel} from '../models/users.models.js'

// ---- Defino la estrategia a utilizar ----
const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt


const initializePassport = () => {

    const cookieEstractor = req => {
        const token = req.cookies.jwtCookie ? req.cookies.jwtCookie : {}
        console.log(token)
        return token
    }

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieEstractor]),
        secretOrKey: process.env.JWT_SECRET
    }, async (jwt_payload, done) =>{
        try {
            console.log(jwt_payload)
            return done(null,jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('register',new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async (req,username, password, done) => {
            // ---- Registro de Usuario ----
            const {first_name, last_name, age, email} = req.body
            try{
                const user = await userModel.findOne({ email: username })
                
                if(user){
                    // ---- error por usuario ya existente ----
                    return done(null, false)
                }

                const passwordHash = createHash(password)
                const userCreated = await userModel.create({
                    first_name: first_name,
                    last_name: last_name,
                    age: age,
                    email: email,
                    password: passwordHash
                })

                return done(null, userCreated)

            }catch(error){
                return done(error)
            }
    }))

    passport.use('login', new LocalStrategy(
        {usernameField: 'email'}, async (username, password, done) => {
            try{
                const user = await userModel.findOne({email: username})

                if(!user){
                    return done(null, false)
                }

                if(validatePassword(password, user.password)){
                    return done(null, user)
                }

                return done(null, false)
            }catch(error){
                return done(error)
            }
        }
    ))

    passport.use('github', new GithubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.SECRET_CLIENT,
        callbackURL: process.env.CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try{
            const user = await userModel.findOne({email: profile._json.email})
            if(user){
                done(null, false)
            }else{
                const userCreated = await userModel.create({
                    first_name: profile._json.name,
                    last_name: ' ',
                    age: 18, // Edad por defecto
                    email: profile._json.email,
                    password: createHash(profile._json.email + profile._json.name)
                })
                done(null, userCreated)
            }

        }catch(error){
            done(error)
        }
    }))

    // ---- Inicializamos la session del usuario ----
    passport.serializeUser((user,done) => {
        done(null, user._id)
    })
    // ---- Eliminamos la session del usuario ----
    passport.deserializeUser(async (id, done) =>{
        const user = await userModel.findOne({id})
        done(null, user)
    })
}

export default initializePassport