import React, { useEffect, useState } from 'react'
import Ads from '../components/Ads'
import Nav from '../components/Nav'
import Dish from '../components/Dish'
import DishesLoading from '../components/DishesLoading'
import { NutritionFacts } from './Home'
import Footer from '../components/Footer'
import { createClient } from 'contentful'

function Menu({meals}) {
  const [loading,setLoading] = useState(true)
  const [currentDishType,setCurrentDishType] = useState('')
  const [currentDishes,setCurrentDishes] = useState([])
  const client = createClient({
    space: 'sn9ofih1jyrk',
    accessToken: 'FxI331m4SJx0yBZxX4ZXssXqpo47N7jcX3TWZcpo8fc'
  })
  useEffect(()=>{
    meals.length > 0 && setCurrentDishType(meals[0].fields.dish)
  },[meals])
  useEffect(()=>{
    setLoading(true)
    currentDishType && setTimeout(() => {
      client.getEntries({
        content_type: currentDishType
      })
        .then(data => {
          setCurrentDishes(data)
          setTimeout(() => {
            setLoading(false)
          }, 2500);
        })
        .catch(err => console.error(err))
    }, 3000);
  },[client, currentDishType])
  console.log(currentDishes,currentDishType);
  
  return (
    <>
      <Nav />
      <section className='menu-section'>
        <Ads />


        {meals.length > 0 && <select style={{fontFamily: 'Leckerli One'}} name='Menu' className='menu-list'>
          {meals.map((mealName,index) =>((
            <option style={{fontFamily: 'Mada'}} value={mealName.fields.dish} key={index}>{mealName.fields.dish}</option>
          )))}
        </select>}

        <section className='menu'>
          {loading &&[
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>
          ]}
        </section>

        <NutritionFacts loading={loading}/>

        <section className='menu'>
          {loading &&[
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>,
            <DishesLoading key={Math.random()}/>
          ]}
        </section>

        <NutritionFacts loading={loading}/>

        <Footer />
      </section>
    </>
  )
}

export default Menu