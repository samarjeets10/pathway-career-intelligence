function Dashboard() {

return ( 

  <div className="mx-auto w-full max-w-7xl space-y-8"> <section className="space-y-2"> <p className="text-sm text-muted-foreground">
  Your career workspace </p>
      <h1 className="text-3xl font-semibold tracking-tight">
        Dashboard
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

        <p className="mt-3 text-3xl font-semibold">—</p>

        <p className="mt-2 text-xs text-muted-foreground">
          Your analysis history will appear here.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">
          Job Matches
        </p>

        <p className="mt-3 text-3xl font-semibold">—</p>

        <p className="mt-2 text-xs text-muted-foreground">
          Your matching results will appear here.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">
          Skills to Improve
        </p>

        <p className="mt-3 text-3xl font-semibold">—</p>

        <p className="mt-2 text-xs text-muted-foreground">
          Identify gaps from your resume analyses.
        </p>
      </div>
    </section>

    <section className="rounded-xl border border-dashed p-8">
      <h2 className="text-lg font-semibold">
        Start with a resume analysis
      </h2>

      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Compare your resume with a target job description
        to understand your strengths and identify missing skills.
      </p>
    </section>
  </div>

);
}

export default Dashboard;
