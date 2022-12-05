
const contenedorProductos = document.getElementById('contenedor-productos')

//TERCER PASO

const contenedorCarrito = document.getElementById('carrito-contenedor')
//SEXTO PASO
const botonVaciar = document.getElementById('vaciar-carrito')
//MODIFICAR LOS CONTADORES
const contadorCarrito = document.getElementById('contadorCarrito')

//OCTAVO PASO
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})
//SEXTO PASO
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

//PRIMER PRIMER PASO
// crear el elemento 

stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Categoria: ${producto.categoria}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)

    //2 - SEGUNDO PASO,
    const boton = document.getElementById(`agregar${producto.id}`)
    //Por cada elemento del array, crear un div, poner un id particular
    //get element by id (el de agregar) Obtengo el elemento y agregaar
    //el add event listener

    boton.addEventListener('click', () => {
        //esta funcion ejecuta el agregar el carrito con la id del producto
        agregarAlCarrito(producto.id)
        //
    })
})

// 1- PRIMER PASO

//AGREGAR AL CARRITO

const agregarAlCarrito = (prodId) => {

    
    const existe = carrito.some (prod => prod.id === prodId) 
    //comprobar si el elemento ya existe 

    if (existe){ //SI YA EXISTE, ACTUALIZAR
        const prod = carrito.map (prod => { //creaarray e iteramos 
            // cuando map encuentre el igual al agregado sumar la cantidad
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { //SI NO ESTA, AGREGAMOS 
        const item = stockProductos.find((prod) => prod.id === prodId)
    
        carrito.push(item)
    }
    //busca el item 
    //agregarlo al carrito  
    //llama a actualizarCarrito, que recorre carrito
    actualizarCarrito() //LLAMAMOS A LA FUNCION CADA VEZ Q SE MODIFICA EL CARRITO
}
//agregarAlCarrito(1) 
//Le pasamos el ID por parametro. Tenemos que asigarle como evento esta funcion al boton
//con el id de su producto correspondiente

// 5 - QUINTO PASO
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) //Busca el elemento y nos devuelve su indice

    carrito.splice(indice, 1) //Le pasamos el indice de ITEM y borramos 
     
    actualizarCarrito() //LLAMAR A LA FUNCION CADA VEZ Q SE MODIFICA EL CARRITO 
    
    console.log(carrito)
}

const actualizarCarrito = () => {
    //4- CUARTO PASO
    
    contenedorCarrito.innerHTML = "" 
    //recorro el array lo actualizo 
    
    //3 - TERCER PASO. 
    //AGREGAR AL MODAL. 
    //Recorremos sobre el array de carrito.

    //Por cada producto crear div y le haces un append al contenedorCarrito 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    //SEPTIMO PASO
    contadorCarrito.innerText = carrito.length 
    //OCTAVO PASO
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    //Por cada producto al acumulador le suma la propiedad precio, con el acumulador
    

}
