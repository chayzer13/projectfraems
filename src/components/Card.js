import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "../style/cart.css"

const Card = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleNavigation = (event) => {
    event.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart(product);
  };

  const calculateDiscount = (price, discountPrice) => {
    return discountPrice
      ? `-${Math.round(((price - discountPrice) / price) * 100)}%`
      : null;
  };

  return (
    <div className="cardproduct" onClick={handleNavigation}>
      {product.discont_price && (
        <div className="tag">
          {calculateDiscount(product.price, product.discont_price)}
        </div>
      )}
      <div className="card-overlay">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
      <img
        src={`http://localhost:3333/public${product.image}`}
        alt={product.title}
        className="productimage"
      />
      <div className="info">
        <h3 className="titleproduct">{product.title}</h3>
        <div className="pricing">
          <span className="price">
            ${product.discont_price || product.price}
          </span>
          {product.discont_price && (
            <span className="old-price">${product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
