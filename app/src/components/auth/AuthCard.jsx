function AuthCard({ children, className = '' }) {
  return <section className={`w-full rounded-3xl border border-ink/10 bg-white p-6 shadow-[0_20px_55px_-28px_rgba(16,42,67,0.35)] sm:p-8 ${className}`}>{children}</section>
}

export default AuthCard
