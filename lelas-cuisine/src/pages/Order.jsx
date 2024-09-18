import React, { useState } from 'react'
import Nav from '../components/Nav'
import orderReqImg from '../assets/order-requirement.svg'
import deliveryGuy from '../assets/delivery_guy 1.png'
import Footer from '../components/Footer'
import { openOrCloseUser } from './Home'
import { CheckOutFood } from '../components/CheckOutFood'

function Order() {
  const cart = JSON.parse(sessionStorage.getItem('cart'))
  return (
    <>
      <Nav openOrCloseUser={openOrCloseUser} />
      {cart && cart.length > 0
        ? <div className='checkout-section'>
          <h1>Checkout</h1>
          {cart && cart.length > 0 && cart.map(
            (cartItem,id) =>((
              <CheckOutFood key={id} cartItem={cartItem} />
            ))
          )}
        </div>
        :<section className='order-section'>
        <section className='order-main-section'>
          <div className="delivery-guy">
            <img width='350px' src={deliveryGuy} alt='deliveryGuy' />
            <a href="/Menu"><button>Shop Now</button></a>
          </div>
          <img src={orderReqImg} alt="orderRequirements" />
        </section>

      <Footer />
    </section>
    }
    </>
  )
}

export default Order