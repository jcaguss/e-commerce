const form = document.getElementById('formulario')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target) //Me genera un objeto iterador
    const userlog = Object.fromEntries(datForm) //De un objeto iterable genero un objeto simple
    fetch('/login', {
        method: 'POST',
        body: JSON.stringify(userlog)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        e.target.reset();
    })
    .catch(error => {
        console.error({'Error en la solicitud:': error});
    });
})

function cargarErrores(id, idMensaje) {
    let elementNombre = document.getElementById(id);
    let elementError = document.getElementById(idMensaje);
    if(elementNombre.value ==='' || elementError.value === null){
        elementError.style.display = "block";
        elementError.style.color = "rgba(231, 26, 26, 0.5)";
        elementNombre.classList.add("error");
        if(elementNombre.id === 'email'){
            elementError.innerHTML ='Debe ingresar un email valido'; 
        }else{
            elementError.innerHTML = 'Debe ingresar un password valido';
        }
    }else{
        elementError.style.display = "none";
        elementNombre.classList.remove("error");
    }
}