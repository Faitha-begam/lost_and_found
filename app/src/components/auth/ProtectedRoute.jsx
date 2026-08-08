import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getSession } from '../../utils/authStorage.js'

function ProtectedRoute() {
  const location = useLocation()
  return getSession() ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname }} />
}

export default ProtectedRoute
