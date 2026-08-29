import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/weavers/add', label: 'Add Weaver', roles: ['ADMIN'] },
  { to: '/looms/add', label: 'Add Loom', roles: ['ADMIN'] },
  { to: '/looms/update', label: 'Update Sarees' },
  { to: '/advance/add', label: 'Advance', roles: ['ADMIN'] },
  { to: '/salary/pay', label: 'Payment', roles: ['ADMIN'] },
  { to: '/history', label: 'History' },
  { to: '/search', label: 'Search' },
]

export default function Sidebar() {
  const { username, role, logout } = useAuth()
  const visibleLinks = links.filter((link) => !link.roles || link.roles.includes(role))

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark">WF</span>
        <div>
          <div className="brand-name">WeaveFlow</div>
          <div className="brand-sub">Weavers Management</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {visibleLinks.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/dashboard'} className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {username && (
          <div className="sidebar-user">
            {username}
            {role && <span className="sidebar-role-badge">{role}</span>}
          </div>
        )}
        <button className="sidebar-logout" onClick={logout} type="button">Log out</button>
      </div>
    </aside>
  )
}