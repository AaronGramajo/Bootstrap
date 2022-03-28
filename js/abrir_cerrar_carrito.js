// para abrir y cerrar el carrito
const carritoToggle = document.querySelector("#carritoIcono");

carritoToggle.addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('active')
});
// una funcion para poder usarlo
const abrir_cerrarCarrito = () => {
    document.getElementById('sidebar').classList.toggle('active')
}