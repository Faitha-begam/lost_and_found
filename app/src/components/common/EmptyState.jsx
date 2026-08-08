function EmptyState({ title = 'Nothing here yet', description = 'New information will appear here when it is available.', action }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink/15 bg-white px-6 py-12 text-center">
      <div className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-full bg-teal-pale text-lg text-teal" aria-hidden="true">⌕</div>
      <h3 className="font-bold text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ink-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export default EmptyState
