const cards_pixel = document.querySelector('#cards_pixel')
const templateCard = document.querySelector('#template-card').content
const fragment_pixel = document.createDocumentFragment()

const fetchData = async () => {
    try {
        const res = await fetch('../json/pixel.json')
        const data = await res.json()
        pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})

if (cards_pixel) {
    cards_pixel.addEventListener('click', e => {
        addCarrito(e)
    })
}

const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.nombre
        templateCard.querySelector('.card-tamaño').textContent = producto.tamaño
        templateCard.querySelector('.card-precio').textContent = "$"+producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.img)
        templateCard.querySelector('.btnPixel').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment_pixel.appendChild(clone)
    })
    cards_pixel.appendChild(fragment_pixel)
}