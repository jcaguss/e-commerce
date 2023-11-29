export const generateProductInfo = (prod) => {
    return `Una o mas propiedades estaban incompletas o no eran validas
    Lista de propiedades requeridas:
    * tittle : Type String, se recibio: ${prod.tittle}
    * description : Type String, se recibio: ${prod.description}
    * code : Type String, se recibio: ${prod.code}
    * price : Type Number, se recibio: ${prod.price}
    * stock : Type Number, se recibio: ${prod.stock}
    * category : Type String, se recibio: ${prod.category}`
}