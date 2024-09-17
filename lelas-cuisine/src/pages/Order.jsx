import React, { useState } from 'react'
import Nav from '../components/Nav'
import orderReqImg from '../assets/order-requirement.svg'
import deliveryGuy from '../assets/delivery_guy 1.png'
import addBtn from '../assets/add-button.png'
import subtractBtn from '../assets/subtract-button.png'
import Footer from '../components/Footer'
import { openOrCloseUser } from './Home'

function Order() {
  const cart = JSON.parse(localStorage.getItem('cart'))
  const [checked,setChecked] = useState(false)
  const [foodCount,setFoodCount] = useState(0)

  return (
    <>
      <Nav openOrCloseUser={openOrCloseUser} />
      {cart && cart.length > 0
        ? <div>
          <h1>Checkout</h1>
          {cart && cart.length > 0 && cart.map(
            (cartItem,key) =>((
              <div key={key}>
                  <img src={cartItem.FoodImage} alt='food'/>
                  <p>{cartItem.foodName}</p>
                  <button className='SubtractFood'
                    onClick={()=> foodCount > 0 && setFoodCount(prevNum =>(prevNum - 1))}
                  ><img src={subtractBtn} alt="subtract" /></button>
                  <p>{foodCount}</p>
                  <button className='addFood'
                    onClick={()=> setFoodCount(prevNum =>(prevNum + 1))}
                  ><img src={addBtn} alt="add" /></button>
                  <label htmlFor="beverages">Beverages</label>
                  <input type="checkbox" name="beverages" id='beverages'
                    onClick={(e)=>{
                      e.target.checked === true ? setChecked(true) : setChecked(false)
                    }}
                  />
                  {checked &&
                    <select name="beverages" id="beveragesSelect">
                    <option value="pick a drink">pick a drink</option>
                    </select>}
                  <p>{cartItem.FoodPrice}</p>
              </div>
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