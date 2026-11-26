import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../../UI/Loading';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const MyOrders = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/orders/${id}`);
        if (!res.ok) throw new Error('Failed to load orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [id]);

  return (
    <section style={{ maxWidth: '1000px', margin: '7.5rem auto 5rem', padding: '0 1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
        <div>
          <span style={{ color: 'var(--accent-mango)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em' }}>
            ORDER HISTORY
          </span>
          <h1 style={{ margin: '0.25rem 0 0', fontSize: '2rem' }}>Your Past Cravings 🧾</h1>
        </div>
        <Link
          to="/"
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.16)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          ← Back to Menu
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            No orders found for this user ID yet. Place an order from the menu!
          </p>
          <Link to="/" style={{ color: 'var(--accent-mango)', fontWeight: 700 }}>
            Explore Menu →
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {orders.map((order) => (
            <div
              key={order._id}
              className="glass-panel"
              style={{ padding: '1.5rem', borderRadius: 'var(--radius-xl)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    ORDER #{order._id.slice(-6).toUpperCase()}
                  </span>
                  <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
                    ₹{order.totalPrice?.toFixed(2)} • {order.orderItems?.length || 0} item(s)
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-pill)',
                      background: order.isPaid ? 'rgba(204,255,0,0.15)' : 'rgba(255,77,77,0.15)',
                      color: order.isPaid ? 'var(--accent-lime)' : '#ff6b6b',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                    }}
                  >
                    {order.isPaid ? 'PAID' : 'UNPAID'}
                  </span>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'rgba(255,159,28,0.15)',
                      color: 'var(--accent-mango)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                    }}
                  >
                    {order.isDelivered ? 'DELIVERED' : 'PREPARING'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                {order.orderItems?.map((item, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontSize: '0.85rem',
                    }}
                  >
                    {item.name} × {item.qty}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyOrders;