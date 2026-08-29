import { useState } from 'react'
import { makePayment } from '../../api/salaryApi'
import { PaymentMode } from '../../utils/enums'

const initialState = { weaverCode: '', paymentMode: PaymentMode[0], amount: '' }

export default function MakePayment() {
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
      const res = await makePayment({ ...form, amount: Number(form.amount) })
      setSuccess(typeof res === 'string' ? res : 'Payment recorded.')
      setForm(initialState)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-wrap">
      <h1>Make Payment</h1>
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
            <label htmlFor="paymentMode">Payment Mode</label>
            <select id="paymentMode" name="paymentMode" value={form.paymentMode} onChange={handleChange}>
              {PaymentMode.map((mode) => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="amount">Amount (₹)</label>
            <input id="amount" name="amount" type="number" min="0" step="0.01" value={form.amount} onChange={handleChange} required />
          </div>
        </div>
        <button className="btn btn-primary" type="submit" disabled={submitting} style={{ marginTop: 20 }}>
          {submitting ? 'Processing…' : 'Make Payment'}
        </button>
      </form>
    </div>
  )
}
