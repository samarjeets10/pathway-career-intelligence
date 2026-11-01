import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCreateReport } from "../hooks/useInterview"
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const fieldClass = "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring";
const MAX_SIZE = 5 * 1024 * 1024;

function InterviewNew() {

    const navigate = useNavigate();
    const { mutate, isPending, error } = useCreateReport();

    const [resume, setResume] = useState(null);
    const [fileError, setFileError] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    const onFile = (e) => {
        const file = e.target.files?.[0];
        setResume(null);
        setFileError("");

        if (!file) return;
        if (file.type !== "application/pdf") return setFileError("Only PDF files are allowed.");
        if (file.size > MAX_SIZE) return setFileError("File must be under 5MB.");
        setResume(file);
    };


    const onSubmit = (e) => {
        e.preventDefault();
        if (!resume) return setFileError("Please attach your resume PDF.");
        mutate(
            { resume, selfDescription, jobDescription },
            { onSuccess: (report) => navigate(`/dashboard/interviews/${report._id}`) }
        );
    }

  return (
    <div className="mx-auto w-full px-4 py-6 max-w-3xl space-y-6">
        <Link to='/dashboard/interviews' className="py-2 px-4 border w-fit rounded-full text-sm flex items-center gap-2 font-semibold bg-[#c8f36b]"><ArrowLeft size={18} /> All reports</Link>

        <form onSubmit={onSubmit} className="space-y-4 rounded-xl border bg-card p-5">
                <h1 className="text-2xl font-semibold tracking-tight">New interview report</h1>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Resume (PDF, max 5MB)</label>
                    <input type="file" accept="application/pdf" onChange={onFile} className={fieldClass} />
                    {fileError && <p className="text-xs text-destructive">{fileError}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">About you (optional)</label>
                    <textarea rows={3} value={selfDescription} onChange={(e) => setSelfDescription(e.target.value)}
                        className={fieldClass} placeholder="Strengths, goals, anything not on your resume" />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Job description</label>
                    <textarea rows={8} required value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
                        className={fieldClass} placeholder="Paste the job description" />
                </div>

                {error && <p className="text-sm text-destructive">{error.message}</p>}

                <Button type="submit" disabled={isPending}>
                    {isPending ? "Generating report… this can take a minute" : "Generate report"}
                </Button>
            </form>
    </div>
  )
}

export default InterviewNew