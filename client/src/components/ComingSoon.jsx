import React from 'react'

function ComingSoon({ title, description }) {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-3 rounded-xl border border-dashed p-8">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
      <p className="text-xs text-muted-foreground">Coming soon.</p>
    </div>
  )
}

export default ComingSoon