import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartslice';


const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-card" key={index}>
                <img src={item.img} alt={item.name} className="cart-img" />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>₹ {item.price}</p>
                </div>
                <button className="remove-btn" onClick={() => handleRemove(item)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total: ₹{totalPrice}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
