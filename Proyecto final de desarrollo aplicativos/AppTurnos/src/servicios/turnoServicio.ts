const URL = "https://692a54db7615a15ff24c6d68.mockapi.io/turnos";

export const obtenerTurnos = async () => {
  const respuesta = await fetch(URL);
  return respuesta.json();
};

export const obtenerTurno = async (id: string) => {
  const respuesta = await fetch(`${URL}/${id}`);
  return respuesta.json();
};

export const crearTurno = async (datos: any) => {
  const respuesta = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
  return respuesta.json();
};

export const editarTurno = async (id: string, datos: any) => {
  const respuesta = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
  return respuesta.json();
};

export const borrarTurno = async (id: string) => {
  const respuesta = await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });
  if (!respuesta.ok) {
    throw new Error("Error al borrar el turno");
  }

  return true;
};