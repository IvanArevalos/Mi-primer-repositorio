import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import { PokemonCard } from "./PokemonCard";

interface Pokemon {
  name: string;
  url: string;
}

export function PokemonList() {
  const [lista, setLista] = useState<Pokemon[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [buscar, setBuscar] = useState("");

  const [pagina, setPagina] = useState(1);
  const porPagina = 5;

  const traer = async () => {
    try {
      setCargando(true);
      const r = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
      const data = await r.json();
      setLista(data.results);
      setPagina(1);
    } catch (e) {
      setError("No se pudo cargar la API");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    traer();
  }, []);

  if (cargando) return <Loading />;
  if (error) return <h2>{error}</h2>;

  const filtrados = lista.filter((p) =>
    p.name.toLowerCase().includes(buscar.toLowerCase())
  );

  const inicio = (pagina - 1) * porPagina;
  const final = inicio + porPagina;
  const pag = filtrados.slice(inicio, final);

  const total = Math.ceil(filtrados.length / porPagina);

  const obtenerImagen = (name: string) => {
    return `https://img.pokemondb.net/artwork/large/${name}.jpg`;
  };

  return (
    <div>
      <h2>Pokemons ({filtrados.length})</h2>

      <input
        type="text"
        placeholder="Buscar pokemon..."
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
      />

      <button onClick={traer} style={{ marginLeft: "8px" }}>
        Recargar
      </button>

      <div className="poke-grid">
        {pag.map((p) => (
          <PokemonCard
            key={p.name}
            name={p.name}
            image={obtenerImagen(p.name)}
          />
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>
          Anterior
        </button>

        <span style={{ margin: "0 20px" }}>
          Página {pagina} de {total}
        </span>

        <button
          disabled={pagina === total}
          onClick={() => setPagina(pagina + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}