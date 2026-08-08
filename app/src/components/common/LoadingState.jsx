function LoadingState({ label = 'Loading...' }) {
  return (
    <div className="flex min-h-40 items-center justify-center gap-3 rounded-2xl border border-dashed border-ink/15 bg-white p-6 text-sm font-medium text-ink-muted">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-teal/25 border-t-teal" aria-hidden="true" />
      {label}
    </div>
  )
}

export default LoadingState
