export const generateUserInfo = (user) => {
    return `Una o mas propiedades estaban incompletas o no eran validas
    Lista de propiedades requeridas:
    * first_name : Type String, se recibio: ${user.first_name}
    * last_name : Type String, se recibio: ${user.last_name}
    * age : Type Number, se recibio: ${user.age}
    * email : Type String, se recibio: ${user.email}
    * password : Type String, se recibio: ${user.password}`
}