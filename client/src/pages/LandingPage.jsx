import React from 'react'
import { Link } from "react-router-dom"
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Title from '../components/Title'
import ProblemGrid from '@/components/ProblemGrid'

function LandingPage() {
  return (
    <div className='w-full min-h-screen'>
      <Navbar />
      <Hero />
      <Title title={"Job Descriptions Aren't Enough"} dec={"You have the resume and the target role. Turning them into a clear picture of your readiness shouldn't be manual."} />
      <ProblemGrid />
    </div>
  )
}

export default LandingPage