import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Descrption from '../components/Descrption'
import Testimonials from '../components/Testimonials'
import GenerateBtn from '../components/GenerateBtn'

const Home = () => {
  return (
    <div>
        <Header/>
        <Steps/>
        <Descrption/>
        <Testimonials/>
        <GenerateBtn/>
    </div>
  )
}

export default Home
