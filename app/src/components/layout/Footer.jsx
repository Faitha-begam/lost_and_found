import { Link } from 'react-router-dom'
import PageContainer from '../common/PageContainer.jsx'

function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink py-10 text-white">
      <PageContainer className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link to="/" className="text-lg font-extrabold tracking-tight">Re<span className="text-teal-light">Connect</span></Link>
          <p className="mt-2 text-sm text-slate-300">Find. Verify. Reconnect.</p>
        </div>
        <div className="flex flex-col gap-4 sm:items-end">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300" aria-label="Footer navigation">
            <Link to="/" className="hover:text-white">Home</Link><Link to="/browse" className="hover:text-white">Browse Items</Link><a href="/#how-it-works" className="hover:text-white">How It Works</a><Link to="/login" className="hover:text-white">Login</Link>
          </nav>
          <p className="text-xs text-slate-400">Frontend prototype built with React.js.</p>
        </div>
      </PageContainer>
    </footer>
  )
}

export default Footer
