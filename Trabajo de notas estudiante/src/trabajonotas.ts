interface alumno {
    nombre: string;
    apellido: string;
    notas: number[];
}
function sumarnotas(alumno: alumno): number {
    let sumanotas=0;
    for(let i=0; i<alumno.notas.length; i++){
        if(alumno.notas[i]<0 || alumno.notas[i]>10)
        {
            throw new Error("Nota inválida");
        }
        else
        {
            sumanotas=alumno.notas[i]+sumanotas;
        }
    }
    return sumanotas;
}
function promedionotas(alumno: alumno): number {
    let promedio: number;
    promedio = sumarnotas(alumno) / alumno.notas.length;
    return promedio;
}
function mostrarnotas(alumno: alumno): void {
    console.log(`Las notas del alumno ${alumno.nombre} ${alumno.apellido} son: ${alumno.notas.join(", ")}`);
}
let alumnos: alumno[] = [
    { nombre: "Juan", apellido: "Pérez", notas: [1, 2, 3] },
    { nombre: "María", apellido: "Gómez", notas: [10, 9, 8] },
    { nombre: "Luis", apellido: "Rodríguez", notas: [6, 4, 5] }
];
for (let i = 0; i < alumnos.length; i++) {
    const promedio = promedionotas(alumnos[i]);
    if (promedio >= 7) {
        console.log(`El alumno ${alumnos[i].nombre} ${alumnos[i].apellido} ha promocionado.`);
    } else if (promedio >= 4 && promedio < 7) {
        console.log(`El alumno ${alumnos[i].nombre} ${alumnos[i].apellido} ha aprobado.`);
    } else {
        console.log(`El alumno ${alumnos[i].nombre} ${alumnos[i].apellido} ha desaprobado.`);
    }
}
for (let i = 0; i < alumnos.length; i++) {
    mostrarnotas(alumnos[i]);
}