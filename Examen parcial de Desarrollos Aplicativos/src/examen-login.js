"use strict";
const usuarios = [
    { id: 1, nombre: "Juan Pérez", email: "admin@company.com", password: "admin123", rol: "admin" },
    { id: 2, nombre: "María García", email: "manager@company.com", password: "manager123",
        rol: "manager" },
    { id: 3, nombre: "Carlos López", email: "employee@company.com", password: "employee123",
        rol: "employee" },
    { id: 4, nombre: "Ana Martínez", email: "guest@company.com", password: "guest123", rol: "" }
];
function esemailValido(email) {
    return email.includes("@") && email.includes(".");
}
function login(email, password) {
    const fechayhoraactual = new Date();
    const horaactual = fechayhoraactual.getHours();
    const minutos = fechayhoraactual.getMinutes();
    const minutostotales = horaactual * 60 + minutos;
    if (minutostotales < 6 * 60 || minutostotales >= 18 * 60) {
        console.log("No se encuentra en horario laboral para iniciar sesion");
    }
    else if (!email) {
        console.log("El formato del email es invalido");
    }
    else if (!password) {
        console.log("La contraseña no puede estar vacia");
    }
    else {
        if (esemailValido(email) === false) {
            console.log("El formato del email es invalido");
        }
        else {
            const usuario = usuarios.find(u => u.email === email);
            if (!usuario) {
                console.log("El email ingresado no esta registrado en el sistema.");
            }
            else {
                if (usuario.password !== password) {
                    console.log("La contraseña ingresada es incorrecta.");
                }
                else {
                    switch (usuario.rol) {
                        case "admin":
                            console.log(`Bienvenido ${usuario.nombre}, Usted accedio como ${usuario.rol} y tiene control total del sistema`);
                            break;
                        case "manager":
                            console.log(`Bienvenido ${usuario.nombre}, Usted accedio como ${usuario.rol} y puede supervisar operaciones`);
                            break;
                        case "employee":
                            console.log(`Bienvenido ${usuario.nombre}, Usted accedio como ${usuario.rol} y puede realizar sus tareas asignadas`);
                            break;
                        case "guest":
                            console.log(`Bienvenido ${usuario.nombre}, Usted accedio como ${usuario.rol} y tiene acceso de solo lectura`);
                            break;
                        default:
                            console.log(`Bienvenido ${usuario.nombre}, Usted no tiene un rol definido`);
                    }
                    if (!usuario) {
                        console.log("Email o contraseña incorrectos.");
                    }
                }
            }
        }
    }
}
console.log("=== SISTEMA DE LOGIN ===");
login("admin@company.com", "admin123");
login("manager@company.com", "manager123");
login("employee@company.com", "employee123");
login("guest@company.com", "guest123");
login("juancitoramirez@gmail.com", "cualquiercosa123");
login("admin@company.com", "admin12345678");
login("emailsinformato", "password123");
login("", "password123");
