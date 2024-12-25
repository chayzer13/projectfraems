import React, { useEffect, useState, useCallback } from "react";
import "../style/product.css";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3333/products/${id}`);
      const data = await response.json();
      setProduct(data.length > 0 ? data[0] : null);
    } catch (error) {
      console.error("Error when fetching product data:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const { title, price, discont_price, description, image } = product;

  const discountPercentage = discont_price
    ? Math.round(((price - discont_price) / price) * 100)
    : null;

  return (
    <div className="product-page">
      <img
        src={`http://localhost:3333/public${image}`}
        alt={title}
        className="product-images"
      />
      <div className="product-details">
        <h1 className="product-titles">{title}</h1>
        <div className="pricing">
          <span className="current-prices">${discont_price || price}</span>
          {discont_price && <span className="old-prices">${price}</span>}
          {discont_price && (
            <div className="discount-tags">-{discountPercentage}%</div>
          )}
        </div>

        <div className="quantity-selector">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(-1)}
          >
            -
          </button>
          <span className="quantity-value">{quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>

        <p className="descrip">Description</p>
        <p className="product-description">{description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
