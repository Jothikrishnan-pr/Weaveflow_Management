import Sidebar from '../components/Sidebar'
import '../components/Sidebar.css'

export default function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">{children}</main>
    </div>
  )
}
