
import { useState } from "react";

interface ProductProps {
  name: string;
  price: string;
  image: string;
  inStock: boolean;
}

export function ProductCard({ name, price, image, inStock }: ProductProps) {
  const [count, setCount] = useState(0);

  const incrementar = () => setCount(count + 1);
  const decrementar = () => setCount(count > 0 ? count - 1 : 0);
  const resetear = () => setCount(0);

  return (
    <div className="products">
      <div className="productstext">
        <h2>Nombre: {name}</h2>
        <h2>Precio: {price}</h2>
        <h2>En stock: {inStock ? "Sí" : "No"}</h2>

        <h3>Cantidad: {count}</h3>

        <button onClick={incrementar}>+1</button>
        <button onClick={decrementar}>-1</button>
        <button onClick={resetear}>Reset</button>
      </div>

      <div className="cardproductimgcontainer">
        <img src={image} alt="img" className="cardproductimg" />
      </div>
    </div>
  );
}
