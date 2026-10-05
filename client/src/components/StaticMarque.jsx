import React from 'react'
import { ChevronsRight } from 'lucide-react'

function StaticMarque() {
  return (
    <div className='w-full px-4 border border-neutral-400 lg:mb-8 lg:px-12 py-4 sm:py-8'>
        <ul className='flex items-center justify-between gap-8 overflow-x-hidden text-sm'>
            <li>Role fit</li>
            <li><ChevronsRight size={24}/></li>
            <li>Resume clarity</li>
            <li><ChevronsRight /></li>
            <li>Interview Practice</li>
            <li><ChevronsRight /></li>
            <li>Version control</li>
            <li><ChevronsRight /></li>
            <li>Rediness tracking</li>
        </ul>
    </div>
  )
}

export default StaticMarque