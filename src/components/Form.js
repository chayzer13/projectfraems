import React, { useState } from "react";
import "../style/form.css";
import "../index.css";
import HandsImage from '../img/off.svg';

const DiscountForm = () => {
  const [formState, setFormState] = useState({ isSubmitted: false });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormState({ isSubmitted: true });
  };

  return (
    <section className="discount-section">
      <figure className="discount-image">
        <img src={HandsImage} alt="Hands with plants" />
      </figure>

      <article className="discount-content">
        <h1 className="discount-title">5% off on the first order</h1>
        <form className="discount-form" onSubmit={handleFormSubmit}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Name" 
              className="discount-input" 
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Phone number" 
              className="discount-input" 
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              className="discount-input" 
              required 
            />
          </div>
          <button
            type="submit"
            className={`discount-button ${formState.isSubmitted ? "submitted" : ""}`}
            disabled={formState.isSubmitted}
          >
            {formState.isSubmitted ? "Request Submitted" : "Get a discount"}
          </button>
        </form>
      </article>
    </section>
  );
};

export default DiscountForm;