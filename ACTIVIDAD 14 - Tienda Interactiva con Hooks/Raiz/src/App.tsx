
import "./App.css";
import { ProductCard } from "./ProductCard";
import { Reloj } from "./Reloj";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido a la ferretería</h1>

      <ProductCard
        name="Martillo"
        price="$3500"
        image="https://www.wurth.com.ar/blog/wp-content/uploads/2022/11/martillo-de-carpintero.jpg"
        inStock={true}
      />

      <br />

      <ProductCard
        name="Llave inglesa"
        price="$4000"
        image="https://acdn-us.mitiendanube.com/stores/001/229/031/products/diseno-sin-titulo-891-4993f3f0bc3ef7464d16765609980601-1024-1024.png"
        inStock={true}
      />

      <br />

      <ProductCard
        name="Serrucho"
        price="$3000"
        image="https://http2.mlstatic.com/D_NQ_NP_784259-MLU72532293554_102023-O.webp"
        inStock={false}
      />

      <br />
      <Reloj />
    </div>
  );
}

export default App;