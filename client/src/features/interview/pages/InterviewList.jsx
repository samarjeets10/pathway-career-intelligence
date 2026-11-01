import { Link } from 'react-router-dom'
import { useReport } from '../hooks/useInterview'

function InterviewList() {

    const { data: reports = [], isLoading, error } = useReport();

  return (
    <div className='mx-auto w-full max-w-4xl space-y-6'>
        <section className='flex items-start justify-between gap-4'>
            <div className='space-y-2'>
                <h1 className='text-3xl font-semibold tracking-tight'>Interview Prep</h1>
                <p className='text-sm text-muted-foreground'>Reports cpmparing your resume with a job: match score , skill gap, questions and a prep plan.</p>
            </div>
            <Link to='/dashboard/interviews/new' className='shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground'>New report</Link>
        </section>

        {
            isLoading && <p className='text-sm text-muted-foreground'>Loading...</p>
        }

        {
            error && <p className='text-sm text-destructive'>{error.message}</p>
        }

        {
            !isLoading && !error && reports.length === 0 && (
                <p className='text-sm text-muted-foreground'>No report yet. Create your first one.</p>
            )
        }

        <div className='space-y-3'>
            {reports.map((r) => (
                <Link 
                key={r._id}
                to={`/dashboard/interviews/${r._id}`}
                className='flex items-center justify-between gap-4 rounded-xl border bg-card p-4 hover:bg-accent'>
                    <div className='min-w-0'>
                        <p className='truncate text-sm font-medium'>{r.jobDescription.slice(0, 90)}...</p>
                        <p className='text-xs text-muted-foreground'>{new Date(r.createdAt).toLocaleDateString()} - {r.skillGaps?.length ?? 0} skill gaps</p>
                    </div>
                    <span className='text-2xl font-semibold'>{r.matchScore}%</span>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default InterviewList