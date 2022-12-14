// Preloader
function fadeOutEffect(fadeTarget) {
    let fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
            fadeTarget.style.display = 'none';
        }
    }, 50);
}
window.onload = function () {
    fadeOutEffect(document.querySelector('.preloader'));
    document.querySelector('main').classList.remove('hidden');
}


// // Variables Globales
let valorDolar;
let ganancia = 1.1;
let localMoneda = 'S/.'
let limitProducts = 4;
let tempArray;

// Get current exchange from API
async function getData() {
    const dataApi = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/pen.json');
    const dataJson = await dataApi.json();
    valorDolar = await dataJson.pen;
    drawCarrito();
    updateCartData();
    drawCards(allProducts, 1);
}
getData();

//UI
// Cart Button
let cartButton = document.getElementById('shop');
let divCart = document.querySelector('.rightAside');
cartButton.onclick = function () {
    divCart.classList.toggle('hidden');
    console.log('toggled');
}

// Constructor de Productos del Carrito
class Product {
    constructor(id, category, name, socket, brand, img, price0, carrito) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.socket = socket;
        this.brand = brand;
        this.img = img;
        this.price0 = price0;
        this.carrito = carrito;
    }
    finalPrice() {
        return Math.ceil((this.price0 * valorDolar) * ganancia);
    }
}

// AllProducts
const allProducts = [
    { id: 1, category: 'procesador', name: 'Ryzen 3 3200g', socket: 'AM4', brand: 'amd', img: 'https://www.amd.com/system/files/styles/992px/private/2019-06/238593-ryzen-3-vega-pib-left-facing-1260x709_0.png?itok=o-efjbjS', price0: 99, finalPrice() { return Math.ceil((this.price0 * valorDolar) * ganancia); } },
    { id: 2, category: 'gpu', name: 'SAPPHIRE RX6500XT', socket: '', brand: 'RADEON', img: 'https://www.impacto.com.pe/storage/products/md/1646928884.jpg', price0: 229, finalPrice() { return Math.ceil((this.price0 * valorDolar) * ganancia); } },
    { id: 3, category: 'procesador', name: 'INTEL CORE I3 12100F', socket: 'LGA 1700', brand: 'intel', img: 'https://www.impacto.com.pe/storage/products/1643408242.jpg', price0: 117, finalPrice() { return Math.ceil((this.price0 * valorDolar) * ganancia); } },
    { id: 4, category: 'procesador', name: 'Ryzen 5 3400g', socket: 'AM4', brand: 'amd', img: 'https://www.amd.com/system/files/styles/992px/private/2019-07/238593-ryzen-5G-pib-right-facing-1260x709.png?itok=0seLB30Y', price0: 159, finalPrice() { return Math.ceil((this.price0 * valorDolar) * ganancia); } },
    { id: 5, category: 'motherboard', name: 'PRIME B450M-A', socket: 'AM4', brand: 'asus', img: 'https://www.asus.com/media/global/products/Mh7JcLMTVjDCnQbz/P_setting_xxx_0_90_end_500.png', price0: 70, finalPrice() { return Math.ceil((this.price0 * valorDolar) * ganancia); } },
    { id: 6, category: 'procesador', name: 'Core i3 10100F', socket: 'LGA1200', brand: 'intel', img: 'https://www.intel.com/content/dam/products/hero/foreground/badge-10th-gen-core-i3-1x1.png', price0: 119, finalPrice() { return Math.ceil((this.price0 * valorDolar) * ganancia); } },
    { id: 7, category: 'procesador', name: 'Core i5 10400F', socket: 'LGA1200', brand: 'intel', img: 'https://www.intel.com/content/dam/products/hero/foreground/badge-10th-gen-core-i5-1x1.png', price0: 169, finalPrice() { return Math.ceil((this.price0 * valorDolar) * ganancia); } },
    { id: 8, category: 'motherboard', name: 'PRIME A320M-K', socket: 'AM4', brand: 'asus', img: 'https://www.asus.com/media/global/products/KRyCoH4XfPYSg5da/P_setting_xxx_0_90_end_500.png', price0: 50, finalPrice() { return Math.ceil((this.price0 * valorDolar) * ganancia); } },
    { id: 9, category: 'motherboard', name: 'B460M DS3H V2', socket: 'LGA1200', brand: 'gigabyte', img: 'https://static.gigabyte.com/StaticFile/Image/Global/c40c2736695f2128f767e2db209cacfa/Product/27255/png/500', price0: 50, finalPrice() { return Math.ceil((this.price0 * valorDolar) * ganancia); } },
    { id: 10, category: 'motherboard', name: 'H410M H', socket: 'LGA1200', brand: 'gigabyte', img: 'https://static.gigabyte.com/StaticFile/Image/Global/e24671ffd4e1db2b626ea6977d254e17/Product/25114/png/500', price0: 40, finalPrice() { return Math.ceil((this.price0 * valorDolar) * ganancia); } },
    { id: 11, category: 'motherboard', name: 'PRIME B460M-A', socket: 'LGA1200', brand: 'asus', img: 'https://www.asus.com/media/global/products/sfalkfod5w5uqkjk/P_setting_xxx_0_90_end_500.png', price0: 60, finalPrice() { return Math.ceil((this.price0 * valorDolar) * ganancia); } },
    { id: 12, category: 'motherboard', name: 'PRIME H410M-E', socket: 'LGA1200', brand: 'asus', img: 'https://www.asus.com/media/global/products/s2i96l2bqhnw1mhz/P_setting_xxx_0_90_end_500.png', price0: 45, finalPrice() { return Math.ceil((this.price0 * valorDolar) * ganancia); } },
    { id: 13, category: 'motherboard', name: 'A320M-S2H', socket: 'AM4', brand: 'gigabyte', img: 'https://static.gigabyte.com/StaticFile/Image/Global/c9d47f21dec878e822db72d94922ee27/Product/20983/png/500', price0: 45, finalPrice() { return Math.ceil((this.price0 * valorDolar) * ganancia); } },
    { id: 14, category: 'motherboard', name: 'B450M DS3H', socket: 'AM4', brand: 'gigabyte', img: 'https://static.gigabyte.com/StaticFile/Image/Global/035cd59de1ee82f0105e4633da728352/Product/21100/png/500', price0: 55, finalPrice() { return Math.ceil((this.price0 * valorDolar) * ganancia); } },

]
// Variables de Usuario
let carrito = [];

