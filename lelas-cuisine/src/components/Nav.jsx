import React, { useState } from 'react'
import Search from './Search'
import Logo from '../assets/chef-hat.png'
import userAccountIcon from '../assets/account-icon.png'
import cartIcon from '../assets/cart basket.svg'
import closeBtn from '../assets/close.svg'

function Nav({openOrCloseUser}) {
    const [cart] = useState(JSON.parse(sessionStorage.getItem('cart')))
    return (
        <nav>
            <dialog className='user' >
                <button onClick={()=> openOrCloseUser('close')}><img src={closeBtn} alt="closeBtn" /></button>
                <div className='content'>
                    <a href="#">Account Setting</a>
                    <a href="#">Reservation</a>
                    <a href="/Order">Cart</a>
                    <a href="#">Favorites</a>
                    <a href="#">Log Out</a>
                </div>
            </dialog>
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
                {cart && cart.length > 0 &&
                    <button>
                        <img src={cartIcon} alt="account Icon" />
                    </button>
                }
                <button onClick={()=> openOrCloseUser('open')}>
                    <img src={userAccountIcon} alt="account Icon" />
                </button>
            </div>
        </nav>
    )
}

export default Nav