import { useState } from 'react'
import './App.css'
import React from 'react';
interface Productcardpops{
  name:string;
  price:string;
  image:string;
  inStock:boolean;
}
const productcard1: Productcardpops={
  name: "Martillo",
  price:"$3500",
  image:"https://www.wurth.com.ar/blog/wp-content/uploads/2022/11/martillo-de-carpintero.jpg",
  inStock:true,

}
const productcard2: Productcardpops={
  name:"Llave inglesa",
  price:"$4000",
  image:"https://acdn-us.mitiendanube.com/stores/001/229/031/products/diseno-sin-titulo-891-4993f3f0bc3ef7464d16765609980601-1024-1024.png",
  inStock:true,
}
const productcard3:Productcardpops={
  name:"Serrucho",
  price:"$3000",
  image:"https://http2.mlstatic.com/D_NQ_NP_784259-MLU72532293554_102023-O.webp",
  inStock:false,
}
function Main(){
  return(
    <div>
    <div id="titulo">
    <h1>Bienvenido a la ferreteria</h1>
    </div>
      <div className="products" id="Productcard1">
        <div className='productstext'>
        <h2>Nombre: {productcard1.name}</h2>
        <h2>Precio: {productcard1.price}</h2>
        <h2>En stock: {productcard1.inStock ? "Sí" : "No"}</h2>
        </div>
        <div className='cardproductimgcontainer'>
        <img src={productcard1.image} alt="fotoproducto" className='cardproductimg'/>
        </div>
      </div>

      <div className="products" id="Productcard2">
        <h2>Nombre: {productcard2.name}</h2>
        <h2>Precio: {productcard2.price}</h2>
        <h2>En stock: {productcard2.inStock ? "Sí" : "No"}</h2>
        <img src={productcard2.image} alt="fotoproducto" />
      </div>
    </div>
  );
}
export default function MyApp(){
  return(
    <body> 
    <div>
      <Main/>
    </div>
    </body>
  )
}
