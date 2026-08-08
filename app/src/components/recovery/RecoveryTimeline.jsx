const stateClasses = {
  completed: 'bg-teal text-white ring-teal',
  current: 'bg-amber-400 text-ink ring-amber-300',
  pending: 'bg-white text-ink-muted ring-ink/15',
}

function RecoveryTimeline({ stages = [] }) {
  return (
    <ol className="space-y-0">
      {stages.map((stage, index) => {
        const state = stage.state || 'pending'
        return (
          <li key={stage.label} className="relative flex gap-4 pb-7 last:pb-0">
            {index < stages.length - 1 && <span className="absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px bg-ink/10" aria-hidden="true" />}
            <span className={`z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold ring-1 ${stateClasses[state] || stateClasses.pending}`}>
              {state === 'completed' ? '✓' : index + 1}
            </span>
            <div className="pt-1">
              <p className="text-sm font-bold text-ink">{stage.label}</p>
              {stage.description && <p className="mt-1 text-xs leading-5 text-ink-muted">{stage.description}</p>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default RecoveryTimeline
