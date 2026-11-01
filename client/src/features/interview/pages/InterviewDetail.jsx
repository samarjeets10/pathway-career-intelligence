import { Link, useParams } from "react-router-dom"
import { useReport } from "../hooks/useInterview"
import { ArrowLeft } from "lucide-react";

const severityClass = {
    high: "text-destructive",
    medium: "text-amber-600",
    low: "text-muted-foreground",
};


function Section({ title, children }) {
    return (
        <section className="space-y-3 rounded-xl border bg-card p-5">
            <h2 className="text-lg font-semibold">{title}</h2>
            {children}
        </section>
    )
}

function InterviewDetail() {

    const { id } = useParams();
    const { data: r, isLoading, error } = useReport(id);
    
    if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
    if (error) return <p className="text-sm text-destructive">{error.message}</p>;
    if (!r) return null;

  return (
    <div className='mx-auto w-full max-w-4xl space-y-6'>
        <Link to="/dashboard/interviews" className="text-sm flex items-center gap-2 w-fit bg-[#c8f36b]"><ArrowLeft size={16} /> All reports</Link>

        <section className="flex items-center justify-between gap-4 rounded-xl border bg-card p-5">
            <div className="min-w-0">
                <p className="text-sm text-muted-foreground">
                    {new Date(r.createdAt).toLocaleDateString()}
                </p>
                <p className="truncate font-medium">{r.jobDescription.slice(0, 100)}…</p>
            </div>
            <span className="text-4xl font-semibold">{r.matchScore}%</span>
        </section>

        <Section title={`Skill gaps (${r.skillGaps.length})`}>
            {r.skillGaps.length === 0 && <p className="text-sm text-muted-foreground">No gaps found.</p>}
            {[...r.skillGaps].sort((a, b) => a.priority - b.priority).map((g) => (
                <div key={g.skill} className="space-y-1 border-t pt-3 text-sm first:border-0 first:pt-0">
                    <p className="font-medium">
                        {g.skill}{" "}
                        <span className={`text-xs uppercase ${severityClass[g.severity]}`}>{g.severity}</span>
                    </p>
                    <p className="text-muted-foreground">{g.reason}</p>
                    <p>{g.recommendation}</p>
                </div>
            ))}
        </Section>

        <Section title={`Technical questions (${r.technicalQuestions.length})`}>
            {r.technicalQuestions.map((q, i) => (
                <details key={i} className="border-t pt-3 text-sm first:border-0 first:pt-0">
                    <summary className="cursor-pointer font-medium">
                        {q.question} <span className="text-xs text-muted-foreground">· {q.difficulty}</span>
                    </summary>
                    <p className="mt-2 text-muted-foreground">Why asked: {q.intention}</p>
                    <p className="mt-2">{q.answer}</p>
                    <ul className="mt-2 list-disc pl-5">
                        {q.expectedAnswerPoints.map((p, j) => <li key={j}>{p}</li>)}
                    </ul>
                </details>
            ))}
        </Section>

        <Section title={`Behavioral questions (${r.behavioralQuestions.length})`}>
            {r.behavioralQuestions.map((q, i) => (
                <details key={i} className="border-t pt-3 text-sm first:border-0 first:pt-0">
                    <summary className="cursor-pointer font-medium">{q.question}</summary>
                    <p className="mt-2 text-muted-foreground">Why asked: {q.intention}</p>
                    <p className="mt-2">{q.answer}</p>
                    <p className="mt-2 text-xs text-muted-foreground">Structure: {q.recommendedStructure}</p>
                </details>
            ))}
        </Section>

        <Section title="Preparation plan">
            {r.preparationPlan.map((d) => (
                <div key={d.day} className="border-t pt-3 text-sm first:border-0 first:pt-0">
                    <p className="font-medium">Day {d.day}: {d.focus}</p>
                    <ul className="mt-1 list-disc pl-5">
                        {d.tasks.map((t, i) => <li key={i}>{typeof t === "string" ? t : t.task}</li>)}
                    </ul>
                </div>
            ))}
        </Section>
    </div>
  )
}

export default InterviewDetail