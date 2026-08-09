import { Link } from 'react-router-dom'

const styles = {
  primary: 'bg-teal text-white shadow-sm shadow-teal/25 hover:bg-teal-dark hover:shadow-md hover:shadow-teal/25 focus-visible:outline-teal',
  secondary: 'bg-ink text-white shadow-sm shadow-ink/20 hover:bg-ink-soft hover:shadow-md focus-visible:outline-ink',
  outline: 'border border-ink/15 bg-white/90 text-ink shadow-sm hover:border-teal hover:text-teal hover:shadow-md focus-visible:outline-teal',
  ghost: 'text-ink-muted hover:bg-ink/5 hover:text-ink focus-visible:outline-teal',
}

function Button({ children, className = '', to, variant = 'primary', ...props }) {
  const sharedClassName = `inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ${styles[variant]} ${className}`

  if (to) {
    return <Link to={to} className={sharedClassName} {...props}>{children}</Link>
  }

  return <button type="button" className={sharedClassName} {...props}>{children}</button>
}

export default Button
