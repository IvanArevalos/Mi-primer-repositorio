import React, { useState, useEffect } from 'react';
import './App.css'
import { FormularioInscripcion } from './FormularioInscripcion';
export default function MyApp(){
  return(
    <div>
    <h1>Sistema de inscripcion</h1>
    <FormularioInscripcion/>
    </div>
  )
}
