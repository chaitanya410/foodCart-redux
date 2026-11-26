// import { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import CartContext from '../../../store/cart-context';
// import MealItemForm from './MealItemForm';
// import classes from './MealItem.module.css';

// const MealItem = (props) => {
//   const cartCtx = useContext(CartContext);

//   const addToCartHandler = (amount) => {
//     cartCtx.addItem({
//       id: props.id,
//       name: props.name,
//       amount: amount,
//       price: props.price,
//       image: props.image,
//     });
//   };

//   return (
//     <li className={classes.mealCard}>
//       <Link to={`/${props.id}`} className={classes.imageWrapper}>
//         <img src={props.image} alt={props.name} loading="lazy" />
//         <div className={classes.imageGradient}></div>

//         <span className={classes.ratingBadge}>
//           ★ {props.rating ? Number(props.rating).toFixed(1) : '4.8'}
//         </span>

//         {props.category && (
//           <span className={classes.categoryTag}>{props.category}</span>
//         )}
//       </Link>

//       <div className={classes.content}>
//         <div className={classes.metaTop}>
//           <span className={classes.restaurant}>
//             {props.restaurant || 'Cloud Kitchen'}
//           </span>
//           <span className={classes.prepTime}>• 25 mins</span>
//         </div>

//         <Link to={`/${props.id}`} className={classes.titleLink}>
//           <h3>{props.name}</h3>
//         </Link>

//         <p className={classes.description}>{props.description}</p>

//         <div className={classes.footer}>
//           <div className={classes.priceGroup}>
//             <span className={classes.currency}>₹</span>
//             <span className={classes.price}>{Number(props.price).toFixed(0)}</span>
//           </div>

//           <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
//         </div>
//       </div>
//     </li>
//   );
// };

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../../store/cart-context';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';

const resolveImageSrc = (imgPath) => {
  if (!imgPath) return '';
  if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) return imgPath;
  const cleanPath = imgPath.replace(/^\.?\//, '');
  return `${process.env.PUBLIC_URL || ''}/${cleanPath}`;
};

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const resolvedImage = resolveImageSrc(props.image);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      image: resolvedImage,
    });
  };

  return (
    <li className={classes.mealCard}>
      <Link to={`/${props.id}`} className={classes.imageWrapper}>
        <img src={resolvedImage} alt={props.name} loading="lazy" />
        <div className={classes.imageGradient}></div>

        <span className={classes.ratingBadge}>
          ★ {props.rating ? Number(props.rating).toFixed(1) : '4.8'}
        </span>

        {props.category && (
          <span className={classes.categoryTag}>{props.category}</span>
        )}
      </Link>

      <div className={classes.content}>
        <div className={classes.metaTop}>
          <span className={classes.restaurant}>
            {props.restaurant || 'Cloud Kitchen'}
          </span>
          <span className={classes.prepTime}>• 25 mins</span>
        </div>

        <Link to={`/${props.id}`} className={classes.titleLink}>
          <h3>{props.name}</h3>
        </Link>

        <p className={classes.description}>{props.description}</p>

        <div className={classes.footer}>
          <div className={classes.priceGroup}>
            <span className={classes.currency}>₹</span>
            <span className={classes.price}>{Number(props.price).toFixed(0)}</span>
          </div>

          <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
        </div>
      </div>
    </li>
  );
};

export default MealItem;

// export default MealItem;