// Recuperando datos del carrito
let carritoJSON = localStorage.getItem('carritoJSON');
// console.log(carritoJSON);
if (carritoJSON !== null) {
    let carritoParsed = JSON.parse(carritoJSON)
    carritoParsed.forEach(item => {
        // id, categoria, name, socket, brand, img, price0,c arrito)
        carrito.push(new Product(item.id, item.category, item.name, item.socket, item.brand, item.img, item.price0, item.carrito))
    })
}

// Funcion Busqueda
function handleKeyPress(e) {
    let key = e.keyCode || e.which;
    if (key == 13) {
        e.preventDefault();
        searching(e);
    }
}
function searching(event){
    event.preventDefault()
    let searchText = document.getElementById('inputSearch');
    console.log(searchText.value); 
    let productosFiltrados = allProducts.filter(product => `${product.brand} ${product.name}`.toUpperCase().search(searchText.value.toUpperCase()) > -1)
    drawCards(productosFiltrados, 1);
    console.table(productosFiltrados);
}

// Colocando datos b??sicos del carrito
function updateCartData() {
    let shopCarCount = document.getElementById('shopCarCountI');
    shopCarCount.innerHTML = carrito.length;
}

// Agregando las categor??as de los productos
let categoriasHTML = document.querySelector(".products__ul");
let categoriasInner = '';
let categorias = []
let productos = '';
allProducts.forEach(product => {
    categorias.push(product.category);
    categorias = [...new Set(categorias)];
})
categorias.forEach(categoria => {
    categoriasInner += `<li><a href="#" id="btn${categoria}" onclick="filterbyC('${categoria}')">${categoria.toUpperCase()}</a></li>`
})
categoriasHTML.innerHTML = categoriasInner;

// Filtrando por categor??as
function filterbyC(categoria) {
    let containerBrands = document.querySelector('.brands').classList.remove('hidden');
    let brands = [];
    const productosFiltrados = allProducts.filter(producto => producto.category === categoria);
    productosFiltrados.forEach(producto => {
        brands.push(producto.brand);
        brands = [...new Set(brands)];
    })
    drawCards(productosFiltrados, 1);

    // Generando las marcas de productos
    let brandsHTML = document.querySelector('.brands__ul')
    let brandsInner = '';
    brands.forEach(brand => {
        brandsInner += `<li><a href="#" categoria = "${categoria}" id="btn${brand}" onclick="filterbyCB('${categoria}','${brand}')">${brand.toUpperCase()}</a></li>`
    })
    brandsHTML.innerHTML = brandsInner;
}

// Filtrando por categor??as y marcas
function filterbyCB(categoria, brand) {
    const productos = allProducts.filter(producto => producto.category === categoria && producto.brand === brand);
    drawCards(productos, 1)
}

