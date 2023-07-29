import { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";
import productsData from "./data/ProductsData.jsx";

function ProductCard({
  product,
  handleAddToCart,
  handleRemoveFromCart,
  isAdded,
}) {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    setIsSelected(!isSelected);
    isAdded ? handleRemoveFromCart(product) : handleAddToCart(product);
  };

  return (
    <div className={`product-card ${isSelected ? "selected" : ""}`}>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p className="price">Price:${product.price.toFixed(2)}</p>
      <button onClick={handleClick}>
        {isAdded ? "remove" : "add product"}
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
  isAdded: PropTypes.bool.isRequired,
};
function ProductGrid({
  products,
  handleAddToCart,
  handleRemoveFromCart,
  addedProducts,
}) {
  return (
    <div className="product-grid">
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

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
  addedProducts: PropTypes.isRequired,
};

function CartSummary({ products }) {
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
  return (
    <div className="shopping-info">
      <p>Shopping Cart</p>
      <p>Selected Products: {products.length}</p>
      <p>Total Price:${totalPrice.toFixed(2)}</p>
    </div>
  );
}

CartSummary.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired,
    })
  ),
};

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  const removeFromCart = (product) => {
    setCart((currentCart) => currentCart.filter((p) => p.id !== product.id));
  };

  return (
    <div className="container">
      <h2>Damian Śmigielski HOMEWORK 02: product cart</h2>
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
