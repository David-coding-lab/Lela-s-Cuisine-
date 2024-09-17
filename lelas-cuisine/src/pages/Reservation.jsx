import React from 'react'
import reserveImg from '../assets/man_and_woman_dinning.png'
import Nav from '../components/Nav'
import { openOrCloseUser } from './Home'
function Reservation() {
  function handleBooking(){
    alert('Booked')
    window.location.href = '/Menu'
  }
  return (
  <>
    <Nav openOrCloseUser={openOrCloseUser} />
    <section className='reservation-section'>
    <section className="reserve_left">
      <h1>Book a Reservation </h1>
      <img src={reserveImg} alt="man_and_woman_dinning" />
    </section>
    <section className="reserve_right">
      <div className="form">
        <input type="text" placeholder='Name'/>
        <input type="tel" placeholder='number'/>
        <input type="date" placeholder='date'/>
        <div className="location">
          <label className='label1'>
            Desired Location
            <select  className='town'>
                <option value='Select Location'>Select Location</option>
                <option value='Gwarimpa'>Abuja</option>
                <option value='Maitama'>Lagos</option>
                <option value='Kado'>Port-harcot</option>
                <option value='Banes'>Anabara</option>
            </select>
          </label>
          <label>
            <select className='town'>
                <option value='Select City'>Select City</option>
                <option value='Gwarimpa'>Gwarimpa</option>
                <option value='Maitama'>Maitama</option>
                <option value='Kado'>Kado</option>
                <option value='Banes'>Banes</option>
            </select>
          </label>
          </div>
      </div>
      <button className='book-reservation-btn' onClick={handleBooking}>Book</button>
    </section>
  </section>
  </>
  )
}

export default Reservation