import { useState } from 'react'
import addBtn from '../assets/add-button.png'
import subtractBtn from '../assets/subtract-button.png'

export const CheckOutFood = ({cartItem})=>{
    const [foodCount,setFoodCount] = useState(0)
    const [checked,setChecked] = useState(false)
    return(
        <div className='checkout-items'>
          <img src={cartItem.FoodImage} alt='food'/>
          <p className='foodName'>{cartItem.foodName}</p>
          <div className='Btn-container'>
            <button className='SubtractFood'
              onClick={()=> foodCount > 0 && setFoodCount(prevNum =>(prevNum - 1))}
            ><img src={subtractBtn} alt="subtract" /></button>
            <p className='food-Count'>{foodCount}</p>
            <button className='addFood'
              onClick={()=> setFoodCount(prevNum =>(prevNum + 1))}
            ><img src={addBtn} alt="add" /></button>
          </div>
          <label htmlFor="beverages">Beverages</label>
          <input type="checkbox"
            onClick={(e)=>{
              e.target.checked === true ? setChecked(true) : setChecked(false)
            }}
          />
          {checked &&
            <select name="" id="beveragesSelect">
              <option value="pick a drink">pick a drink</option>
            </select>}
            <p className='checkout-food-price'>{cartItem.FoodPrice}</p>
            </div>
    )
}