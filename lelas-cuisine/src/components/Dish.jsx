import React from 'react'
import plusIcon from '../assets/plus-btn.png'
function Dish({addFoodToCart,dishName,dishPrice,dishImage,discountPrice}) {
  return (
    <div className='dishCard'>
        <svg width="39" height="37" style={{
          position: 'absolute',
          padding: '10px',
          cursor: 'pointer'
        }} viewBox="0 0 39 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.96624 7.30503L2.96607 7.30536C1.60856 9.99236 1.34398 13.8039 3.73065 18.571L3.7307 18.5711C6.02352 23.1484 10.76 28.5691 19.2152 34.4384L19.5003 34.6363L19.7855 34.4384C28.2408 28.569 32.9747 23.1483 35.2699 18.5713L35.2701 18.5709C37.6565 13.8017 37.3948 9.99246 36.0344 7.30502C33.1816 1.66866 25.2559 0.0676946 20.8876 4.61158L20.8874 4.61182L19.5001 6.0568L18.113 4.61404C13.7449 0.0703377 5.81917 1.66843 2.96624 7.30503ZM19.1407 3.58865L19.5047 3.96555L19.8641 3.58433C19.9921 3.44859 20.1255 3.31821 20.264 3.19351L20.264 3.19356L20.2703 3.18771C25.534 -1.71911 34.381 0.440786 37.4324 6.88007C38.9446 10.0713 39.0473 14.3655 36.4478 19.4349C33.8688 24.4643 28.6315 30.2461 19.5003 36.3978C10.3691 30.2467 5.13174 24.4655 2.55254 19.4366C-0.0471664 14.3677 0.0553053 10.0737 1.56739 6.88252C4.61846 0.443365 13.4653 -1.71785 18.7302 3.18506C18.8701 3.31561 19.0069 3.45013 19.1407 3.58865Z" fill="#DB0909" stroke="#FD0000"/>
        </svg>
        <img className='dishImage' src={dishImage} alt={dishName} />
        <span className='dishDetails'>
          <div className="dishName__Price">
            <p>{dishName}</p>
            <p className='dishPrices'><strong>{discountPrice}</strong> <span className='dishOriginalPrice'>{dishPrice}</span></p>
          </div>
          <img className='addButton' src={plusIcon} alt="Add Food to Cart"
            onClick={()=> addFoodToCart(dishName,dishPrice,dishImage)}
          />
        </span>
    </div>
  )
}

export default Dish