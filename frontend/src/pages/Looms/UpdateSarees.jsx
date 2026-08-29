import { useState } from 'react'
import { updateCompletedSarees } from '../../api/sareeApi'

const initialState = { weaverCode: '', newCompletedSaree: '' }

export default function UpdateSarees() {
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
      const res = await updateCompletedSarees({
        ...form,
        newCompletedSaree: Number(form.newCompletedSaree),
      })
      setSuccess(typeof res === 'string' ? res : 'Production updated.')
      setForm(initialState)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-wrap">
      <h1>Update Completed Sarees</h1>
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
            <label htmlFor="newCompletedSaree">Newly Completed Sarees</label>
            <input id="newCompletedSaree" name="newCompletedSaree" type="number" min="0" value={form.newCompletedSaree} onChange={handleChange} required />
          </div>
        </div>
        <button className="btn btn-primary" type="submit" disabled={submitting} style={{ marginTop: 20 }}>
          {submitting ? 'Updating…' : 'Update Production'}
        </button>
      </form>
    </div>
  )
}
