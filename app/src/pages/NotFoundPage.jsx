import Button from '../components/common/Button.jsx'
import PageContainer from '../components/common/PageContainer.jsx'

function NotFoundPage() {
  return (
    <PageContainer className="grid min-h-[65vh] place-items-center py-16 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal">404</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">This item could not be found.</h1>
        <p className="mt-3 max-w-md text-ink-muted">The page you requested does not exist or may have moved.</p>
        <Button to="/" className="mt-7">Return home</Button>
      </div>
    </PageContainer>
  )
}

export default NotFoundPage
