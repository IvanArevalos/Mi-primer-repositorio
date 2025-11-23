import { useState, useEffect } from 'react';
import { Loading } from './Loading';
import { CharacterCard } from './CharacterCard';

interface Character {
  id: number;
  name: string;
  image: string;
  status: "Alive" | "Dead" | "Unknown";
  species: string;
  gender: string;
  origin: { name: string };
  episode: string[];
}

export function Characterlist() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Todos" | "Alive" | "Dead">("Todos");
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);

  const [detail, setDetail] = useState<Character | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [errorDetail, setErrorDetail] = useState("");

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        if (!response.ok) throw new Error("Error al cargar los datos");
        const data = await response.json();
        setCharacters(data.results);
      } catch {
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    }
    fetchCharacters();
  }, []);

  useEffect(() => {
    if (selectedCharacterId === null) return;

    async function fetchDetail() {
      setLoadingDetail(true);
      setErrorDetail("");
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${selectedCharacterId}`);
        if (!response.ok) throw new Error("Error al cargar detalle");
        const data = await response.json();
        setDetail(data);
      } catch {
        setErrorDetail("No se pudo cargar el personaje");
      } finally {
        setLoadingDetail(false);
      }
    }

    fetchDetail();
  }, [selectedCharacterId]);

  if (loading) return <Loading />;
  if (error) return <div className="error">{error}</div>;

  if (selectedCharacterId !== null) {
    if (loadingDetail) return <p>Cargando detalles...</p>;
    if (errorDetail) return <p>{errorDetail}</p>;
    if (!detail) return null;

    const color = detail.status === "Alive" ? "green" : detail.status === "Dead" ? "red" : "gray";
    const emoji = detail.status === "Alive" ? "🟢" : detail.status === "Dead" ? "🔴" : "⚪";

    return (
      <div>
        <button onClick={() => setSelectedCharacterId(null)}>← Volver a la lista</button>
        <h2>{detail.name}</h2>
        <img src={detail.image} alt={detail.name} style={{ width: "500px", borderRadius: "8px" }} />
        <h3 style={{ color }}>{emoji} {detail.status}</h3>
        <p>Especie: {detail.species}</p>
        <p>Género: {detail.gender}</p>
        <p>Origen: {detail.origin.name}</p>
        <p>Cantidad de episodios: {detail.episode.length}</p>
      </div>
    );
  }

  const filteredCharacters = characters.filter((c) => {
    const nameMatch = c.name.toLowerCase().includes(search.toLowerCase());
    const statusMatch = statusFilter === "Todos" || c.status === statusFilter;
    return nameMatch && statusMatch;
  });

  return (
    <div className="user-list">
      <h2>Lista de Usuarios ({filteredCharacters.length})</h2>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        <button onClick={() => setStatusFilter("Todos")}>Todos</button>
        <button onClick={() => setStatusFilter("Alive")}>Vivos</button>
        <button onClick={() => setStatusFilter("Dead")}>Muertos</button>
      </div>

      {filteredCharacters.length === 0 ? (
        <p>No se encontraron personajes con ese nombre</p>
      ) : (
        <div className="characters-grid">
          {filteredCharacters.map((character) => (
            <div key={character.id} onClick={() => setSelectedCharacterId(character.id)}>
              <CharacterCard
                name={character.name}
                image={character.image}
                status={character.status}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}