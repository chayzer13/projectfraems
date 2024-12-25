import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "../style/cart.css";

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();
    const [isOverlayVisible, setOverlayVisibility] = useState(false);

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce(
        (total, item) => total + (item.discont_price || item.price) * item.quantity,
        0
    );

    const handleQuantityChange = (itemId, quantity) => {
        if (quantity > 0) {
            updateQuantity(itemId, quantity);
        } else {
            removeFromCart(itemId);
        }
    };

    const handleOrderSubmission = (event) => {
        event.preventDefault();
        clearCart();
        setOverlayVisibility(true);
    };

    const closeOverlay = () => setOverlayVisibility(false);

    return (
        <div className="cart-container">
            {isOverlayVisible && (
                <div className="overlay">
                    <div className="overlay-content">
                        <button className="close-button" onClick={closeOverlay}>
                            &times;
                        </button>
                        <h2>Order Confirmed!</h2>
                        <p>Your order has been placed successfully.</p>
                        <p>Our manager will contact you shortly for confirmation.</p>
                    </div>
                </div>
            )}

            <header className="cart-header">
                <h1>Shopping Cart</h1>
            </header>

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Looks like you have no items in your basket currently.</p>
                    <button
                        onClick={() => navigate("/all-products")}
                        className="continue-shopping-button"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="cart-content">
                    <section className="cart-items">
                        {cart.map(({ id, image, title, quantity, price, discont_price }) => (
                            <div key={id} className="cart-item">
                                <img
                                    src={`http://localhost:3333/public${image}`}
                                    alt={title}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-info">
                                    <h3>{title}</h3>
                                    <div className="cart-item-quantity">
                                        <button onClick={() => handleQuantityChange(id, quantity - 1)}>-</button>
                                        <span>{quantity}</span>
                                        <button onClick={() => handleQuantityChange(id, quantity + 1)}>+</button>
                                    </div>
                                    <div className="cart-item-price">
                                        ${discont_price || price}
                                        {discont_price && <span className="old-price">${price}</span>}
                                    </div>
                                </div>
                                <button
                                    className="remove-button"
                                    onClick={() => removeFromCart(id)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </section>

                    <aside className="summary">
                        <h2>Order Details</h2>
                        <p>{totalItems} items</p>
                        <p className="total-text">
                            Total: <span className="total-price">${totalPrice.toFixed(2)}</span>
                        </p>
                        <form onSubmit={handleOrderSubmission} className="order-form">
                            <input type="text" placeholder="Name" required />
                            <input type="tel" placeholder="Phone Number" required />
                            <input type="email" placeholder="Email" required />
                            <button type="submit" className="order-button">Place Order</button>
                        </form>
                    </aside>
                </div>
            )}
        </div>
    );
};

export default CartPage;