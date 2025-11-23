interface PokeProps {
  name: string;
  image: string;
}

export function PokemonCard({ name, image }: PokeProps) {
  return (
    <div className="poke-card">
      <h3>{name}</h3>
      <img src={image} alt={name} width="120" />
    </div>
  );
}