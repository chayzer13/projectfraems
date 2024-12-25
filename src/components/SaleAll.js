import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "../index.css";

const AllSale = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3333/products/all");
        const discountedProducts = data.filter(
          ({ discont_price, price }) => discont_price && discont_price < price
        );
        setSaleProducts(discountedProducts);
      } catch (error) {
        console.error("Ошибка при загрузке всех скидок:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containersale">
      <div className="salegrid">
        {saleProducts.map(({ id, discont_price, price, image, title }) => (
          <div
            key={id}
            className="cardproduct"
            onClick={() => navigate(`/product/${id}`)}
          >
            {discont_price && (
              <div className="tag">
                -{Math.round(((price - discont_price) / price) * 100)}%
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
                    addToCart({ id, discont_price, price, image, title });
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

export default AllSale;