// Funcion que convierte Arrays en los productos visibles
function drawCards(array, page) {
    tempArray = array
    let productsHTML = document.querySelector('.cards--container');
    let btnBack = document.getElementById('btnBack');
    if (page <= 1) {
        btnBack.innerHTML = `<button class="navButton"><i class="fa-solid fa-chevron-left"></i></button>`
    } else {
        btnBack.innerHTML = `<button class="navButton active" onclick="drawCards(tempArray, ${page - 1})"><i class="fa-solid fa-chevron-left"></i></button>`
    }
    let btnNext = document.getElementById('btnNext');
    if ((array.length / limitProducts) > page) {
        btnNext.innerHTML = `<button class="navButton active" id="btnNext" onclick="drawCards(tempArray, ${page + 1})"><i class="fa-solid fa-chevron-right"></i></button>`
    } else {
        btnNext.innerHTML = `<button class="navButton" id="btnNext"><i class="fa-solid fa-chevron-right"></i></button>`
    }

    let productsInner = '';
    n = ((page - 1) * limitProducts);
    do {
        let producto = array[n];
        if (producto !== undefined) {
            productsInner += `<article class="card">
            <div class="imgContainer">
                <div class="popUp">
                </div>
                <img src="${producto.img || 'https://commons.wikimedia.org/wiki/File:No-Image-Placeholder.svg'}" alt="${producto.name}">
            </div>
            <div class="card--data">
                <h3>${producto.brand.toUpperCase()} ${producto.name.toUpperCase()}</h3>
                <div class="score">
                    <i class="fa-solid fa-star gold"></i>
                    <i class="fa-solid fa-star gold"></i>
                    <i class="fa-solid fa-star gold"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
            </div>
            <button title="Agregar al carrito" category="${producto.category}" brand="${producto.brand}" id="${producto.id}" onclick="addToCart('${producto.id}')" class="addToCart">
                <h4>${localMoneda} ${producto.finalPrice()}<i class="fa-solid fa-cart-plus"></i></h4>
            </button>
        </article>`
            n++;
        } else {
            break;
        }
    } while (n <= (limitProducts * page - 1))
    productsHTML.innerHTML = productsInner;
}

// Funcion para agregar al carrito
function addToCart(id) {
    // Buscar en Carrito
    let productoSeleccionado = carrito.find(obj => obj.id == id)
    if (productoSeleccionado) {
        productoSeleccionado.carrito++;
    } else {
        carrito.push(allProducts.find(obj => obj.id == id))
        let productoSeleccionado = carrito.find(obj => obj.id == id)
        // const getCount = parseInt(productoSeleccionado.carrito) || 0
        let getCount = parseInt(productoSeleccionado.carrito);
        isNaN(getCount) === true && (productoSeleccionado.carrito = 0);
        productoSeleccionado.carrito++;
    }
    drawCarrito();
    updateCartData();
    saveOnLocalStorage();
    showToastfyAlert('Agregado al carrito', 2000)
}

// Funcion para quitar del carrito
function removeFromCart(id) {
    carrito.splice(carrito.indexOf(carrito.find(obj => obj.id == id)), 1)
    drawCarrito();
    updateCartData();
    saveOnLocalStorage();
}

// Funcion que almacena el carrito en el localStorage
function saveOnLocalStorage() {
    let carritoJSON = JSON.stringify(carrito);
    localStorage.setItem('carritoJSON', carritoJSON);
}

// Funcion para mostrar toast
function showToastfyAlert(msj, duration) {
    Toastify({
        text: msj,
        duration: duration,
        gravity: "bottom",
        position: "right",
        style: {
            background: "#FFB400",
            border: "2px solid #2994B2",
            fontSize: '16px',
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

// Funcion que dibuja el carrito desde el array
function drawCarrito() {
    let carritoInner = ''
    let carritoHTML = document.querySelector('.cart')
    carrito.forEach(item => {
        carritoInner += `<div class="cartItem">
        <div class="imgContainer">
            <img src="${item.img}" alt="${item.name}">
        </div>
        <div class="data">
            <h4>${item.name}</h4>
            <div class="oncart">
                <h4>x${item.carrito}</h4>
                <h4>${localMoneda} ${item.finalPrice() * item.carrito}</h4>
            </div>
        </div>
        <button title="Quitar del carrito" onclick="removeFromCart('${item.id}')"><i class="fa-solid fa-cart-arrow-down"></i></button>
    </div>`
    })
    carritoHTML.innerHTML = carritoInner;
    calcularPreciototal()
}

// sumo el total de productos a??adidos al carrito
function calcularPreciototal() {
    let costoTotal = 0;
    function operaciones() {
        costoTotal = carrito.reduce((acumulador, elemento) => acumulador + (elemento.finalPrice() * elemento.carrito), 0)
        return costoTotal;
    }
    document.querySelector(".cartTotal").innerHTML = `<h4>Total:</h4>
    <h4>${localMoneda} ${operaciones()}</h4><button id="btnPagar">Pagar</button>`;
    let btnPagar = document.getElementById('btnPagar');
    btnPagar.onclick = () => {
        compraSatisfactoria()
    };
}

// Accion al pagar
function compraSatisfactoria() {
    Swal.fire({
        title: 'La compra se realiz?? correctamente!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
    }).then((result) => {
        result['isConfirmed'] && ((localStorage.removeItem('carritoJSON'))(location.reload()))
    })
}