import { Navigate, Outlet } from 'react-router-dom'
import { getAdminSession } from '../../utils/storage.js'

function AdminRoute() { return getAdminSession() ? <Outlet /> : <Navigate to="/admin/login" replace /> }

export default AdminRoute
