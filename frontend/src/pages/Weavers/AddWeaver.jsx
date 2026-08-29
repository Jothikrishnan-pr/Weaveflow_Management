import { useState } from 'react'
import { addWeaver } from '../../api/weaverApi'
import { SareeType } from '../../utils/enums'

const initialState = {
  name: '',
  mobileNo: '',
  address: '',
  accountNo: '',
  ifscCode: '',
  sareeType: SareeType[0],
  advance: '',
  monthlyInterestRate: '',
  photoPath: '',
}

export default function AddWeaver() {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)
    try {
      const payload = {
        ...form,
        advance: form.advance === '' ? 0 : Number(form.advance),
        monthlyInterestRate: form.monthlyInterestRate === '' ? 0 : Number(form.monthlyInterestRate),
      }
      const res = await addWeaver(payload)
      setSuccess(res?.message || 'Weaver added successfully.')
      setForm(initialState)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-wrap">
      <h1>Add Weaver</h1>
      <div className="weave-divider" />

      {error && <div className="error-banner">{error}</div>}
      {success && <div className="success-banner">{success}</div>}

      <form className="card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-field">
            <label htmlFor="mobileNo">Mobile Number</label>
            <input id="mobileNo" name="mobileNo" value={form.mobileNo} onChange={handleChange} required />
          </div>

          <div className="form-field full">
            <label htmlFor="address">Address</label>
            <input id="address" name="address" value={form.address} onChange={handleChange} required />
          </div>

          <div className="form-field">
            <label htmlFor="accountNo">Bank Account No.</label>
            <input id="accountNo" name="accountNo" value={form.accountNo} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label htmlFor="ifscCode">IFSC Code</label>
            <input id="ifscCode" name="ifscCode" value={form.ifscCode} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label htmlFor="sareeType">Saree Type</label>
            <select id="sareeType" name="sareeType" value={form.sareeType} onChange={handleChange}>
              {SareeType.map((type) => (
                <option key={type} value={type}>{type.replaceAll('_', ' ')}</option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="advance">Initial Advance (₹)</label>
            <input id="advance" name="advance" type="number" min="0" step="0.01" value={form.advance} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label htmlFor="monthlyInterestRate">Monthly Interest Rate (%)</label>
            <input id="monthlyInterestRate" name="monthlyInterestRate" type="number" min="0" value={form.monthlyInterestRate} onChange={handleChange} />
          </div>

          <div className="form-field full">
            <label htmlFor="photoPath">Photo Path (optional)</label>
            <input id="photoPath" name="photoPath" value={form.photoPath} onChange={handleChange} />
          </div>
        </div>

        <button className="btn btn-primary" type="submit" disabled={submitting} style={{ marginTop: 20 }}>
          {submitting ? 'Saving…' : 'Add Weaver'}
        </button>
      </form>
    </div>
  )
}
