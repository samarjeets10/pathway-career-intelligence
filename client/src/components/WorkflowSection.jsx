import React from 'react'
import {
    FileText,
    ScanSearch,
    Target,
    BookOpenCheck,
    ArrowRight
} from 'lucide-react'

function WorkflowSection() {

    const steps = [
        {
            number: '01',
            icon: FileText,
            title: 'Start with what you have',
            text: 'Add your resume and keep the versions that tell the story of your experience.',
        },
        {
            number: '02',
            icon: ScanSearch,
            title: 'Make the role legible',
            text: 'Analyze a job description to see its core requirements, skills, and language.',
        },
        {
            number: '03',
            icon: Target,
            title: 'Find the useful signal',
            text: 'Review a role match, skill coverage, missing signals, and areas worth building.',
        },
        {
            number: '04',
            icon: BookOpenCheck,
            title: 'Prepare with purpose',
            text: 'Practice targeted answers, shape your application materials, and track your progress.',
        },
    ];

  return (
    <section className='w-full px-4 sm:px-12 lg:px-24 xl:px-40 py-4'>
        <div className="journey-track mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <article key={step.number} className="journey-step relative rounded-[1.4rem] border border-neutral-200/90 bg-white px-5 pb-6 pt-5 transition duration-300 hover:-translate-y-1 hover:shadow-card sm:px-6 sm:pb-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700"><Icon size={18} strokeWidth={1.7} /></span>
                  <span className="font-mono text-[11px] text-neutral-400">{step.number}</span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold tracking-[-0.045em] text-neutral-800">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.7] text-neutral-600">{step.text}</p>
                {index < steps.length - 1 && <span className="journey-next" aria-hidden="true"><ArrowRight size={14} /></span>}
              </article>
            )
          })}
        </div>

    </section>
  )
}

export default WorkflowSection