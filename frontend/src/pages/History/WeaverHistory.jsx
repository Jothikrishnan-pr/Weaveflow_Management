import { useState } from 'react'
import { getWeaverHistory } from '../../api/historyApi'
import LoadingSpinner from '../../components/LoadingSpinner'
import StatusBadge from '../../components/StatusBadge'
import { formatCurrency, formatDate } from '../../utils/formatters'

export default function WeaverHistory() {
  const [weaverName, setWeaverName] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!weaverName.trim()) return
    setError('')
    setData(null)
    setLoading(true)
    try {
      const res = await getWeaverHistory(weaverName.trim())
      setData(res)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // The shape of HistoryResponseDTO isn't confirmed yet — this renders
  // any array fields it finds (e.g. payments, advances, looms) as tables,
  // so it works once you know the exact field names from your friend.
  const arrayFields = data
    ? Object.entries(data).filter(([, v]) => Array.isArray(v) && v.length > 0)
    : []

  return (
    <div className="page-wrap">
      <h1>Weaver History</h1>
      <div className="weave-divider" />

      <form className="card" onSubmit={handleSearch} style={{ display: 'flex', gap: 12, alignItems: 'flex-end', maxWidth: 480 }}>
        <div className="form-field" style={{ flex: 1 }}>
          <label htmlFor="weaverName">Weaver Name</label>
          <input id="weaverName" value={weaverName} onChange={(e) => setWeaverName(e.target.value)} placeholder="e.g. Kris" required />
        </div>
        <button className="btn btn-gold" type="submit" disabled={loading}>
          {loading ? 'Loading…' : 'View History'}
        </button>
      </form>

      {error && <div className="error-banner" style={{ marginTop: 20 }}>{error}</div>}
      {loading && <LoadingSpinner label="Fetching history…" />}

      {data && !loading && (
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {arrayFields.length === 0 && (
            <pre className="card" style={{ overflowX: 'auto', fontSize: 13 }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          )}

          {arrayFields.map(([key, rows]) => (
            <div className="card" key={key}>
              <h3 style={{ textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</h3>
              <table>
                <thead>
                  <tr>
                    {Object.keys(rows[0]).map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i}>
                      {Object.entries(row).map(([col, val]) => (
                        <td key={col}>
                          {col.toLowerCase().includes('status') ? (
                            <StatusBadge status={val} />
                          ) : col.toLowerCase().includes('date') ? (
                            formatDate(val)
                          ) : col.toLowerCase().includes('amount') || col.toLowerCase().includes('rate') ? (
                            typeof val === 'number' ? formatCurrency(val) : String(val)
                          ) : (
                            String(val)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
