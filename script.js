/* Inicio Carrito */
class Carrito {
    constructor() {
        this.items = [];
    }

    // Agrega un producto al carrito
    Agregar(producto) {
        this.items.push(producto);
        console.log(`Producto Agregado con exito`)
        producto.mostrarDatos()
    }

    // Elimina un producto del carrito
    Eliminar(codigo) {
        const indice = this.items.findIndex((item) => item.codigo === codigo);

        if (indice !== -1) {
            const producto = this.BuscarPorId(codigo)
            producto.mostrarDatos()
            this.items.splice(indice, 1);
            console.log(`Producto eliminado con exito`)
        }
    }

    BuscarPorId(codigo) {
        const producto = this.items.find((producto) => producto.codigo === codigo);
        return producto;
    }

    BuscarPorNombre(nombre) {
        const productos = this.items.filter((producto) => producto.nombre.toLowerCase() === nombre.toLowerCase())
        if (productos.length == 0) {
            console.log(`No hay productos con ese nombre: ${nombre}`)
        }
        console.log(`Productos con nombre: ${nombre}`)
        productos.forEach((producto) => {
            producto.mostrarDatos();
        });
        return productos;
    }

    Mostrar() {
        if (this.items.length == 0) {
            console.log(`No hay items en el carrito`)
        }
        this.items.forEach((producto) => {
            producto.mostrarDatos();
        });
    }

    // Obtiene el total del carrito
    get Total() {
        let total = 0;

        for (const item of this.items) {
            total += item.precio;
        }

        return total;
    }
}
carrito = new Carrito()
/* Fin Carrito */

/* Inicio Productos */
class Producto {
    constructor(codigo, nombre, precio) {
        this.codigo = codigo,
            this.nombre = nombre,
            this.precio = precio
    }

    mostrarDatos() {
        console.log(`Codigo: ${this.codigo}, Descripcion: ${this.nombre}, Precio: ${this.precio}`)
    }
}

const productos = [
    new Producto(1, "Arroz", 125),
    new Producto(2, "Fideo", 70),
    new Producto(3, "Pan", 50),
    new Producto(4, "Flan", 100)
];

function ProductosMostrar() {
    productos.forEach((producto) => {
        producto.mostrarDatos();
    });
}

function ProductosBuscarPorId(id) {
    const producto = productos.find((producto) => producto.codigo === id);
    return producto;
}

/* Fin Productos */

function MenuPpal() {
    let salirMenu = false
    do {
        let opcionIngresada = parseInt(prompt(`Ingrese la opción deseada
        1 - Agregar un item al Carrito
        2 - Eliminar un item del Carrito
        3 - Mostrar Carrito
        4 - Mostrar el Total del Carrito
        5 - Buscar Item del Carrito por Nombre
        6 - Mostrar Productos
        0 - Salir del menu`, 0))
        //7 - Mantenimiento de Productos
        switch (opcionIngresada) {
            case 1:
                AgregarItemAlCarrito()
                break
            case 2:
                ElimitarItemDelCarrito()
                break
            case 3:
                carrito.Mostrar()
                break
            case 4:
                console.log(`Total del carrito ${carrito.Total}`)
                break
            case 5:
                nombre = IngresarValidarTexto("nombre del producto:");
                carrito.BuscarPorNombre(nombre)
                break
            case 6:
                ProductosMostrar()
                break
            case 0:
                console.log(`Gracias por utilizar nuestra app. Saludos!`)
                salirMenu = true
                break
            default:
                console.log("Opción no válida, ingrese alguna presente en el menu")
                break
        }
    } while (!salirMenu)
}
MenuPpal()

function AgregarItemAlCarrito() {
    console.log("Seleccione un producto del catalogo")
    let salirMenu = false
    do {
        let opcion = parseInt(prompt(`Ingrese el producto a agregar
        0 - Volver al menu`, 0))
        switch (opcion) {
            case 0:
                console.log(`Gracias por utilizar nuestra app. Saludos!`)
                salirMenu = true
                break
        }
        const producto = ProductosBuscarPorId(opcion)
        if (producto == undefined) {
            console.log(`Seleccione un producto existente del catalogo`)
            continue
        }
        carrito.Agregar(producto)
        salirMenu = true
    } while (!salirMenu)
}

function ElimitarItemDelCarrito() {
    let salirMenu = false
    do {
        let opcion = parseInt(prompt(`Ingrese el producto a eliminar
        0 - Volver al menu`, 0))
        switch (opcion) {
            case 0:
                console.log(`Gracias por utilizar nuestra app. Saludos!`)
                salirMenu = true
                break
        }
        const producto = carrito.BuscarPorId(opcion)
        if (producto == undefined) {
            console.log(`Seleccione un producto existente del catalogo`)
            continue
        }
        carrito.Eliminar(opcion)
        salirMenu = true
    } while (!salirMenu)
}

function IngresarValidarTexto(mensaje) {
    let textoValido = false;
    let texto = "";
    do {
        texto = prompt(`Ingrese ${mensaje}`);
        if (texto.trim() === "") {
            alert(mensaje + " no puede ser vacio.");
            textoValido = false;
            continue;
        }
        textoValido = true;
    } while (!textoValido)
    return texto;
}

/*
function IngresarValidarPrecio(mensaje) {
    let precioValido = false;
    let precio = 0;
    do {
        precio = prompt(`Ingrese ${mensaje}`);
        if (isNaN(precio) || precio <= 0) {
            alert(mensaje + " debe ser un numero y mayor que cero.");
            precioValido = false;
            continue;
        }
        precioValido = true;
    } while (!precioValido)
    return precio;
}
*/