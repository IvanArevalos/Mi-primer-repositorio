function sumarnotas(alumno) {
    var sumanotas = 0;
    for (var i = 0; i < alumno.notas.length; i++) {
        if (alumno.notas[i] < 0 || alumno.notas[i] > 10) {
            throw new Error("Nota inválida");
        }
        else {
            sumanotas = alumno.notas[i] + sumanotas;
        }
    }
    return sumanotas;
}
function promedionotas(alumno) {
    var promedio;
    promedio = sumarnotas(alumno) / alumno.notas.length;
    return promedio;
}
function mostrarnotas(alumno) {
    console.log("Las notas del alumno ".concat(alumno.nombre, " ").concat(alumno.apellido, " son: ").concat(alumno.notas.join(", ")));
}
var alumnos = [
    { nombre: "Juan", apellido: "Pérez", notas: [1, 2, 3] },
    { nombre: "María", apellido: "Gómez", notas: [10, 9, 8] },
    { nombre: "Luis", apellido: "Rodríguez", notas: [6, 4, 5] }
];
for (var i = 0; i < alumnos.length; i++) {
    var promedio = promedionotas(alumnos[i]);
    if (promedio >= 7) {
        console.log("El alumno ".concat(alumnos[i].nombre, " ").concat(alumnos[i].apellido, " ha promocionado."));
    }
    else if (promedio >= 4 && promedio < 7) {
        console.log("El alumno ".concat(alumnos[i].nombre, " ").concat(alumnos[i].apellido, " ha aprobado."));
    }
    else {
        console.log("El alumno ".concat(alumnos[i].nombre, " ").concat(alumnos[i].apellido, " ha desaprobado."));
    }
}
for (var i = 0; i < alumnos.length; i++) {
    mostrarnotas(alumnos[i]);
}
