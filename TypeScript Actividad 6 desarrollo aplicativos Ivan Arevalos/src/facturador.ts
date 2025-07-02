interface Producto{
    nombre:string;
    precio: number;
    cantidad: number;
    descuento?:number; //el signo? indica que es opcional
    iva?: number; //opcional, si no se especifica, se asume que no tiene IVA
}
interface Cliente{
    nombre: string;
    email: string;
    telefono: string; //opcional, si no se especifica, no se muestra
}
interface Factura{
    cliente: Cliente;
    productos: Producto[];
    fecha: Date;
    numero: string; //opcional, si no se especifica, se genera uno automáticamente
    }
function Facturarproductos(productos:Producto[]): number{
    let total:number=0;
    for (const producto of productos){
        //calculamos el precio de cada producto con su posible descuento
        let precioUnitario=producto.precio;

        //Si hay descuento lo aplicamos
        if(producto.descuento){
            precioUnitario=precioUnitario*(1-producto.descuento/100);
        }

        //Sumamos al total (precio x cantitdad)
        total+=precioUnitario*producto.cantidad;
    }
    return total;
}
const productosAfacturar:Producto[]=[
    {
        nombre:"Laptop Gaming",
        precio:1200,
        cantidad:1,
        descuento:10
    },
    {
        nombre:"Mouse Inalambrico",
        precio:25,
        cantidad:2,
        //sin descuento
    },
    {
        nombre:"Monitor 24\"",
        precio:300,
        cantidad:1,
        descuento:5 //5% de descuento
    },
    {
        nombre:"Teclado Mecanico",
        precio:80,
        cantidad:1,
        descuento:15 //15% de descuento
    }
];
//Calcular total de la factura
const totalFactura=Facturarproductos(productosAfacturar);

//Mostrar encabezado de la factura
console.log("=".repeat(50));
console.log("        FACTURA DE PRODUCTOS");
console.log("=".repeat(50));

//Mostrar detalle de cada producto
console.log("\nDetalle de productos:");
console.log("-".repeat(50));

productosAfacturar.forEach((producto,index)=>{
    const precioUnitarioConDescuento=producto.descuento
    ? producto.precio*(1-producto.descuento/100)
    : producto.precio;

    const subtotal=precioUnitarioConDescuento*producto.cantidad;

    console.log(`${index+1}.${producto.nombre}`);
    console.log(`      Precio unitario: $${producto.precio.toFixed(2)}`);
    if(producto.descuento){
        console.log(`    Descuento: ${producto.descuento}%`);
        console.log(`    Precio con descuento:  $${precioUnitarioConDescuento.toFixed(2)}`);
    }
    console.log(`        Cantidad: ${producto.cantidad}`);
    console.log(`        Subtotal:  $${subtotal.toFixed(2)}`);
    console.log("");
});

//Mostrar total
console.log("-".repeat(50));
console.log(`TOTAL A PAGAR:  $${totalFactura.toFixed(2)}`);
console.log("=".repeat(50));
import * as fs from 'fs';

function guardarFactura(contenido:string, numeroFactura:string): void {
    fs.writeFileSync(`factura_${numeroFactura}.txt`, contenido);
    console.log(`Factura guardada como factura_${numeroFactura}.txt`);
}