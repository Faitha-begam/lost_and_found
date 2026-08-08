import { Link } from 'react-router-dom'

const styles = {
  primary: 'bg-teal text-white hover:bg-teal-dark focus-visible:outline-teal',
  secondary: 'bg-ink text-white hover:bg-ink-soft focus-visible:outline-ink',
  outline: 'border border-ink/15 bg-white text-ink hover:border-teal hover:text-teal focus-visible:outline-teal',
  ghost: 'text-ink-muted hover:bg-ink/5 hover:text-ink focus-visible:outline-teal',
}

function Button({ children, className = '', to, variant = 'primary', ...props }) {
  const sharedClassName = `inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`

  if (to) {
    return <Link to={to} className={sharedClassName} {...props}>{children}</Link>
  }

  return <button type="button" className={sharedClassName} {...props}>{children}</button>
}

export default Button
