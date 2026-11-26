import classes from './CartItem.module.css';

const CartItem = (props) => {
  const itemTotal = `₹${(props.price * props.amount).toFixed(0)}`;

  return (
    <li className={classes.cartItem}>
      <div className={classes.info}>
        <h3 className={classes.title}>{props.name}</h3>
        <div className={classes.metaRow}>
          <span className={classes.unitPrice}>₹{props.price.toFixed(0)} each</span>
          <span className={classes.dot}>•</span>
          <span className={classes.subtotal}>{itemTotal}</span>
        </div>
      </div>

      <div className={classes.stepperPill}>
        <button
          type="button"
          onClick={props.onRemove}
          className={classes.stepBtn}
          aria-label="Remove one"
        >
          −
        </button>
        <span className={classes.qtyCount}>{props.amount}</span>
        <button
          type="button"
          onClick={props.onAdd}
          className={classes.stepBtn}
          aria-label="Add one"
        >
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;