import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/categories.css";
import "../index.css";

const Categories = ({ showAll }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3333/categories/all");
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId, categoryTitle) => {
    navigate(`/products/${categoryId}`, { state: { categoryTitle } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const displayedCategories = showAll ? categories : categories.slice(0, 4);

  return (
    <div className="categories-container">
      <header className="categories-header">
        <h1 className="categories-title">Categories</h1>
        <div className="categories-line"></div>
        {!showAll && (
          <button
            className="all-categories-button"
            onClick={() => navigate("/all-categories")}
          >
            All categories
          </button>
        )}
      </header>
      <div className="categories-grid">
        {displayedCategories.map(({ id, image, title }) => (
          <div
            key={id}
            className="category-item"
            onClick={() => handleCategoryClick(id, title)}
          >
            <img
              src={`http://localhost:3333/public${image}`}
              alt={title || "Untitled"}
              className="category-image"
            />
            <h3 className="category-title">{title || "Untitled"}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
