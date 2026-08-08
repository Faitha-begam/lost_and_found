function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-teal">{eyebrow}</p>}
      <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-base leading-7 text-ink-muted">{description}</p>}
    </div>
  )
}

export default SectionHeading
