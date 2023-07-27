import { useState } from "react";
import "./App.css";
import productsData from "./data/ProductsData.jsx";

function ProductCard({
  product,
  handleAddToCart,
  handleRemoveFromCart,
  isAdded,
}) {
  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price:${product.price.toFixed(2)}</p>
      <button
        onClick={
          isAdded
            ? () => handleRemoveFromCart(product)
            : () => handleAddToCart(product)
        }>
        {isAdded ? "remove" : "add product"}
      </button>
    </div>
  );
}

function ProductGrid({
  products,
  handleAddToCart,
  handleRemoveFromCart,
  addedProducts,
}) {
  return (
    <div>
      {products.map((product) => {
        const isAdded = addedProducts.some((p) => p.id === product.id);
        return (
          <ProductCard
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
            isAdded={isAdded}
          />
        );
      })}
    </div>
  );
}

function CartSummary({ products }) {
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
  return (
    <div>
      <h2>Damian Śmigielski homework 02: Product Cart</h2>
      <p>Shopping Card</p>
      <p>Selected Products: {products.length}</p>
      <p>Total Price:${totalPrice.toFixed(2)}</p>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  const removeFromCart = (product) => {
    setCart((currentCart) => currentCart.filter((p) => p.id !== product.id));
  };

  return (
    <div>
      <CartSummary products={cart} />
      <ProductGrid
        products={productsData}
        handleAddToCart={addToCart}
        handleRemoveFromCart={removeFromCart}
        addedProducts={cart}
      />
    </div>
  );
}

export default App;
