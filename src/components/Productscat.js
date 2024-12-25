import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/categories.css";
import Card from "./Card";

const CATEGORY_NAMES = {
  1: "Annuals",
  2: "Nursery",
  3: "Garden Art",
  4: "Plant Care",
  5: "Seasonal",
};

const ProductsByCategory = () => {
  const { categoryId } = useParams();
  const [state, setState] = useState({ products: [], loading: true, error: null });

  const categoryTitle = CATEGORY_NAMES[categoryId] || "Unknown category";

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3333/products/category/${categoryId}`);
        if (isMounted) {
          setState({ products: data, loading: false, error: null });
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching products:", err.response || err);
          setState({ products: [], loading: false, error: "Failed to load products." });
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  const { products, loading, error } = state;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="containersale">
      <h1 className="category-title">{categoryTitle}</h1>
      <div className="salegrid">
        {products.length > 0 ? (
          products.map((product) => <Card key={product.id} product={product} />)
        ) : (
          <div>No products found in this category.</div>
        )}
      </div>
    </div>
  );
};

export default ProductsByCategory;
