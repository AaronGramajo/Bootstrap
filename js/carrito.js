let carrito = {}
const items = document.querySelector('#items')
const footer = document.querySelector('#carrito-footer')
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment_carrito = document.createDocumentFragment()

const addCarrito = e => {
    (e.target.classList.contains('btnPixel')) && setCarrito(e.target.parentElement)
    e.stopPropagation()
}

items.addEventListener('click', e => {
    btnAccion(e)
})

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btnPixel').dataset.id,
        nombre: objeto.querySelector('h5').textContent,
        tamaño: objeto.querySelector('.card-tamaño').textContent,
        precio: objeto.querySelector('.card-precio').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    pintarCarrito()
}

const pintarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre+" "+producto.tamaño
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment_carrito.appendChild(clone)
    })
    items.appendChild(fragment_carrito)
    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad,precio}) => acc + cantidad * precio,0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment_carrito.appendChild(clone)
    footer.appendChild(fragment_carrito)

    const btnVaciar = document.querySelector('#vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
}

const btnAccion = e => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        (producto.cantidad === 0) ? delete carrito[e.target.dataset.id] : carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }

    e.stopPropagation()
}