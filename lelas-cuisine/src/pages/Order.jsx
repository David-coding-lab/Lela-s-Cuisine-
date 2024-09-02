import React from 'react'
import Nav from '../components/Nav'
import orderReqImg from '../assets/order-requirement.svg'
import deliveryGuy from '../assets/delivery_guy 1.png'
import Footer from '../components/Footer'

function Order() {
  return (
    <>
      <Nav />
      <section className='order-section'>
          <section className='order-main-section'>
            <div className="delivery-guy">
              <img width='350px' src={deliveryGuy} alt='deliveryGuy' />
              <a href="/Menu"><button>Shop Now</button></a>
            </div>
            <img src={orderReqImg} alt="orderRequirements" />
          </section>

        <Footer />
      </section>
    </>
  )
}

export default Order