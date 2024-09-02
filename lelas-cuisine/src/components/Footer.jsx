import React from 'react'
import logo from '../assets/chef-hat.png'
function Footer() {
  return (
    <footer>
        <div>
            <h3>Community</h3>
            <a href="">Service</a>
            <a href="">About</a>
        </div>
        <div>
            <h3>Legal</h3>
            <a href="">Terms</a>
            <a href="">Policy</a>
        </div>
        <div>
            <h3>Partnership</h3>
            <a href="">Drum Stick</a>
            <a href="">KFC Chicken</a>
            <a href="">Dodo Pizza</a>
        </div>
        <div className='footer-logo-container'>
            <img src={logo} alt="Logo" />
            <h1>Lela's Cuisine</h1>
        </div>
        <div>
            <h3>Distribution</h3>
            <a href="">International</a>
            <a href="">Versatile</a>
            <a href="">Global</a>
        </div>
        <div>
            <h3>Social</h3>
            <a href="">Face Book</a>
            <a href="">Instagram</a>
            <a href="">Tweeter</a>
        </div>
    </footer>
  )
}

export default Footer