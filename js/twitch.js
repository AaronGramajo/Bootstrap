const cards_twitch = document.querySelector('#cards_twitch')
const fragment_twitch = document.createDocumentFragment()

const fetchData_twitch = async () => {
    try {
        const res_twitch = await fetch('../json/twitch.json')
        const data_twitch = await res_twitch.json()
        pintarCards_twitch(data_twitch)
    } catch (error) {
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData_twitch()
})

if (cards_twitch) {
    cards_twitch.addEventListener('click', e => {
        addCarrito(e)
    })
}

const pintarCards_twitch = data_twitch => {
    data_twitch.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.nombre
        templateCard.querySelector('.card-tamaño').textContent = producto.clase
        templateCard.querySelector('.card-precio').textContent = "$"+producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.img)
        templateCard.querySelector('.btnPixel').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment_twitch.appendChild(clone)
    })
    cards_twitch.appendChild(fragment_twitch)
}