import { Link } from 'react-router-dom';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.navContainer}>
        <Link to="/" className={classes.brand}>
          <span className={classes.logoIcon}>🔥</span>
          <span className={classes.logoText}>
            CRAVE<span className={classes.logoAccent}>CART</span>
          </span>
        </Link>

        <nav className={classes.navLinks}>
          <Link to="/" className={classes.navLink}>
            Menu
          </Link>
          <Link to="/myOrders/latest" className={classes.navLink}>
            My Orders
          </Link>
        </nav>

        <HeaderCartButton onClick={props.onShowCart} />
      </div>
    </header>
  );
};

export default Header;