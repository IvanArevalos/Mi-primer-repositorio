interface UserCardProps {
  name: string;
  email: string;
  phone: string;
  website: string;
}
export function UserCard(props: UserCardProps) {
  return (
    <div className="user-card">
      <h2>{props.name}</h2>
      <h3>{props.email}</h3>
      <h3>{props.phone}</h3>
      <h3>{props.website}</h3>
    </div>
  );
}