import React from 'react'

function CapabilityCard({ item }) {

    const Icon = item.icon;
    
  return (
    <article className="group h-full rounded-[1.5rem] border border-neutral-200/90 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-card sm:p-7">
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-[#c8f36b] group-hover:text-neutral-800">
          <Icon size={20} strokeWidth={1.65} />
        </span>
        <span className="font-mono text-sm text-neutral-400">{item.number}</span>
      </div>
      <h3 className="mt-7 max-w-[20rem] font-display text-xl font-bold leading-[1.25] tracking-[-0.045em] text-neutral-800">{item.title}</h3>
      <p className="mt-3 text-sm leading-[1.5] text-neutral-600">{item.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => <span key={tag} className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-medium text-neutral-500">{tag}</span>)}
      </div>
    </article>
  )
}

export default CapabilityCard