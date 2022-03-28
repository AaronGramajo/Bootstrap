let procesarCompraContainer = document.querySelector("#procesarCompraContainer");
let procesarCompraTotal = document.querySelector("#procesarCompraTotal");
let precioTotalProcesar = document.querySelector("#precioTotalProcesar");
let btnComprarTodo = document.querySelector('#btn-comprar-todo');

document.addEventListener('DOMContentLoaded', () => {
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
        actualizarCarrito()
        mostrarCarrito()
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
    if (Object.keys(carrito).length === 0 ) {
        procesarCompraContainer.innerHTML = '';
        $(procesarCompraContainer).append(`<h3 class="text-center text-danger mb-5">No tienes productos en tu carrito</h3>`);
        totalProcesarCompra()
    } else {
        procesarCompraContainer.innerHTML = '';
        Object.values(carrito).forEach(producto => {
            $(procesarCompraContainer).append(`
            <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="row row-cols-3">
                <h4><b>*Nombre:</b> ${producto.nombre}</h4>
                <h5><b>*Precio:</b> $ ${producto.precio}</h5>
                <h5><b>*Cantidad:</b> ${producto.cantidad}</h5>
            </div>
        </div>`)}
        )
        totalProcesarCompra()
    }
}