// frontend/src/components/UI/Loading.js
const Loading = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
        width: '100%',
      }}
    >
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          style={{
            height: '340px',
            borderRadius: 'var(--radius-xl)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            fontWeight: 600,
          }}
        >
          Cooking up deliciousness...
        </div>
      ))}
    </div>
  );
};

export default Loading;