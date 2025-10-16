import { useState } from 'react'
import './App.css'
import React from 'react';
import { EventCard } from './EventCard';
export default function MyApp(){
  return(
    <div>
    <EventCard
      title="Concierto de rock"
      date='2025-11-10'
      location='Buenos Aires'
      attendees={120}
      category='music'
      />
      <EventCard
      title="Partido de Futbol"
      date='2025-09-22'
      location='Cordoba'
      attendees={50}
      category='sports'
      />
      <EventCard
      title="Conferencia de IA"
      date='2025-05-03'
      location='Santa Fe'
      attendees={30}
      category='tech'
      />
      <EventCard
      title="Cena en restaurante lujoso"
      date='2025-02-05'
      location='Puerto Madero'
      attendees={2}
      category='food'
      />
    </div>
  )
}
