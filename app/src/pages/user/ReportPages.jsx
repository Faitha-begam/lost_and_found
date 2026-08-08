import PageContainer from '../../components/common/PageContainer.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import ItemReportForm from '../../components/forms/ItemReportForm.jsx'

function ReportPage({ type }) { return <PageContainer><SectionHeading eyebrow="New report" title={`Report ${type} Item`} description="Add helpful public information, then protect the one detail only the owner should know." /><div className="mt-8 max-w-3xl"><ItemReportForm type={type} /></div></PageContainer> }
export function ReportLostPage() { return <ReportPage type="Lost" /> }
export function ReportFoundPage() { return <ReportPage type="Found" /> }
