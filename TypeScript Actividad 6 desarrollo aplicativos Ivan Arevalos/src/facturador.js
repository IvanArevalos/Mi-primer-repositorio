"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Facturarproductos(productos) {
    var total = 0;
    for (var _i = 0, productos_1 = productos; _i < productos_1.length; _i++) {
        var producto = productos_1[_i];
        //calculamos el precio de cada producto con su posible descuento
        var precioUnitario = producto.precio;
        //Si hay descuento lo aplicamos
        if (producto.descuento) {
            precioUnitario = precioUnitario * (1 - producto.descuento / 100);
        }
        //Sumamos al total (precio x cantitdad)
        total += precioUnitario * producto.cantidad;
    }
    return total;
}
var productosAfacturar = [
    {
        nombre: "Laptop Gaming",
        precio: 1200,
        cantidad: 1,
        descuento: 10
    },
    {
        nombre: "Mouse Inalambrico",
        precio: 25,
        cantidad: 2,
        //sin descuento
    },
    {
        nombre: "Monitor 24\"",
        precio: 300,
        cantidad: 1,
        descuento: 5 //5% de descuento
    },
    {
        nombre: "Teclado Mecanico",
        precio: 80,
        cantidad: 1,
        descuento: 15 //15% de descuento
    }
];
//Calcular total de la factura
var totalFactura = Facturarproductos(productosAfacturar);
//Mostrar encabezado de la factura
console.log("=".repeat(50));
console.log("        FACTURA DE PRODUCTOS");
console.log("=".repeat(50));
//Mostrar detalle de cada producto
console.log("\nDetalle de productos:");
console.log("-".repeat(50));
productosAfacturar.forEach(function (producto, index) {
    var precioUnitarioConDescuento = producto.descuento
        ? producto.precio * (1 - producto.descuento / 100)
        : producto.precio;
    var subtotal = precioUnitarioConDescuento * producto.cantidad;
    console.log("".concat(index + 1, ".").concat(producto.nombre));
    console.log("      Precio unitario: $".concat(producto.precio.toFixed(2)));
    if (producto.descuento) {
        console.log("    Descuento: ".concat(producto.descuento, "%"));
        console.log("    Precio con descuento:  $".concat(precioUnitarioConDescuento.toFixed(2)));
    }
    console.log("        Cantidad: ".concat(producto.cantidad));
    console.log("        Subtotal:  $".concat(subtotal.toFixed(2)));
    console.log("");
});
//Mostrar total
console.log("-".repeat(50));
console.log("TOTAL A PAGAR:  $".concat(totalFactura.toFixed(2)));
console.log("=".repeat(50));
var fs = require("fs");
function guardarFactura(contenido, numeroFactura) {
    fs.writeFileSync("factura_".concat(numeroFactura, ".txt"), contenido);
    console.log("Factura guardada como factura_".concat(numeroFactura, ".txt"));
}
