function calcularDiasEstadia(fechaIngreso, fechaSalida) {
    var diferenciaTiempo = fechaSalida.getTime() - fechaIngreso.getTime();
    return Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));
}
function calcularCostoBase(tipoHabitacion, temporada, dias) {
    var Preciotemporadaalta = {
        "Simple": 100,
        "Doble": 180,
        "Suite": 350
    };
    var Preciotemporadabaja = {
        "Simple": 80,
        "Doble": 120,
        "Suite": 250
    };
    if (temporada === "Alta") {
        return Preciotemporadaalta[tipoHabitacion] * dias;
    }
    else {
        return Preciotemporadabaja[tipoHabitacion] * dias;
    }
}
function calcularCostoServicios(servicios, dias) {
    var costoservicios = {
        "desayuno": 25,
        "wifi": 10,
        "spa": 50,
        "estacionamiento": 15,
        "lavanderia": 20
    };
    var costoTotal = 0;
    for (var _i = 0, servicios_1 = servicios; _i < servicios_1.length; _i++) {
        var servicio = servicios_1[_i];
        if (costoservicios[servicio]) {
            costoTotal += costoservicios[servicio] * dias;
        }
        else {
            console.warn("Servicio no reconocido: ".concat(servicio));
        }
    }
    return costoTotal;
}
function calcularDescuento(costoBase, costoServicios, tipoHuesped, dias) {
    var descuento = 0;
    if (tipoHuesped === "VIP") {
        descuento = (costoBase + costoServicios) * 0.15; // 15% de descuento
    }
    else if (tipoHuesped === "Corporativo") {
        descuento = (costoBase + costoServicios) * 0.10; // 10% de descuento
    }
    if (dias > 7) {
        descuento += (costoBase + costoServicios) * 0.05; // 5% adicional si la estadía es mayor a 7 días
    }
    return descuento;
}
function procesarReservas(reservas) {
    var reportes = [];
    var ingresostotales = 0;
    var reservasimple = 0;
    var reservadoble = 0;
    var reservasuite = 0;
    var diasestadiatotales = 0;
    var ingresostotalesalta = 0;
    var ingresostotalesbaja = 0;
    for (var _i = 0, reservas_1 = reservas; _i < reservas_1.length; _i++) {
        var reserva = reservas_1[_i];
        var diasEstadia = calcularDiasEstadia(reserva.fechaIngreso, reserva.fechaSalida);
        var costoBase = calcularCostoBase(reserva.tipoHabitacion, reserva.temporada, diasEstadia);
        var costoServicios = calcularCostoServicios(reserva.serviciosAdicionales, diasEstadia);
        var descuento = calcularDescuento(costoBase, costoServicios, reserva.tipoHuesped, diasEstadia);
        var costoTotal = (costoBase + costoServicios) - descuento;
        var reporte = {
            numeroReserva: reserva.numeroReserva,
            nombreHuesped: reserva.nombreHuesped,
            tipoHabitacion: reserva.tipoHabitacion,
            diasEstadia: diasEstadia,
            costoBase: costoBase,
            costoServicios: costoServicios,
            descuento: descuento,
            costoTotal: costoTotal
        };
        if (reserva.tipoHabitacion === "Simple") {
            reservasimple++;
        }
        else if (reserva.tipoHabitacion === "Doble") {
            reservadoble++;
        }
        else if (reserva.tipoHabitacion === "Suite") {
            reservasuite++;
        }
        ingresostotales += costoTotal;
        diasestadiatotales += diasEstadia;
        if (reserva.temporada === "Alta") {
            ingresostotalesalta += costoTotal;
        }
        else if (reserva.temporada === "Baja") {
            ingresostotalesbaja += costoTotal;
        }
        reportes.push(reporte);
        console.log("Reserva #".concat(reporte.numeroReserva, " - Huesped: ").concat(reporte.nombreHuesped));
        console.log("Tipo de Habitaci\u00F3n: ".concat(reporte.tipoHabitacion));
        console.log("D\u00EDas de Estadia: ".concat(reporte.diasEstadia, " (").concat(reserva.fechaIngreso.toLocaleDateString(), " a ").concat(reserva.fechaSalida.toLocaleDateString(), ")"));
        console.log("Temporada: ".concat(reserva.temporada));
        console.log("Tipo de Huesped: ".concat(reserva.tipoHuesped));
        console.log("");
        console.log("Costo Base: $".concat(reporte.costoBase, " (").concat(reporte.diasEstadia, " d\u00EDas x ").concat((reserva.tipoHabitacion === "Simple" && reserva.temporada === "Alta") ? "100" : (reserva.tipoHabitacion === "Simple" && reserva.temporada === "Baja") ? "80" : (reserva.tipoHabitacion === "Doble" && reserva.temporada === "Alta") ? "180" : (reserva.tipoHabitacion === "Doble" && reserva.temporada === "Baja") ? "120" : (reserva.tipoHabitacion === "Suite" && reserva.temporada === "Alta") ? "350" : "250", ")"));
        console.log("Costo de Servicios: $".concat(reporte.costoServicios));
        console.log("Descuento Aplicado: $".concat(reporte.descuento));
        console.log("Costo Total: $".concat(reporte.costoTotal));
        console.log("");
    }
    var diasestadiapromedio = diasestadiatotales / reservas.length;
    console.log("INGRESOS TOTALES: $" + ingresostotales, "($".concat(ingresostotalesalta, " en temporada alta, $").concat(ingresostotalesbaja, " en temporada baja)"));
    console.log("RESERVAS PROCESADAS: " + reservas.length + " (Simple: " + reservasimple + ", Doble: " + reservadoble + ", Suite: " + reservasuite + ")");
    console.log("DIAS ESTADIA PROMEDIO: " + diasestadiapromedio);
    return reportes;
}
var reservasHotel = [
    {
        numeroReserva: 1,
        nombreHuesped: "Ana Garcia",
        tipoHabitacion: "Suite",
        fechaIngreso: new Date("2024-07-15"),
        fechaSalida: new Date("2024-07-18"),
        temporada: "Alta",
        tipoHuesped: "VIP",
        serviciosAdicionales: ["desayuno", "wifi", "spa"]
    },
    {
        numeroReserva: 2,
        nombreHuesped: "Carlos Lopez",
        tipoHabitacion: "Doble",
        fechaIngreso: new Date("2024-09-10"),
        fechaSalida: new Date("2024-09-13"),
        temporada: "Baja",
        tipoHuesped: "Corporativo",
        serviciosAdicionales: ["desayuno", "wifi", "estacionamiento"]
    },
    {
        numeroReserva: 3,
        nombreHuesped: "Maria Rodriguez",
        tipoHabitacion: "Simple",
        fechaIngreso: new Date("2024-08-20"),
        fechaSalida: new Date("2024-08-22"),
        temporada: "Alta",
        tipoHuesped: "Regular",
        serviciosAdicionales: ["wifi"]
    },
    {
        numeroReserva: 4,
        nombreHuesped: "Juan Perez",
        tipoHabitacion: "Doble",
        fechaIngreso: new Date("2024-06-01"),
        fechaSalida: new Date("2024-06-07"),
        temporada: "Baja",
        tipoHuesped: "VIP",
        serviciosAdicionales: ["desayuno", "wifi", "lavanderia", "estacionamiento"]
    }
];
console.log("=".repeat(50));
console.log("Reporte de Reservas del Hotel:");
console.log("=".repeat(50));
procesarReservas(reservasHotel);
