import React from 'react'
import Search from './Search'
import Logo from '../assets/chef-hat.png'
import userAccountIcon from '../assets/account-icon.png'

function Nav() {
  return (
    <nav>
        <Search />
        <div className='logo_links'>
            <span className="Logo">
                <a href="/">
                    <img src={Logo} alt="Logo" />
                    <h1>Lela's Cuisine</h1>
                </a>
            </span>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/Menu">Menu</a></li>
                <li><a href="/Order">Order</a></li>
                <li><a href="/About">About</a></li>
            </ul>
        </div>
        <div className="nav_extras">
            <a href="/Reservation">Book a Table</a>
            <button>
                <img src={userAccountIcon} alt="account Icon" />
            </button>
        </div>
    </nav>
  )
}

export default Nav