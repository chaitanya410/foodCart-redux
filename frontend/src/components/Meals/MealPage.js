import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import CartContext from '../../store/cart-context';
import Loading from '../UI/Loading';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const MealPage = () => {
  const { id } = useParams();
  const cartCtx = useContext(CartContext);
  const [meal, setMeal] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/meals/${id}`);
        if (!res.ok) throw new Error('Meal not found');
        const data = await res.json();
        setMeal(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  if (loading) {
    return (
      <div style={{ maxWidth: '1100px', margin: '8rem auto', padding: '0 1.25rem' }}>
        <Loading />
      </div>
    );
  }

  if (!meal) {
    return (
      <div style={{ maxWidth: '700px', margin: '8rem auto', textAlign: 'center', padding: '2rem' }} className="glass-panel">
        <h2>Dish Not Found</h2>
        <Link to="/" style={{ color: 'var(--accent-mango)' }}>← Back to Menu</Link>
      </div>
    );
  }

  const handleAdd = () => {
    cartCtx.addItem({
      id: meal._id,
      name: meal.name,
      amount: qty,
      price: meal.price,
      image: meal.image,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1200);
  };

  return (
    <section style={{ maxWidth: '1100px', margin: '7.5rem auto 5rem', padding: '0 1.25rem' }}>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginBottom: '1.25rem',
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        ← Back to Menu
      </Link>

      <div
        className="glass-panel"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '2.25rem',
          padding: '2rem',
          borderRadius: 'var(--radius-2xl)',
          alignItems: 'center',
        }}
      >
        <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', height: '370px' }}>
          <img
            src={meal.image}
            alt={meal.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div>
          <span
            style={{
              display: 'inline-block',
              padding: '5px 14px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255, 159, 28, 0.16)',
              color: 'var(--accent-mango)',
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem',
            }}
          >
            {meal.restaurant || 'Signature Kitchen'} • {meal.category || 'Chef Special'}
          </span>

          <h1 style={{ fontSize: '2.3rem', margin: '0 0 0.75rem' }}>{meal.name}</h1>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.2rem' }}>
            <span style={{ color: 'var(--accent-lime)', fontWeight: 700 }}>
              ★ {meal.rating ? meal.rating.toFixed(1) : '4.8'}
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              ({meal.numReviews || 42} verified foodies)
            </span>
            <span
              style={{
                padding: '3px 11px',
                borderRadius: 'var(--radius-pill)',
                background: meal.countInStock > 0 ? 'rgba(200,255,0,0.12)' : 'rgba(255,59,92,0.15)',
                color: meal.countInStock > 0 ? 'var(--accent-lime)' : '#ff6b6b',
                fontSize: '0.78rem',
                fontWeight: 700,
              }}
            >
              {meal.countInStock > 0 ? 'Fresh & Available' : 'Sold Out'}
            </span>
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '2rem' }}>
            {meal.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '2.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginRight: '0.5rem',
              }}
            >
              ₹{meal.price.toFixed(0)}
            </span>

            {/* Unified Horizontal Pill Stepper */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '2.85rem',
                padding: '0 0.35rem',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.18)',
              }}
            >
              <button
                type="button"
                onClick={() => setQty((q) => (q > 1 ? q - 1 : 1))}
                style={{
                  width: '2.15rem',
                  height: '2.15rem',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'transparent',
                  color: '#fff',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                −
              </button>
              <span
                style={{
                  minWidth: '2rem',
                  textAlign: 'center',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.05rem',
                }}
              >
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => (q < 10 ? q + 1 : 10))}
                style={{
                  width: '2.15rem',
                  height: '2.15rem',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'transparent',
                  color: '#fff',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              style={{
                height: '2.85rem',
                padding: '0 1.85rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid rgba(255,255,255,0.2)',
                background: addedFeedback ? 'var(--gradient-lime)' : 'var(--gradient-crave)',
                color: addedFeedback ? '#07060d' : '#fff',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '0.95rem',
                letterSpacing: '0.03em',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 10px 26px rgba(255, 59, 92, 0.4)',
                transition: 'all 0.2s ease',
              }}
            >
              {addedFeedback ? '✓ ADDED TO BAG' : 'ADD TO BAG +'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealPage;