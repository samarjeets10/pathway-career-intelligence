import React from 'react'
import { Link } from "react-router-dom"
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Title from '../components/Title'
import ProblemGrid from '@/components/ProblemGrid'
import CtaSection from '@/components/CtaSection'
import Footer from "../components/Footer"
// import StaticMarque from '@/components/StaticMarque'
import SolutionSection from '@/components/SolutionSection'

function LandingPage() {
  return (
    <div className='w-full min-h-screen'>
      <Navbar />
      <Hero />
      {/* <StaticMarque /> */}
      <Title title={"Job Descriptions Aren't Enough"} dec={"You have the resume and the target role. Turning them into a clear picture of your readiness shouldn't be manual."} />
      <ProblemGrid />\
      <Title title={"Turn a job post into a useful plan"} dec={"Bring your resume and target role to Pathway. We’ll show you the exact skills gap and guide your next move."} />
      <SolutionSection />
      <CtaSection />
      <Footer />
    </div>
  )
}

export default LandingPage