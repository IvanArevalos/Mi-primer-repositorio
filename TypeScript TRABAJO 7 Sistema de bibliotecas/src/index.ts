interface Libro {
    titulo: string;
    autor: string;
    isbn: string;
    fechaPrestamo: Date;
    fechaDevolucionPrevista: Date;
    tipoUsuario: string;
}
interface ReporteMulta{
    titulo: string;
    diasRetraso: number;
    multa: number;
    tipoUsuario: string;
}
function calcularDiasRetraso(fechaDevolucionPrevista: Date, fechaActual: string):number{
    const fechaPrevista = new Date(fechaDevolucionPrevista);
    const fechaActualDate = new Date(fechaActual);
    const diferenciaTiempo = fechaActualDate.getTime() - fechaPrevista.getTime();
    const diasRetraso = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));
    return diasRetraso > 0 ? diasRetraso : 0;
}
function calcularMulta(diasRetraso:number, tipoUsuario:string):number{
    let multa = 0;
    if (tipoUsuario === "Estudiante") {
        multa = diasRetraso * 50; // 50 pesos por día
    } else if (tipoUsuario === "Docente") {
        multa = diasRetraso * 30; // 30 pesos por día
    } else if (tipoUsuario === "Publico general") {
        multa = diasRetraso * 100; // 100 pesos por día
    }
    return multa;
}
function procesarBiblioteca(libros:Libro[], fechaActual:string): ReporteMulta[]
{
    const reportes:ReporteMulta[] = [];
    for (const libro of libros) {
        const diasRetraso = calcularDiasRetraso(libro.fechaDevolucionPrevista, fechaActual);
        if (diasRetraso > 0) {
            const multa = calcularMulta(diasRetraso, libro.tipoUsuario);
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
function mostrarReporteConsola(libros:Libro[], fechaActual:string): void 
{
    let totalmultas = 0;
    let librosconretraso = 0;
    console.log("REPORTE DE BIBLIOTECA");
    console.log("=".repeat(40));
    procesarBiblioteca(libros, fechaActual).forEach((reporte) => {
        console.log(`Título: ${reporte.titulo}`);
        console.log(`Días de retraso: ${reporte.diasRetraso}`);
        console.log(`Multa: $${reporte.multa}`);
        console.log(`Tipo de usuario: ${reporte.tipoUsuario}`);
        console.log("-".repeat(40));
        totalmultas=reporte.multa+totalmultas;
        if(reporte.diasRetraso>0){
            librosconretraso++;
        }
    })
    console.log(`Total de multas: $${totalmultas}`);
    console.log(`Total de libros con retraso: ${librosconretraso}`);
    console.log("=".repeat(40));
    
}
const fechaHoy = "2024-06-15";
const librosenPrestamo: Libro[] = [
    {titulo:"Cien años de soledad", autor:"Gabriel García Márquez", isbn:"978-3-16-148410-0", fechaPrestamo:new Date("2024-06-01"), fechaDevolucionPrevista:new Date("2024-06-2020"), tipoUsuario:"Estudiante"},
    {titulo:"El Aleph", autor:"Jorge Luis Borges", isbn:"978-3-16-148410-1", fechaPrestamo:new Date("2024-05-20"), fechaDevolucionPrevista:new Date("2024-06-10"), tipoUsuario:"Estudiante"},
    {titulo:"Rayuela", autor:"Julio Cortázar", isbn:"978-3-16-148410-2", fechaPrestamo:new Date("2024-05-20"), fechaDevolucionPrevista:new Date("2024-06-10"), tipoUsuario:"Docente"},
    {titulo:"Martin Fierro", autor:"José Hernández", isbn:"978-3-16-148410-3", fechaPrestamo:new Date("2024-05-25"), fechaDevolucionPrevista:new Date("2024-06-05"), tipoUsuario:"Publico general"},
]
mostrarReporteConsola(librosenPrestamo, fechaHoy);