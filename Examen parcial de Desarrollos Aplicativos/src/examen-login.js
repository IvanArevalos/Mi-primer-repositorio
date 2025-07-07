var usuarios = [
    { id: 1, nombre: "Juan Pérez", email: "admin@company.com", password: "admin123", rol: "admin" },
    { id: 2, nombre: "María García", email: "manager@company.com", password: "manager123",
        rol: "manager" },
    { id: 3, nombre: "Carlos López", email: "employee@company.com", password: "employee123",
        rol: "employee" },
    { id: 4, nombre: "Ana Martínez", email: "guest@company.com", password: "guest123", rol: "guest" }
];
function esemailValido(email) {
    return email.includes("@") && email.includes(".");
}
function login(email, password) {
    if (!email) {
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
            var usuario = usuarios.find(function (u) { return u.email === email; });
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
                            console.log("Bienvenido ".concat(usuario.nombre, ", Usted accedio como ").concat(usuario.rol, " y tiene control total del sistema"));
                            break;
                        case "manager":
                            console.log("Bienvenido ".concat(usuario.nombre, ", Usted accedio como ").concat(usuario.rol, " y puede supervisar operaciones"));
                            break;
                        case "employee":
                            console.log("Bienvenido ".concat(usuario.nombre, ", Usted accedio como ").concat(usuario.rol, " y puede realizar sus tareas asignadas"));
                            break;
                        case "guest":
                            console.log("Bienvenido ".concat(usuario.nombre, ", Usted accedio como ").concat(usuario.rol, " y tiene acceso de solo lectura"));
                            break;
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
