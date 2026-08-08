import PageContainer from '../components/common/PageContainer.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'

function PagePlaceholder({ eyebrow = 'ReConnect', title, description = 'This section is prepared and will be developed in a later step.' }) {
  return (
    <PageContainer className="py-14 sm:py-20">
      <div className="rounded-3xl border border-ink/10 bg-white px-6 py-12 shadow-sm sm:px-10">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-8 h-1 w-14 rounded-full bg-teal" />
      </div>
    </PageContainer>
  )
}

export default PagePlaceholder
