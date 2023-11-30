export const generateProductInfo = (prod) => {
    return `Una o mas propiedades estaban incompletas o no eran validas
    Lista de propiedades requeridas:
    * title : Type String, se recibio: ${prod.title}
    * description : Type String, se recibio: ${prod.description}
    * code : Type String, se recibio: ${prod.code}
    * price : Type Number, se recibio: ${prod.price}
    * stock : Type Number, se recibio: ${prod.stock}
    * category : Type String, se recibio: ${prod.category}`
}