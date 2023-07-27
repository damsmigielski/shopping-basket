import { useState } from "react";
import "./App.css";

const productsData = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking,camping, mountain/rock climbing, cycling,traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
  },
];

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
      <p>price:${product.price}</p>
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
      <p>Total Price:${totalPrice}</p>
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
