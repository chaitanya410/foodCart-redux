// frontend/src/components/Layout/Footer.js
const Footer = () => {
  return (
    <footer
      style={{
        maxWidth: '1200px',
        margin: '0 auto 2rem',
        padding: '1.5rem 1.75rem',
        borderRadius: 'var(--radius-xl)',
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        color: 'var(--text-secondary)',
        fontSize: '0.88rem',
      }}
    >
      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
        🔥 CRAVECART — Late-Night & All-Day Drops
      </div>
      <div>Crafted with React, Express & MongoDB • Fast, Fresh & Glassmorphic</div>
    </footer>
  );
};

export default Footer;