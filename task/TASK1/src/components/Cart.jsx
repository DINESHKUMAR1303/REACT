import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartslice";
import { useNavigate } from "react-router-dom"; 

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const [suggestion, setSuggestion] = useState("");

  const itemTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFee = 93;
  const gst = 22.8;
  const totalPay = itemTotal + deliveryFee + gst;

  const handleCheckout = () => {
    navigate("/login"); 
  };

  return (
    <div className="cart-container">
      {/* Cart Items */}
      <h2 className="cart-title">Your Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.img} alt={item.name} className="cart-item-img" />
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <div className="quantity-stepper">
                <button
                  className="qty-btn"
                  onClick={() => dispatch(decreaseQty(item.id))}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => dispatch(increaseQty(item.id))}
                >
                  +
                </button>
              </div>
            </div>
            <div className="item-price">₹{item.price * item.quantity}</div>
          </div>
        ))}
      </div>

      {/* Suggestion Box */}
      <div className="cart-suggestion">
        <label htmlFor="suggestion" className="suggestion-label">
          Any suggestions? We will pass it on…
        </label>
        <textarea
          id="suggestion"
          className="suggestion-textarea"
          placeholder="Write your instructions (e.g., no onions)"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          rows="3"
        />
      </div>

      {/* No-contact Delivery */}
      <div className="cart-option">
        <input type="checkbox" id="no-contact" />
        <label htmlFor="no-contact">
          <strong>Opt in for No-contact Delivery</strong>
          <br />
          Unwell, or avoiding contact? Please select no-contact delivery.
        </label>
      </div>

      {/* Apply Coupon */}
      <div className="cart-coupon">Apply Coupon</div>

      {/* Bill Details */}
      <div className="bill-section">
        <h4>Bill Details</h4>
        <div className="bill-row">
          <span>Item Total</span>
          <span>₹{itemTotal}</span>
        </div>
        <div className="bill-row">
          <span>Delivery Fee | 13.1 kms</span>
          <span>₹{deliveryFee}</span>
        </div>
        <div className="bill-row">
          <span>GST & Other Charges</span>
          <span>₹{gst}</span>
        </div>
        <hr />
        <div className="bill-total">
          <strong>TO PAY</strong>
          <strong>₹{totalPay}</strong>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="checkout-btn" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
