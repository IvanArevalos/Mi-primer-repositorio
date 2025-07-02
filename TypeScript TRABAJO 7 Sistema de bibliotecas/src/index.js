function calcularDiasRetraso(fechaDevolucionPrevista, fechaActual) {
    var fechaPrevista = new Date(fechaDevolucionPrevista);
    var fechaActualDate = new Date(fechaActual);
    var diferenciaTiempo = fechaActualDate.getTime() - fechaPrevista.getTime();
    var diasRetraso = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));
    return diasRetraso > 0 ? diasRetraso : 0;
}
function calcularMulta(diasRetraso, tipoUsuario) {
    var multa = 0;
    if (tipoUsuario === "Estudiante") {
        multa = diasRetraso * 50; // 50 pesos por día
    }
    else if (tipoUsuario === "Docente") {
        multa = diasRetraso * 30; // 30 pesos por día
    }
    else if (tipoUsuario === "Publico general") {
        multa = diasRetraso * 100; // 100 pesos por día
    }
    return multa;
}
function procesarBiblioteca(libros, fechaActual) {
    var reportes = [];
    for (var _i = 0, libros_1 = libros; _i < libros_1.length; _i++) {
        var libro = libros_1[_i];
        var diasRetraso = calcularDiasRetraso(libro.fechaDevolucionPrevista, fechaActual);
        if (diasRetraso > 0) {
            var multa = calcularMulta(diasRetraso, libro.tipoUsuario);
            reportes.push({
                titulo: libro.titulo,
                diasRetraso: diasRetraso,
                multa: multa,
                tipoUsuario: libro.tipoUsuario
            });
        }
        else {
            reportes.push({
                titulo: libro.titulo,
                diasRetraso: 0,
                multa: 0,
                tipoUsuario: libro.tipoUsuario
            });
        }
    }
    return reportes;
}
function mostrarReporteConsola(libros, fechaActual) {
    var totalmultas = 0;
    var librosconretraso = 0;
    console.log("REPORTE DE BIBLIOTECA");
    console.log("=".repeat(40));
    procesarBiblioteca(libros, fechaActual).forEach(function (reporte) {
        console.log("T\u00EDtulo: ".concat(reporte.titulo));
        console.log("D\u00EDas de retraso: ".concat(reporte.diasRetraso));
        console.log("Multa: $".concat(reporte.multa));
        console.log("Tipo de usuario: ".concat(reporte.tipoUsuario));
        console.log("-".repeat(40));
        totalmultas = reporte.multa + totalmultas;
        if (reporte.diasRetraso > 0) {
            librosconretraso++;
        }
    });
    console.log("Total de multas: $".concat(totalmultas));
    console.log("Total de libros con retraso: ".concat(librosconretraso));
    console.log("=".repeat(40));
}
var fechaHoy = "2024-06-15";
var librosenPrestamo = [
    { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", isbn: "978-3-16-148410-0", fechaPrestamo: new Date("2024-06-01"), fechaDevolucionPrevista: new Date("2024-06-2020"), tipoUsuario: "Estudiante" },
    { titulo: "El Aleph", autor: "Jorge Luis Borges", isbn: "978-3-16-148410-1", fechaPrestamo: new Date("2024-05-20"), fechaDevolucionPrevista: new Date("2024-06-10"), tipoUsuario: "Estudiante" },
    { titulo: "Rayuela", autor: "Julio Cortázar", isbn: "978-3-16-148410-2", fechaPrestamo: new Date("2024-05-20"), fechaDevolucionPrevista: new Date("2024-06-10"), tipoUsuario: "Docente" },
    { titulo: "Martin Fierro", autor: "José Hernández", isbn: "978-3-16-148410-3", fechaPrestamo: new Date("2024-05-25"), fechaDevolucionPrevista: new Date("2024-06-05"), tipoUsuario: "Publico general" },
];
mostrarReporteConsola(librosenPrestamo, fechaHoy);
