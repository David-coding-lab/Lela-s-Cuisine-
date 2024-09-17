import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { openOrCloseUser } from './Home'

function About() {
  return (
    <>
      <Nav openOrCloseUser={openOrCloseUser} />
      <section className='about-section'>
        <h1 className='about_h1'>Under Going Maintenance... </h1>


      </section>
      <Footer />
    </>
  )
}

export default About