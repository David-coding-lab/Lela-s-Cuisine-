import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route, useAsyncError} from 'react-router-dom'
import {createClient} from 'contentful'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Order from './pages/Order'
import About from './pages/About'
import NoPage from './pages/NoPage'
import Reservation from './pages/Reservation'
import './css/main.css'
import './css/responsive.css'
import './css/animation.css'
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    return array
  }
};
function App() {
  const [storedCarter] = useState(JSON.parse(localStorage.getItem('cart')))
  const [loading,setLoading] = useState('')
  const [dishesAvailable,setDishesAvailable] = useState([])
  const [locallyStoredMenu1] = useState(localStorage.getItem('localMenu'))
  const [locallyStoredMenu2] = useState(localStorage.getItem('localMenu2'))
  const [meals,setMeals] = useState([])
  const [cart,setCart] = useState(storedCarter ? storedCarter : [])
  function addFoodToCart(foodName,FoodPrice,FoodImage) {
    localStorage.setItem('cart', JSON.stringify(cart))
    setCart(prevCartItems=>(([
      ...prevCartItems,
      {
        foodName,FoodPrice,FoodImage
      }
    ])))
  }
  const client = createClient({
    space: 'sn9ofih1jyrk',
    accessToken: 'xOR5f8_K3VNuZwdBAJePPYYj8iHPvIhVUipW8yYW--g'
  })
  function setLocalMenu(menuName, data){
    menuName(shuffleArray(JSON.parse(data)))
    setLoading(false)
  }
  useEffect(()=>{
    setLoading(true)
    locallyStoredMenu1
    ?
      setLocalMenu(setMeals, locallyStoredMenu1)
    :
      client.getEntries({
        content_type: 'dishesSections'
      })
        .then(data=> {
          setMeals(shuffleArray(data.items))
          localStorage.setItem('localMenu', JSON.stringify(data.items))
          setTimeout(() => {
            setLoading(false)
          }, 2500);
        })
        .catch(error=> console.error(error));
    },[])
  useEffect(()=>{
    setLoading(true)
    locallyStoredMenu2
    ?
      setLocalMenu(setDishesAvailable, locallyStoredMenu2)
    :
      client.getEntries({
        content_type: 'foodMenu'
      })
        .then(data=> {
          setDishesAvailable(data.items)
          localStorage.setItem('localMenu2', JSON.stringify(data.items))
        })
        .catch(error=> console.error(error));
      },[])
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home cart={cart} setCart={setCart} addFoodToCart={addFoodToCart} loading={loading} setLoading={setLoading} meals={meals} dishesAvailable ={dishesAvailable}/>} />
        <Route exact path="/Menu" element={<Menu setCart={setCart} addFoodToCart={addFoodToCart} loading={loading} setLoading={setLoading} meals={meals} dishesAvailable ={dishesAvailable}/>} />
        <Route exact path="/Order" element={<Order />} />
        <Route exact path="/About" element={<About />} />
        <Route exact path="/Reservation" element={<Reservation />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  )
}

export default App