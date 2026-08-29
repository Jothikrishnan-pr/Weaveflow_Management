import { useState } from 'react'
import { searchWeaver } from '../../api/searchApi'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function SearchWeaver() {
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
      const res = await searchWeaver(weaverName.trim())
      setData(res)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrap">
      <h1>Search Weaver</h1>
      <div className="weave-divider" />

      <form className="card" onSubmit={handleSearch} style={{ display: 'flex', gap: 12, alignItems: 'flex-end', maxWidth: 480 }}>
        <div className="form-field" style={{ flex: 1 }}>
          <label htmlFor="weaverName">Weaver Name</label>
          <input id="weaverName" value={weaverName} onChange={(e) => setWeaverName(e.target.value)} placeholder="e.g. Kris" required />
        </div>
        <button className="btn btn-gold" type="submit" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {error && <div className="error-banner" style={{ marginTop: 20 }}>{error}</div>}
      {loading && <LoadingSpinner label="Searching…" />}

      {data && !loading && (
        <pre className="card" style={{ marginTop: 24, overflowX: 'auto', fontSize: 13 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}
