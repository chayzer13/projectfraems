import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../style/filter.css";
import "../index.css";
import Card from "./Card";

const Filter = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3333/products/all");
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...products];

    if (priceFrom) {
      filtered = filtered.filter((product) => product.price >= priceFrom);
    }

    if (priceTo) {
      filtered = filtered.filter((product) => product.price <= priceTo);
    }

    if (discountOnly) {
      filtered = filtered.filter(
        (product) => product.discont_price && product.discont_price < product.price
      );
    }

    if (sortOrder === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [products, priceFrom, priceTo, discountOnly, sortOrder]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h1 className="filter-title">All Products</h1>
      </div>

      <div className="filter-panel">
        <div className="filter-price">
          <span>Price</span>
          <input
            type="number"
            placeholder="from"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
          />
          <input
            type="number"
            placeholder="to"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
          />
        </div>

        <div className="filter-discount">
          <label>
            Discounted items
            <input
              type="checkbox"
              checked={discountOnly}
              onChange={() => setDiscountOnly((prev) => !prev)}
            />
          </label>
        </div>

        <div className="filter-sort">
          <label htmlFor="sort-select">Sorted</label>
          <select
            id="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">by default</option>
            <option value="price-low">price: low-high</option>
            <option value="price-high">price: high-low</option>
          </select>
        </div>
      </div>

      <div className="containersale">
        <div className="salegrid">
          {filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
