import { useEffect, useState } from 'react'
import { getDashboard } from '../../api/dashboardApi'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-wrap">
      <h1>Dashboard</h1>
      <div className="weave-divider" />

      {error && <div className="error-banner">{error}</div>}
      {loading && <LoadingSpinner label="Loading dashboard…" />}

      {!loading && !error && data && (
        <div className="stat-grid">
          {Object.entries(data).map(([key, value]) => (
            <div className="stat-card" key={key}>
              <div className="stat-label">{key.replace(/([A-Z])/g, ' $1')}</div>
              <div className="stat-value">{String(value)}</div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && !data && (
        <p style={{ color: 'var(--ink-400)' }}>No dashboard data returned yet.</p>
      )}

      {/* <p style={{ color: 'var(--ink-400)', fontSize: 13 }}>
        This renders whatever fields <code>DashboardResponseDTO</code> returns from
        <code> GET /home</code>. Once you confirm the exact field names with your friend,
        swap this generic grid for named stat cards (Total Weavers, Open Advances, etc.).
      </p> */}
    </div>
  )
}
