import "dotenv/config";
import mongoose from "mongoose";
import { userModel } from "../src/models/users.models.js";
import Assert from 'assert'

const assert = Assert.strict
await mongoose.connect(process.env.MONGO_URL)

describe('Test CRUD de Usuarios de la ruta api/users', function(){
    before(()=>{
        console.log("Arrancando el test !!!")
    })
    beforeEach(()=>{
        console.log("Comienza el test !!!") 
    })
    it('Obtener todos los usuarios mediante metodo GET', async () =>{
        const users = await userModel.find()
        assert.strictEqual(Array.isArray(users),true)
    })
    it('Obtener un usuario mediante metodo GET', async () =>{
        const user = await userModel.findById('65490ff9991dbc0a9ce245c1')
        // assert.strictEqual(typeof user, 'object')
        assert.ok(user._id)
    })
    
    it('Crear un usuario mediante metodo POST', async () => {
        const newUser = {
           first_name: 'Juliana',
           last_name: 'Dudok',
           age: 33,
           email: 'DudoJuliana@gmail.com',
           password: '43211234'
        }
        const user = await userModel.create(newUser)
        assert.ok(user._id)
   })
    it('Modificar un usuario mediante metodo PUT', async () => {
         const updateUser = {
            first_name: 'Pepe',
            last_name: 'Acosta',
            age: 43,
            email: 'pepeacostado@gmail.com',
            password: '12341234'
         }
         const user = await userModel.findByIdAndUpdate('64fe11ee00c7892f42bf09d9',updateUser)
         assert.ok(user._id)
    })
    it('Eliminar un usuario mediante metodo DELETE', async () => {
        const res = await userModel.findByIdAndDelete("657643126a341c9967a09879")
        assert.strictEqual(typeof res, 'object')
    })
})