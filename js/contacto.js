let nombre = document.querySelector("#nombre")
let email = document.querySelector("#email")
let mensaje = document.querySelector("#textarea")
let form = document.querySelector("#form")
const botoncontacto = document.querySelector("#btnContacto")

botoncontacto.addEventListener("click", () => {
    if (nombre.value === "" || email.value === "" || mensaje.value === "") {
        Swal.fire({
            icon: 'error',
            title: 'Espera!',
            text: 'Porfavor complete el formulario!',
            confirmButtonText: 'Entendido'
        })
    }
    else {
    Swal.fire({
        icon: 'success',
        title: 'Perfecto!',
        text: 'Nos pondremos en contacto en breve!',
        confirmButtonText: 'Entendido'
    }).then(function(){
        form.submit()
    })
}
})