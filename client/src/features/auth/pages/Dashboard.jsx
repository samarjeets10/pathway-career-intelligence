import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useReports } from "@/features/interview/hooks/useInterview";

function Dashboard() {

  const { user } = useAuth();
  const { data: reports = [], isLoading } = useReports();

  const total = reports.length;
  const avgMatch = total ? Math.round(reports.reduce((sum, r) => sum + r.matchScore, 0) / total) : null;

  const skillGapCount = reports.reduce((sum, r) => sum + (r.skillGaps?.length ?? 0), 0);

return ( 

  <div className="mx-auto w-full max-w-7xl space-y-8"> <section className="space-y-2"> <p className="text-sm text-muted-foreground">
  Your career workspace </p>
      <h1 className="text-3xl font-semibold tracking-tight">
        Welcome back, {user?.username}
      </h1>

      <p className="max-w-2xl text-sm text-muted-foreground">
        Understand your skills, evaluate job opportunities,
        and prepare for your next career move.
      </p>
    </section>

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <div className="rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">
          Resumes Analyzed
        </p>

        <p className="mt-3 text-3xl font-semibold">
          {isLoading ? "..." : total}
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          Your analysis history will appear here.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">
          Job Matches
        </p>

        <p className="mt-3 text-3xl font-semibold">
          {avgMatch === null ? "-" : `${avgMatch}%`}
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          Your matching results will appear here.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">
          Skills to Improve
        </p>

        <p className="mt-3 text-3xl font-semibold">
          {isLoading ? "..." : skillGapCount}
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          Identify gaps from your resume analyses.
        </p>
      </div>
    </section>

    <section className='space-y-4 rounded-xl border p-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>Recent reposts</h2>
        <Link to='/dashboard/interviews/new' className='text-sm'>
        { total === 0 ? "Create your first report" : <button className="px-4 py-1 border rounded-xl cursor-pointer">View more</button> }
        </Link>
      </div>

      {
        !isLoading && total === 0 && (
          <p className="text-sm text-muted-foreground">
            Upload a resume and job description to get your first match score.
          </p>
        )
      }

      {
        reports.slice(0, 3).map((r) => 
          <div key={r._id} className="flex items-center justify-between gap-4 p-2 text-sm border rounded-md">
            <span className="truncate">{r.jobDescription.slice(0, 100)}...</span>
            <span className="font-semibold">{r.matchScore}%</span>
          </div>
        )
      }
    </section>
  </div>

);
}

export default Dashboard;
