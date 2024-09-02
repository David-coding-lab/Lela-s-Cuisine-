import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
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
function App() {
  const [loading,setLoading] = useState('')
  const [dishesAvailable,setDishesAvailable] = useState([])
  const [meals,setMeals] = useState([])
  const client = createClient({
    space: 'sn9ofih1jyrk',
    accessToken: 'xOR5f8_K3VNuZwdBAJePPYYj8iHPvIhVUipW8yYW--g'
  })
  useEffect(()=>{
    setLoading(true)
    client.getEntries({
      content_type: 'dishesSections'
    })
      .then(data=> {
        setMeals(shuffleArray(data.items))
        setTimeout(() => {
          setLoading(false)
        }, 2500);
      })
      .catch(error=> console.error(error));
    },[])
  useEffect(()=>{
    setLoading(true)
    client.getEntries({
      content_type: 'foodMenu'
    })
      .then(data=> {
        setDishesAvailable(data.items)})
      .catch(error=> console.error(error));
    },[])
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        return array
      }
    };
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home loading={loading} setLoading={setLoading} meals={meals} dishesAvailable ={dishesAvailable}/>} />
        <Route exact path="/Menu" element={<Menu loading={loading} setLoading={setLoading} meals={meals} dishesAvailable ={dishesAvailable}/>} />
        <Route exact path="/Order" element={<Order />} />
        <Route exact path="/About" element={<About />} />
        <Route exact path="/Reservation" element={<Reservation />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  )
}

export default App