import React from 'react'
import { Link } from "react-router-dom"
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Title from '../components/Title'

function LandingPage() {
  return (
    <div className='w-full min-h-screen'>
      <Navbar />
      <Hero />
      <Title title={"Trusted by"} dec={"individuals and career freeks who really tuested and happy users of the platform"} />
    </div>
  )
}

export default LandingPage