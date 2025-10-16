interface EventCardProps{
  title:string;
  date:string;
  location:string;
  attendees:number;
  category: "music"|"sports"|"tech"|"food";
}

export function EventCard({title,date,location,attendees,category}:EventCardProps){
    const backgroundColors = {
        music: "#a855f7",
        sports: "#22c55e",
        tech: "#3b82f6",
        food: "#f97316",
      }
    const bgColor=backgroundColors[category]
    return(
        <div
            style={{
            backgroundColor:bgColor,
        }}
        >
        <h2>{title}</h2>
        <p>{date}</p>
        <p>{location}</p>
        <p>{attendees} asistentes</p>
        <p>Categoria:{category}</p>
        </div>
    )
}