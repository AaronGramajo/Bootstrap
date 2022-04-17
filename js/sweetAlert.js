let procesarCompraContainer = document.querySelector("#procesarCompraContainer");
let procesarCompraTotal = document.querySelector("#procesarCompraTotal");
let precioTotalProcesar = document.querySelector("#precioTotalProcesar");
let btnComprarTodo = document.querySelector('#btn-comprar-todo');
const templateprocesarCompra = document.getElementById('template-procesarCompras').content
const fragment_procesarCompra = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
    procesarCompra()
});

btnComprarTodo.addEventListener('click', e => {
    e.preventDefault();
    if (Object.keys(carrito).length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Vaya!',
            text: 'No puedes comprar sin productos en tu carrito!',
            confirmButtonText: 'Entendido'
        })
    } else {
        carrito = {}
        pintarCarrito()
        pintarFooter()
        procesarCompra()
        Swal.fire({
            icon: 'success',
            title: 'Excelente compra!',
            text: 'En breve recibirás tus productos!',
            confirmButtonText: 'Genial!'
        })
    }
})

const totalProcesarCompra = () => {
    precioTotalProcesar.innerText = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0 )
}

const procesarCompra = () => {
    procesarCompraContainer.innerHTML = '';
    if (Object.keys(carrito).length === 0 ) {
        procesarCompraContainer.innerHTML =`<h3 class="text-center text-danger mb-5">No tienes productos en tu carrito</h3>`;
        totalProcesarCompra()
    } else {
        procesarCompraContainer.innerHTML = '';
        Object.values(carrito).forEach(producto => {
            templateprocesarCompra.querySelectorAll('h4')[0].textContent = "*Nombre: "+producto.nombre
            if(producto.tamaño){
                templateprocesarCompra.querySelectorAll('h4')[1].textContent = "*Clase/tamaño: "+producto.tamaño
            }
            if(producto.clase){
                templateprocesarCompra.querySelectorAll('h4')[1].textContent = "*Clase/tamaño: "+producto.clase
            }
            templateprocesarCompra.querySelectorAll('h5')[0].textContent = "*precio: $"+producto.precio
            templateprocesarCompra.querySelectorAll('h5')[1].textContent = "*cantidad: "+producto.cantidad

            const clone = templateprocesarCompra.cloneNode(true)
            fragment_procesarCompra.appendChild(clone)
        })
        procesarCompraContainer.appendChild(fragment_procesarCompra)

        totalProcesarCompra()
    }
}