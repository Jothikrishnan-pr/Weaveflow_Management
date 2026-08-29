import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import AddWeaver from '../pages/Weavers/AddWeaver'
import AddLoom from '../pages/Looms/AddLoom'
import UpdateSarees from '../pages/Looms/UpdateSarees'
import AddAdvance from '../pages/Advance/AddAdvance'
import MakePayment from '../pages/Salary/MakePayment'
import WeaverHistory from '../pages/History/WeaverHistory'
import SearchWeaver from '../pages/Search/SearchWeaver'
import Login from '../pages/Login/Login'
import Landing from '../pages/Landing/Landing'
import ProtectedRoute from '../components/ProtectedRoute'
import MainLayout from '../layouts/MainLayout'

const withLayout = (page, roles) => (
  <ProtectedRoute roles={roles}>
    <MainLayout>{page}</MainLayout>
  </ProtectedRoute>
)

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={withLayout(<Dashboard />)} />
      <Route path="/weavers/add" element={withLayout(<AddWeaver />, ['ADMIN'])} />
      <Route path="/looms/add" element={withLayout(<AddLoom />, ['ADMIN'])} />
      <Route path="/looms/update" element={withLayout(<UpdateSarees />)} />
      <Route path="/advance/add" element={withLayout(<AddAdvance />, ['ADMIN'])} />
      <Route path="/salary/pay" element={withLayout(<MakePayment />, ['ADMIN'])} />
      <Route path="/history" element={withLayout(<WeaverHistory />)} />
      <Route path="/search" element={withLayout(<SearchWeaver />)} />
    </Routes>
  )
}