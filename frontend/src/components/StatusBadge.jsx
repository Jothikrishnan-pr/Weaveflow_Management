import { statusBadgeClass } from '../utils/enums'

export default function StatusBadge({ status }) {
  if (!status) return <span className="badge badge-neutral">—</span>
  return <span className={statusBadgeClass(status)}>{status.replaceAll('_', ' ')}</span>
}
