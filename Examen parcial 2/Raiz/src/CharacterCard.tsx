interface CharacterCardProps {
  name: string;
  image:string;
  status:"Alive"|"Dead"|"Unknown"
}
export function CharacterCard(props: CharacterCardProps) {
  const color=
    props.status==="Alive"?"green":props.status==="Dead"?"red":"gray";

  return (
    <div className="Character-card">
      <h2>{props.name}</h2>
      <img src={props.image} alt="" />
      <h3 style={{color}}>{props.status}</h3>
    </div>
  );
}