import { useState } from 'react'
import { addLoom } from '../../api/loomApi'

const initialState = { weaverCode: '', ratePerSaree: '' }

export default function AddLoom() {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)
    try {
      const res = await addLoom({ ...form, ratePerSaree: Number(form.ratePerSaree) })
      setSuccess(typeof res === 'string' ? res : 'Loom added successfully.')
      setForm(initialState)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-wrap">
      <h1>Add Loom</h1>
      <div className="weave-divider" />

      {error && <div className="error-banner">{error}</div>}
      {success && <div className="success-banner">{success}</div>}

      <form className="card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="weaverCode">Weaver Code</label>
            <input id="weaverCode" name="weaverCode" placeholder="e.g. WV001" value={form.weaverCode} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="ratePerSaree">Rate per Saree (₹)</label>
            <input id="ratePerSaree" name="ratePerSaree" type="number" min="0" step="0.01" value={form.ratePerSaree} onChange={handleChange} required />
          </div>
        </div>
        <button className="btn btn-primary" type="submit" disabled={submitting} style={{ marginTop: 20 }}>
          {submitting ? 'Saving…' : 'Add Loom'}
        </button>
      </form>
    </div>
  )
}
