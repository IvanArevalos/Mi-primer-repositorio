import { useState,useEffect } from 'react';
import { Loading } from './Loading';
import { UserCard } from './UserCard';
interface User{
    id:number;
    name:string;
    email:string;
    phone:string;
    website:string;
}
export function Userlist() {
    const [users,setUsers]=useState<User[]>([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");
    useEffect(()=>{
        async function fetchUsers() {
            try{
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if(!response.ok){
                    throw new Error("Error al obtener los usuarios");
                }
                const data= await response.json();
                setUsers(data);
        } catch (err:any){
            setError("Error al cargar los usuarios");
            console.error(err);
        }finally{
            setLoading (false);
        }
}
        fetchUsers();
    },[]);
    if(loading){
        return <Loading/>;
    }
    if(error){
        return <div className="error">{error}</div>;
    }
    return (
        <div className="user-list">
            <h2>Lista de Usuarios ({users.length})</h2>
            <div className="users-grid">
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        phone={user.phone}
                        website={user.website}
                    />
                ))}
            </div>
        </div>
    );
}
