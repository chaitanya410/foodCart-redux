import { useState } from 'react';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [amount, setAmount] = useState(1);

  const decrementHandler = () => {
    setAmount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const incrementHandler = () => {
    setAmount((prev) => (prev < 10 ? prev + 1 : 10));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddToCart(amount);
    setAmount(1); // Reset smoothly after adding
  };

  return (
    <form className={classes.controlGroup} onSubmit={submitHandler}>
      <div className={classes.stepperPill}>
        <button
          type="button"
          onClick={decrementHandler}
          className={classes.stepBtn}
          aria-label="Decrease quantity"
          disabled={amount <= 1}
        >
          −
        </button>
        <span className={classes.qtyValue}>{amount}</span>
        <button
          type="button"
          onClick={incrementHandler}
          className={classes.stepBtn}
          aria-label="Increase quantity"
          disabled={amount >= 10}
        >
          +
        </button>
      </div>

      <button type="submit" className={classes.addBtn}>
        <span>ADD</span>
        <span className={classes.plusIcon}>+</span>
      </button>
    </form>
  );
};

export default MealItemForm;