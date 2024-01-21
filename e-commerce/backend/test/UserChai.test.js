import "dotenv/config";
import * as chai from 'chai';
import mongoose from "mongoose";
import { userModel } from "../src/models/users.models.js";

const expect = chai.expect 
await mongoose.connect(process.env.MONGO_URL)

describe('Test CRUD Users con chai en api/users', function(){
    before(()=>{
        console.log("Arrancando el test !!!")
    })
    beforeEach(()=>{
        console.log("Comienza el test !!!") 
    })
    it('Obtener todos los usuarios mediante metodo GET', async () =>{
        const users = await userModel.find()
        // expect(Array.isArray(users)).to.be.ok
        // expect(users).equal([])  si esperamos que llegue un array vacio
        //expect(users).to.be.deep.equal([]) si esperamos que llegue un array vacio
        expect(users).not.to.be.deep.equal([]) // si el array contiene datos pasa
    })
    it('Obtener un usuario mediante metodo GET', async () =>{
        const user = await userModel.findById('65490ff9991dbc0a9ce245c1')
        expect(user).to.have.property('_id')
    })
    
    it('Crear un usuario mediante metodo POST', async () => {
        const newUser = {
           first_name: 'Lqwertwano',
           last_name: 'qwerqez',
           age: 26,
           email: 'Luwer@gmail.com',
           password: '12341234'
        }
        const user = await userModel.create(newUser)
        expect(user).to.have.property('_id')
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
         expect(user).to.have.property('_id')
    })
    it('Eliminar un usuario mediante metodo DELETE', async () => {
        const res = await userModel.findByIdAndDelete("6599b290acb5d3151f1094f0")
        expect(res).to.be.ok
    })
})