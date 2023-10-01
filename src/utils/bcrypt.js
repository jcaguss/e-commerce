import bcript from 'bcrypt'

export const createHash = (password) => bcript.hashSync(password, bcript.genSaltSync(parseInt(process.env.SALT)))

export const validatePassword = (passwordSend, passwordBBD) => bcript.compareSync(passwordSend, passwordBBD)