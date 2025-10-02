import { useState } from 'react'
import './App.css'
import React from 'react';
interface Persona{
  nombre:string;
  apellido:string;
  nacimiento:string;
}
const persona1: Persona={
  nombre:"Ivan",
  apellido:"Arevalos",
  nacimiento:"22-11-2005"
}
function Main(){
  return(
    <div>
    <div id="titulo">
    <h1>Buenas, bienvenido a mi tarjeta personal</h1>
    </div>
    <div id="Datos">
      <h2>Nombre: {persona1.nombre}</h2>
      <h2>Apellido: {persona1.apellido}</h2>
      <h2>Nacimiento: {persona1.nacimiento}</h2>
    </div>
    <img src="https://www.lahabitacion235.com/wp-content/uploads/2017/08/Mot%C3%B6rhead-ST.jpg" alt="foto de motorhead" id="logomotorhead" />
    </div>
  )
}
export default function MyApp(){
  return(
    <body> 
    <div>
      <Main />
    </div>
    </body>
  )
}
