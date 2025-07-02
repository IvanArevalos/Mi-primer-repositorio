interface Reserva
{
numeroReserva: number;
nombreHuesped: string;
tipoHabitacion: string;
fechaIngreso: Date;
fechaSalida: Date;
temporada: string;
tipoHuesped: string;
serviciosAdicionales: string[];
}
interface ReporteReserva{
numeroReserva: number;
nombreHuesped: string;
tipoHabitacion: string;
diasEstadia: number;
costoBase: number;
costoServicios: number;
descuento: number;
costoTotal: number;
}
function calcularDiasEstadia(fechaIngreso: Date, fechaSalida: Date): number {
    const diferenciaTiempo = fechaSalida.getTime() - fechaIngreso.getTime();
    return Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));
}
function calcularCostoBase(tipoHabitacion:string, temporada:string, dias:number):number{
    const Preciotemporadaalta= {
        "Simple": 100,
        "Doble": 180,
        "Suite": 350
    }
    const Preciotemporadabaja = {
        "Simple": 80,
        "Doble": 120,
        "Suite": 250
    }
    if (temporada === "Alta") {
        return Preciotemporadaalta[tipoHabitacion] * dias;
    } else {
        return Preciotemporadabaja[tipoHabitacion] * dias;
    }
}
function calcularCostoServicios(servicios:string[],dias:number):number{
    const costoservicios={
        "desayuno": 25,
        "wifi": 10,
        "spa": 50,
        "estacionamiento": 15,
        "lavanderia": 20
    }
    let costoTotal = 0;
    for (const servicio of servicios) {
        if (costoservicios[servicio]) {
            costoTotal += costoservicios[servicio] * dias;
        }
        else {
            console.warn(`Servicio no reconocido: ${servicio}`);
        }
    }
    return costoTotal;

}
function calcularDescuento(costoBase:number,costoServicios:number,tipoHuesped:string, dias:number):number{
    let descuento = 0;
    if (tipoHuesped === "VIP") {
        descuento = (costoBase + costoServicios) * 0.15; // 15% de descuento
    } else if (tipoHuesped === "Corporativo") {
        descuento = (costoBase + costoServicios) * 0.10; // 10% de descuento
    }
    if(dias > 7) {
        descuento += (costoBase + costoServicios) * 0.05; // 5% adicional si la estadía es mayor a 7 días
    }
    return descuento;
}
function procesarReservas(reservas:Reserva[]):ReporteReserva[]{
    const reportes: ReporteReserva[] = [];
    let ingresostotales = 0;
    let reservasimple=0;
    let reservadoble=0;
    let reservasuite=0;
    let diasestadiatotales=0;
    let ingresostotalesalta=0;
    let ingresostotalesbaja=0;
    for( const reserva of reservas){
        const diasEstadia = calcularDiasEstadia(reserva.fechaIngreso, reserva.fechaSalida);
        const costoBase = calcularCostoBase(reserva.tipoHabitacion, reserva.temporada, diasEstadia);
        const costoServicios = calcularCostoServicios(reserva.serviciosAdicionales, diasEstadia);
        const descuento = calcularDescuento(costoBase, costoServicios, reserva.tipoHuesped, diasEstadia);
        const costoTotal = (costoBase + costoServicios) - descuento;

        let reporte: ReporteReserva = {
            numeroReserva: reserva.numeroReserva,
            nombreHuesped: reserva.nombreHuesped,
            tipoHabitacion: reserva.tipoHabitacion,
            diasEstadia: diasEstadia,
            costoBase: costoBase,
            costoServicios: costoServicios,
            descuento: descuento,
            costoTotal: costoTotal
        };
        if(reserva.tipoHabitacion === "Simple") {
            reservasimple++;
        }
        else if(reserva.tipoHabitacion === "Doble") {   
            reservadoble++;
        }
        else if(reserva.tipoHabitacion === "Suite") {
            reservasuite++;
        }
        ingresostotales+= costoTotal;
        diasestadiatotales+=diasEstadia;
        if(reserva.temporada === "Alta") {
            ingresostotalesalta+=costoTotal;
        }
        else if(reserva.temporada === "Baja") {
            ingresostotalesbaja+=costoTotal;
        }
        reportes.push(reporte);
        console.log(`Reserva #${reporte.numeroReserva} - Huesped: ${reporte.nombreHuesped}`);
        console.log(`Tipo de Habitación: ${reporte.tipoHabitacion}`);
        console.log(`Días de Estadia: ${reporte.diasEstadia} (${reserva.fechaIngreso.toLocaleDateString()} a ${reserva.fechaSalida.toLocaleDateString()})`);
        console.log(`Temporada: ${reserva.temporada}`);
        console.log(`Tipo de Huesped: ${reserva.tipoHuesped}`);
        console.log("");
        console.log(`Costo Base: $${reporte.costoBase} (${reporte.diasEstadia} días x ${(reserva.tipoHabitacion==="Simple" && reserva.temporada==="Alta") ? "100" : (reserva.tipoHabitacion==="Simple" && reserva.temporada==="Baja") ? "80" : (reserva.tipoHabitacion==="Doble" && reserva.temporada==="Alta") ? "180" : (reserva.tipoHabitacion==="Doble" && reserva.temporada==="Baja") ? "120" : (reserva.tipoHabitacion==="Suite" && reserva.temporada==="Alta") ? "350" : "250"})`);
        console.log(`Costo de Servicios: $${reporte.costoServicios}`);
        console.log(`Descuento Aplicado: $${reporte.descuento}`);
        console.log(`Costo Total: $${reporte.costoTotal}`);
        console.log("");
    }
    let diasestadiapromedio = diasestadiatotales / reservas.length;
    console.log("INGRESOS TOTALES: $" + ingresostotales, `($${ingresostotalesalta} en temporada alta, $${ingresostotalesbaja} en temporada baja)`);
    console.log("RESERVAS PROCESADAS: " + reservas.length + " (Simple: " + reservasimple + ", Doble: " + reservadoble + ", Suite: " + reservasuite + ")");
    console.log("DIAS ESTADIA PROMEDIO: " + diasestadiapromedio);

    return reportes;
}
const reservasHotel: Reserva[] = [
    {
        numeroReserva:1,
        nombreHuesped: "Ana Garcia",
        tipoHabitacion: "Suite",
        fechaIngreso: new Date("2024-07-15"),
        fechaSalida: new Date("2024-07-18"),
        temporada: "Alta",
        tipoHuesped: "VIP",
        serviciosAdicionales: ["desayuno", "wifi", "spa"]
    },
    {
        numeroReserva:2,
        nombreHuesped: "Carlos Lopez",
        tipoHabitacion: "Doble",
        fechaIngreso: new Date("2024-09-10"),
        fechaSalida: new Date("2024-09-13"),
        temporada: "Baja",
        tipoHuesped: "Corporativo",
        serviciosAdicionales: ["desayuno", "wifi", "estacionamiento"]
    },
    {
        numeroReserva:3,
        nombreHuesped: "Maria Rodriguez",
        tipoHabitacion: "Simple",
        fechaIngreso: new Date("2024-08-20"),
        fechaSalida: new Date("2024-08-22"),
        temporada: "Alta",
        tipoHuesped: "Regular",
        serviciosAdicionales: ["wifi"]
    },
    {
        numeroReserva:4,
        nombreHuesped: "Juan Perez",
        tipoHabitacion: "Doble",
        fechaIngreso: new Date("2024-06-01"),
        fechaSalida: new Date("2024-06-07"),
        temporada: "Baja",
        tipoHuesped: "VIP",
        serviciosAdicionales: ["desayuno","wifi","lavanderia", "estacionamiento"]
    }
];
console.log("=".repeat(50));
console.log("Reporte de Reservas del Hotel:");
console.log("=".repeat(50));
procesarReservas(reservasHotel);