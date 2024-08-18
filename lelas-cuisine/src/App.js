import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {createClient} from 'contentful'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Order from './pages/Order'
import About from './pages/About'
import Nopage from './pages/Nopage'
import Reservation from './pages/Reservation'
import './css/main.css'
import './css/responsive.css'
import './css/animation.css'
function App() {
  const [dishesAvailable,setDishesAvailable] = useState([])
  const client = createClient({
    space: 'sn9ofih1jyrk',
    accessToken: 'xOR5f8_K3VNuZwdBAJePPYYj8iHPvIhVUipW8yYW--g'
  })
  useEffect(()=>{
    client.getEntries({
      content_type: 'foodMenu'
    })
      .then(data=> {
        setDishesAvailable(data.items)})
      .catch(error=> console.log(error));
    },[])
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home dishesAvailable ={dishesAvailable}/>} />
        <Route exact path="/Menu" element={<Menu dishesAvailable ={dishesAvailable}/>} />
        <Route exact path="/Order" element={<Order />} />
        <Route exact path="/About" element={<About />} />
        <Route exact path="/Reservation" element={<Reservation />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </Router>
  )
}

export default App