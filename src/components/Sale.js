import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contexts/CartContext";
import "../style/sale.css";
import "../index.css";

const Sale = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3333/products/all");
        const filteredProducts = data.filter(
          (product) => product.discont_price && product.discont_price < product.price
        );
        setSaleProducts(filteredProducts.slice(0, 4));
      } catch (error) {
        console.error("Error loading sale products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  const handleProductClick = (id) => navigate(`/product/${id}`);

  const calculateDiscount = (price, discountPrice) => {
    return Math.round(((price - discountPrice) / price) * 100);
  };

  return (
    <div className="containersale">
      <header className="sale-header">
        <h1 className="sale-title">Sale</h1>
        <div className="sale-line"></div>
        <button className="all-sale-button" onClick={() => navigate("/all-sale")}>All Sale</button>
      </header>

      <div className="salegrid">
        {saleProducts.map(({ id, title, price, discont_price, image }) => (
          <div key={id} className="cardproduct" onClick={() => handleProductClick(id)}>
            {discont_price && (
              <div className="tag">
                -{calculateDiscount(price, discont_price)}%
              </div>
            )}

            <img
              src={`http://localhost:3333/public${image}`}
              alt={title}
              className="productimage"
            />

            <div className="info">
              <h3 className="titleproduct">{title}</h3>
              <div className="pricing">
                <span className="price">${discont_price || price}</span>
                {discont_price && <span className="old-price">${price}</span>}
              </div>
              <div className="card-overlay">
                <button
                  className="add-to-cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({ id, title, price, discont_price, image });
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sale;