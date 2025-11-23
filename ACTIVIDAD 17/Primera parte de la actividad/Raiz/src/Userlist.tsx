import { useState, useEffect } from "react";
import { Loading } from "./Loading";
import { UserCard } from "./UserCard";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    city: string;
  };
}

export function Userlist() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState(""); 
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 5;

  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }

      const data = await response.json();
      setUsers(data);
      setPaginaActual(1);
    } catch (err: any) {
      setError("Error al cargar los usuarios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const usuariosFiltrados = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexInicio = (paginaActual - 1) * usuariosPorPagina;
  const indexFin = indexInicio + usuariosPorPagina;

  const usuariosPaginados = usuariosFiltrados.slice(indexInicio, indexFin);

  const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);

  if (loading) return <Loading />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-list">
      <h2>Lista de Usuarios ({usuariosFiltrados.length})</h2>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "10px", width: "50%", marginBottom: "20px" }}
      />

      <button onClick={fetchUsers} style={{ marginLeft: "10px", padding: "10px" }}>
        Recargar
      </button>

      <div className="users-grid">
        {usuariosPaginados.map((user) => (
          <UserCard
            key={user.id}
            name={user.name}
            email={user.email}
            phone={user.phone}
            website={user.website}
            company={user.company.name}
            address={`${user.address.street}, ${user.address.city}`}
          />
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>

        <span style={{ margin: "0 15px" }}>
          Página {paginaActual} de {totalPaginas}
        </span>

        <button
          onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}