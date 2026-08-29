import { useState } from 'react'
import { makeAdvance } from '../../api/advanceApi'

const initialState = { weaverCode: '', advanceAmount: '', monthlyInterest: '' }

export default function AddAdvance() {
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
      const res = await makeAdvance({
        ...form,
        advanceAmount: Number(form.advanceAmount),
        monthlyInterest: Number(form.monthlyInterest),
      })
      setSuccess(typeof res === 'string' ? res : 'Advance recorded.')
      setForm(initialState)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-wrap">
      <h1>Give Advance</h1>
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
            <label htmlFor="advanceAmount">Advance Amount (₹)</label>
            <input id="advanceAmount" name="advanceAmount" type="number" min="0" step="0.01" value={form.advanceAmount} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="monthlyInterest">Monthly Interest Rate (%)</label>
            <input id="monthlyInterest" name="monthlyInterest" type="number" min="0" value={form.monthlyInterest} onChange={handleChange} required />
          </div>
        </div>
        <button className="btn btn-primary" type="submit" disabled={submitting} style={{ marginTop: 20 }}>
          {submitting ? 'Saving…' : 'Add Advance'}
        </button>
      </form>
    </div>
  )
}
