const cards_modelos = document.querySelector('#cards_modelos')
const fragment_modelos = document.createDocumentFragment()

// espera a que se cargue la pagina y despues ejecuta los funciones
// tmb busca si hay algo en localstorage y lo pone si hay algo.
const fetchData_modelos = async () => {
    try {
        const res_modelos = await fetch('../json/modelos.json')
        const data_modelos = await res_modelos.json()
        pintarCards_modelos(data_modelos)
    } catch (error) {
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData_modelos()
})

if (cards_modelos) {
    cards_modelos.addEventListener('click', e => {
        addCarrito(e)
    })
}

const pintarCards_modelos = data_modelos => {
    data_modelos.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.nombre
        templateCard.querySelector('.card-tamaño').textContent = producto.clase
        templateCard.querySelector('.card-precio').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.img)
        templateCard.querySelector('.btnPixel').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment_modelos.appendChild(clone)
    })
    cards_modelos.appendChild(fragment_modelos)
}