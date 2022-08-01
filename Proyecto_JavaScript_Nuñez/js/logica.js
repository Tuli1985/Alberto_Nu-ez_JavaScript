//array donde guardo los datos de compra
let carritoDeCompras = [];
let cargaProductos = [];
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("carrito-contenedor");

const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");

const selecVariedad = document.getElementById("selecVariedad");
const textoVacio = document.getElementById("textoVacio");

const contenedorFormulario = document.getElementById("formulario-contenedor");

//esta es una funcion del buscador
selecVariedad.addEventListener("change", () => {
  console.log(selecVariedad.value);
  if (selecVariedad.value == "all") {
    mostrarProductos(cargaProductos);
  } else {
    mostrarProductos(
      cargaProductos.filter(
        (elemento) => elemento.variedad == selecVariedad.value
      )
    );
  }
});

//ajax
async function datosAjax() {
  const resultado = await fetch("js/productos.json");
  const datos = await resultado.json();
  datos.forEach((elemento) => cargaProductos.push(elemento));
  mostrarProductos(cargaProductos);

}
datosAjax();

//esta es mi funcion donde muestro los productos en el navegador
function mostrarProductos(array) {
  contenedorProductos.innerHTML = "";
  array.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML += `<div class="card">
                            <div class="card-image">
                            <img src=${producto.img}>
                            <span class="card-title">${producto.nombre}</span>
                            <a id="boton${producto.id}"class="btn-floating halfway-fab waves-effect waves-dark"><i class="fas fa-cart-arrow-down"></i></a>
                            </div>
                            <div class="card-content">
                                <p>Tipo: ${producto.variedad}</p>
                                <p>Detalle: ${producto.detalle}</p>
                                <p> $${producto.precio}</p>
                            </div>
                        </div>`;
    contenedorProductos.appendChild(div);

    let boton = document.getElementById(`boton${producto.id}`);

    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  });
}

//esta es mi funcion donde agrego los productos al carrito
function agregarAlCarrito(id) {
  let repetido = carritoDeCompras.find((elemento) => elemento.id == id);
  if (repetido) {
    repetido.cantidad = repetido.cantidad + 1;
    actualizarCarrito();
  } else {
    let productoAgregar = cargaProductos.find((elemento) => elemento.id == id);
    carritoDeCompras.push(productoAgregar);
    actualizarCarrito();
  }
  guardarDatos();
  console.log(carritoDeCompras);
}

// esta funcion se encarga de mostrar los prodctos agregados
// o mostrar vacio
function mostrarCarrito() {
  contenedorModal.classList.toggle("modal-active");

  if (carritoDeCompras.length === 0) {
    textoVacio.innerText = "Su Carrito se encuentra vacío 😅";
  } else {
    textoVacio.innerText = "";
    carritoDeCompras.map((elemento) => renderizarProducto(elemento));
    guardarDatos();
  }
}

function cerrarCarrito() {
  contenedorModal.classList.toggle("modal-active");
  contenedorCarrito.replaceChildren();
}

//con esta funcion renderizo segun la accion del usuario
function renderizarProducto(productoAgregar) {
  let div = document.createElement("div");
  div.classList.add("productoEnCarrito");
  div.innerHTML = `<img class="imgModal" src=${productoAgregar.img}>
                    <p>${productoAgregar.nombre}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
                    <button class="boton-eliminar" id="eliminar${productoAgregar.id}"><i class="fas fa-trash"></i></button>`;
  contenedorCarrito.appendChild(div);

  let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`);

  botonEliminar.addEventListener("click", () => {
    if (productoAgregar.cantidad == 1) {
      botonEliminar.parentElement.remove();
      carritoDeCompras = carritoDeCompras.filter(
        (elemento) => elemento.id != productoAgregar.id
      );
      guardarDatos();
    } else {
      productoAgregar.cantidad = productoAgregar.cantidad - 1;
      document.getElementById(
        `cantidad${productoAgregar.id}`
      ).innerHTML = `<p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>`;
      guardarDatos();
    }

    actualizarCarrito();
  });
}

//recuperarDatos y guardarDatos son mis funciones que trabajan con localStorage
function guardarDatos() {
  localStorage.setItem("keyProductos", JSON.stringify(carritoDeCompras));
}

function recuperarDatos() {
  let recuperarStorage = JSON.parse(localStorage.getItem("keyProductos"));
  if (recuperarStorage) {
    carritoDeCompras = recuperarStorage;
  }

  actualizarCarrito();
}

recuperarDatos();

//mi logica de calculo que se mantiene actualizando constantemente mi carrito de compras-
function actualizarCarrito() {
  contadorCarrito.innerText = carritoDeCompras.reduce(
    (acc, el) => acc + el.cantidad,
    0
  );
  precioTotal.innerText = carritoDeCompras.reduce(
    (acc, el) => acc + el.precio * el.cantidad,
    0
  );
}
