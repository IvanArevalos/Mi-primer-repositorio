interface UserCardProps {
  name: string;
  email: string;
  phone: string;
  website: string;
  company: string;
  address: string;
}

export function UserCard({ name, email, phone, website, company, address }: UserCardProps) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Tel: {phone}</p>
      <p>Web: {website}</p>
      <p>Empresa: {company}</p>
      <p>Dirección: {address}</p>
    </div>
  );
}