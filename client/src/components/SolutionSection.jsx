import {
  ArrowRight,
  BriefcaseBusiness,
  FileCheck2,
  FileText,
  Gauge,
  MessageSquareText, 
} from 'lucide-react'
import CapabilityCard from './CapabilityCard'

function SolutionSection() {

    const capabilities = [
        {
            number: '01',
            icon: FileText,
            title: 'A clearer picture of your experience',
            description: 'Upload resumes and keep their versions in one place. Understand what is already working before you decide what to change.',
            tags: ['Resume analysis', 'Version history', 'ATS insights'],
        },
        {
            number: '02',
            icon: BriefcaseBusiness,
            title: 'A more specific read on every role',
            description: 'Keep track of the roles you are considering. Break a job description into skills, signals, and useful next steps.',
            tags: ['Job tracking', 'Role analysis', 'Skill gaps'],
        },
        {
            number: '03',
            icon: MessageSquareText,
            title: 'Practice with the job in mind',
            description: 'Work through technical, behavioral, project, resume-based, and job-specific questions. Get a structured view of your answers.',
            tags: ['Practice sessions', 'Answer feedback', 'Progress'],
        },
        {
            number: '04',
            icon: FileCheck2,
            title: 'Application materials with intention',
            description: 'Shape role-specific resume versions and prepare a tailored document through a validated, template-based PDF flow.',
            tags: ['Tailoring suggestions', 'Validated data', 'PDF output'],
        },
    ]

  return (
    <section id="product" className="px-4 sm:px-12 lg:px-24 xl:px-40">
      <div className="page-shell">

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:mt-14 xl:grid-cols-2">
          {capabilities.map((item) => <CapabilityCard key={item.number} item={item} />)}
        </div>

        <div className="mt-7 flex flex-col gap-5 rounded-[1.5rem] bg-[#c8f36b] p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
          <div className="flex items-center gap-3.5">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-neutral-800"><Gauge size={22} strokeWidth={1.7} /></span>
            <div>
              <p className="text-lg font-semibold text-neutral-800">Keep the progress you make.</p>
              <p className="mt-1 max-w-xl text-xs leading-[1.65] text-neutral-600">Follow interview practice, retain job history, and revisit resume versions as your direction gets sharper.</p>
            </div>
          </div>
          <a href="#interview" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-neutral-600 transition border border-neutral-600 px-4 py-1 rounded-full hover:bg-neutral-800 hover:text-neutral-100">See interview prep <ArrowRight size={14} /></a>
        </div>
      </div>
    </section>
  )
}

export default SolutionSection