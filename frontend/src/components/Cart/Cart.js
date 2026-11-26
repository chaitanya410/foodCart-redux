import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Pune');
  const [stateName, setStateName] = useState('Maharashtra');
  const [pincode, setPincode] = useState('411027');
  const [error, setError] = useState('');

  const hasItems = cartCtx.items.length > 0;
  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;

  const submitOrderHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderItems: cartCtx.items,
          shippingAddress: {
            address: address.trim() || 'Flat 302, Skyview Residency',
            city: city.trim() || 'Pune',
            state: stateName.trim() || 'Maharashtra',
            pincode: pincode.trim() || '411027',
            country: 'India',
          },
          paymentMethod: 'UPI Express',
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Order failed');

      setOrderSuccess(data);
      cartCtx.clearCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <Modal onClose={props.onClose}>
        <div className={classes.successBox}>
          <span className={classes.badge}>ORDER CONFIRMED</span>
          <h2>🔥 Craving Locked In!</h2>
          <p>
            Order ID: <code>{orderSuccess._id}</code>
          </p>
          <p>
            Total Paid (incl. GST): <strong>₹{orderSuccess.totalPrice}</strong>
          </p>
          <div className={classes.actions} style={{ justifyContent: 'center', marginTop: '1.25rem' }}>
            <Link
              to={`/myOrders/${orderSuccess.user}`}
              onClick={props.onClose}
              className={classes.primaryBtn}
              style={{ textDecoration: 'none' }}
            >
              Track Order →
            </Link>
            <button type="button" className={classes.ghostBtn} onClick={props.onClose}>
              Back to Menu
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={props.onClose}>
      <h2 className={classes.cartHeader}>Your Crave Bag</h2>
      {!hasItems && (
        <p className={classes.emptyText}>Your bag is empty. Add something delicious!</p>
      )}

      <ul className={classes.cartItems}>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={() => cartCtx.removeItem(item.id)}
            onAdd={() => cartCtx.addItem({ ...item, amount: 1 })}
          />
        ))}
      </ul>

      {hasItems && (
        <div className={classes.totalRow}>
          <span>Subtotal</span>
          <span className={classes.totalPrice}>{totalAmount}</span>
        </div>
      )}

      {isCheckingOut && hasItems && (
        <form onSubmit={submitOrderHandler} className={classes.checkoutForm}>
          <input
            type="text"
            required
            placeholder="Street / Flat / Hostel (e.g., Flat 302, Skyview)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={classes.glassInput}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
            <input
              type="text"
              required
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={classes.glassInput}
            />
            <input
              type="text"
              required
              placeholder="State"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              className={classes.glassInput}
            />
          </div>
          <input
            type="text"
            required
            placeholder="Pincode (e.g., 411027)"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className={classes.glassInput}
          />

          {error && <p className={classes.errorText}>{error}</p>}
          <div className={classes.actions}>
            <button
              type="button"
              className={classes.ghostBtn}
              onClick={() => setIsCheckingOut(false)}
            >
              Back
            </button>
            <button type="submit" disabled={isSubmitting} className={classes.primaryBtn}>
              {isSubmitting ? 'Placing Order...' : `Pay & Order ${totalAmount}`}
            </button>
          </div>
        </form>
      )}

      {!isCheckingOut && (
        <div className={classes.actions}>
          <button type="button" className={classes.ghostBtn} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button
              type="button"
              className={classes.primaryBtn}
              onClick={() => setIsCheckingOut(true)}
            >
              Checkout →
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default Cart;