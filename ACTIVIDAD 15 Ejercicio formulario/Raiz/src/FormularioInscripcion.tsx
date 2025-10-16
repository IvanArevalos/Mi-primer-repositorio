import React, { useState, useEffect } from 'react';
import { InputField } from './inputField';
import { BotonSubmit } from './BotonSubmit';
interface UserInformation{
  nombre:string;
  apellido:string;
  email:string;
  telefono:string;
}

export function FormularioInscripcion(){
    const [nombre,setNombre]=useState("");
    const [apellido,setApellido]=useState("");
    const [email,setEmail]=useState("");
    const [telefono,setTelefono]=useState("");
    const [mensajeExito,setMensajeExito]=useState(false);

    useEffect(()=>{
      if(mensajeExito){
        document.title="Inscripcion exitosa"
      }else{
        document.title="Sistema de inscripcion"
      }
    },[mensajeExito])
    const handleSubmit=(e:React.FormEvent)=>{
      e.preventDefault();
      if(!nombre || !apellido || !email || !telefono){
        alert("Por favor complete todos los campos");
        return;
      }else{
      setMensajeExito(true);
      }
    };
    const handleReset=()=>{
      setNombre("");
      setApellido("");
      setEmail("");
      setTelefono("");
      setMensajeExito(false);
    }
  return(
    <div>
      {!mensajeExito ? (
        <form onSubmit={handleSubmit}>
          <div>
            <InputField label="Nombre" type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)} placeholder="Ingresa tu nombre"/>
          </div>
          <div>
            <InputField label="Apellido" type="text" value={apellido} onChange={(e)=>setApellido(e.target.value)} placeholder="Ingresa tu apellido"/>
          </div>
          <div>
            <InputField label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Ingresa tu Email"/>
          </div>
          <div>
            <InputField label="Teléfono" type="tel" value={telefono} onChange={(e)=>setTelefono(e.target.value)} placeholder="Ingresa tu teléfono"/>
          </div>
          <BotonSubmit texto="Enviar"/>
        </form>
      ) : (
        <div>
          <h2>¡Inscripción exitosa!</h2>
          <p>
            <strong>Nombre completo:</strong> {nombre} {apellido}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Teléfono:</strong> {telefono}
          </p>
          <BotonSubmit texto="Nueva Inscripcion" onclick={handleReset}/>
        </div>
      )}
    </div>
      
  )
}