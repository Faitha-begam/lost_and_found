import { Route, Routes } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import PublicLayout from './layouts/PublicLayout.jsx'
import UserLayout from './layouts/UserLayout.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import AdminRoute from './components/auth/AdminRoute.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import AdminLoginPage from './pages/auth/AdminLoginPage.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'
import VerifyOtpPage from './pages/auth/VerifyOtpPage.jsx'
import { AdminClaimsPage, AdminDashboardPage, AdminRecoveryPage, AdminReportsPage } from './pages/admin/AdminPages.jsx'
import { BrowsePage, HomePage } from './pages/public/PublicPages.jsx'
import DashboardPage from './pages/user/DashboardPage.jsx'
import ItemDetailsPage from './pages/user/ItemDetailsPage.jsx'
import { ReportFoundPage, ReportLostPage } from './pages/user/ReportPages.jsx'
import SmartMatchPage from './pages/user/SmartMatchPage.jsx'
import { MyClaimsPage, MyReportsPage, RecoveryPage } from './pages/user/UserPages.jsx'

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<BrowsePage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/report-lost" element={<ReportLostPage />} />
          <Route path="/report-found" element={<ReportFoundPage />} />
          <Route path="/item/:id" element={<ItemDetailsPage />} />
          <Route path="/smart-match" element={<SmartMatchPage />} />
          <Route path="/my-reports" element={<MyReportsPage />} />
          <Route path="/my-claims" element={<MyClaimsPage />} />
          <Route path="/recovery/:id" element={<RecoveryPage />} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
          <Route path="/admin/claims" element={<AdminClaimsPage />} />
          <Route path="/admin/recovery" element={<AdminRecoveryPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
