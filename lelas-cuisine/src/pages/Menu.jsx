import React, { useEffect, useRef, useState } from 'react'
import Ads from '../components/Ads'
import Nav from '../components/Nav'
import Dish from '../components/Dish'
import DishesLoading from '../components/DishesLoading'
import { NutritionFacts, openOrCloseUser } from './Home'
import Footer from '../components/Footer'
import { createClient } from 'contentful'

function Menu({meals,cart}) {
  const [loading,setLoading] = useState(true)
  const [currentDishType,setCurrentDishType] = useState('')
  const [currentDishes,setCurrentDishes] = useState([])
  const [locallyStoredDishType] = useState(JSON.parse(localStorage.getItem('foodType')))
  const ref = useRef(null)
  const client = createClient({
    space: 'sn9ofih1jyrk',
    accessToken: 'FxI331m4SJx0yBZxX4ZXssXqpo47N7jcX3TWZcpo8fc'
  })
  useEffect(()=>{
    locallyStoredDishType ? setCurrentDishType(locallyStoredDishType):
    meals.length > 0 && setCurrentDishType(meals[0].fields.dish)
  },[meals])
  useEffect(()=>{
    setLoading(true)
    currentDishType && setTimeout(() => {
      client.getEntries({
        content_type: currentDishType.replaceAll(' ', '')
      })
        .then(data => {
          setCurrentDishes(data.items)
          setTimeout(() => {
            setLoading(false)
          }, 2500);
        })
        .catch(err => console.error(err))
    }, 3000);
  },[currentDishType])
  !loading && setTimeout(() => {
    ref.current.addEventListener('click', function setDishName(){
      setCurrentDishType(ref.current.value)
    })
  }, 3000);

  return (
    <>
      <Nav openOrCloseUser={openOrCloseUser} cart={cart}/>
      <section className='menu-section'>
        <Ads />


        {meals.length > 0 && <select ref={ref} style={{fontFamily: 'Leckerli One'}} name='Menu' className='menu-list' id='currentDishType'>
          {locallyStoredDishType &&
            <option style={{fontFamily: 'Mada'}} value={locallyStoredDishType} key={Math.random()} selected>{locallyStoredDishType}</option>
          }
          {meals.map((mealName,index) =>((
            mealName.fields.dish !== locallyStoredDishType && <option style={{fontFamily: 'Mada'}} value={mealName.fields.dish} key={index}>{mealName.fields.dish}</option>
          )))}
        </select>}

        <section className='menu'>
          {loading ?[
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>
          ]:
            currentDishes.map(dish =>((
              <Dish
                dishName={dish.fields.foodName}
                dishPrice={dish.fields.foodPrice}
                dishImage={dish.fields.foodImg.fields.file.url}
                discountPrice={dish.fields.foodDiscountPrice}
                key={dish.sys.id}
              />
            )))
          }
        </section>

        <NutritionFacts loading={loading}/>

        <Footer />
      </section>
    </>
  )
}

export default Menu