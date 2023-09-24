import React from 'react'
import Home from '../Components/home/Home'
import About from '../Components/about/About'
import Plan from '../Components/plans/Plan'
import FAQ from '../Components/faq/FAQ'
import Testimonials from '../Components/testimonials/Testimonials'
import Contact from '../Components/contact/Contact'
import Footer from '../Components/footer/Footer'
import { Outlet } from 'react-router-dom'

const LandingPage = () => {
  return (
        <> 
            <Outlet/> {/* to display login/signup */}
            <Home/>
            <About/>
            <Testimonials/>
            <Plan/>
            <FAQ/>
            <Contact/>
            <Footer/>
        </>
  )
}

export default LandingPage;