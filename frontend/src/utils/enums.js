// These MUST match the backend Java enums exactly (Enum/ folder),
// since @RequestBody deserialization will fail on any mismatched string.

export const SareeType = ['SILK', 'COTTON', 'SOFT_SILK']

export const LoomStatus = ['OPEN', 'IN_PROGRESS', 'WAITING_FOR_PAYMENT', 'COMPLETED']

export const PaymentMode = ['CASH', 'UPI']

export const PaymentStatus = ['PENDING', 'PARTIAL', 'PAID']

export const AdvanceStatus = ['OPEN', 'CLOSED']

// Maps a status string to a badge color class defined in index.css
export const statusBadgeClass = (status) => {
  switch (status) {
    case 'COMPLETED':
    case 'PAID':
    case 'CLOSED':
      return 'badge badge-sage'
    case 'IN_PROGRESS':
    case 'PARTIAL':
      return 'badge badge-gold'
    case 'WAITING_FOR_PAYMENT':
    case 'PENDING':
      return 'badge badge-maroon'
    default:
      return 'badge badge-neutral'
  }
}
