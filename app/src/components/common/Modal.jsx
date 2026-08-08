function Modal({ children, isOpen, onClose, title = 'Dialog' }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/45 p-4" role="presentation" onMouseDown={onClose}>
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold text-ink">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-ink/5 hover:text-ink" aria-label="Close dialog">×</button>
        </div>
        {children}
      </section>
    </div>
  )
}

export default Modal
