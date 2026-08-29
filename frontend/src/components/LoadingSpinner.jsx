export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--ink-400)', padding: '24px 0' }}>
      <div className="spinner" />
      <span>{label}</span>
    </div>
  )
}
