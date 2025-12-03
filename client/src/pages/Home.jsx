import React from 'react'
import Hero from '../components/Hero'

import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import FeaturedMotorcycles from '../components/FeaturedMotorcycles'
import FeaturedYacht from '../components/FeaturedYacht'
import FeaturedBoats from '../components/FeaturedBoats'
import FeaturedAirplanes from '../components/FeaturedAirplanes'
import FeaturedCars from '../components/FeaturedCars'
import Banner2 from '../components/Banner2'



const Home = () => {
  return (
    <>
    <Hero/>
    <Banner2/>
    <FeaturedCars/>
    <FeaturedMotorcycles/>
    <FeaturedYacht/>
    <FeaturedBoats/>
    <FeaturedAirplanes/>
    <Banner/>
    <Testimonial/>

    </>
  )
}

export default Home