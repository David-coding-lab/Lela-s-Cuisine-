import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import logo from '../assets/chef-hat.png'
import Dish from '../components/Dish'
import man from '../assets/man.png'
import NutritiousFacts from '../components/NutritiousFacts'
import DishesLoading from '../components/DishesLoading'
import LoadingFacts from '../components/LoadingFacts'
import Footer from '../components/Footer'
import Ads from '../components/Ads'
export const NutritionFacts = ({loading})=>{
  return(
    <section className='nutritious-fact_section'>
        <img src={man} alt="Cartoon Figure" />
        <article className='facts-container'>
          <h1>Nutrition Facts</h1>
          {
            loading ?
            <LoadingFacts />
            :<NutritiousFacts />
          }
        </article>
      </section>
  )
}
function setDishTypeLocally(foodType){
  localStorage.setItem('foodType', JSON.stringify(foodType))
  window.location.href = '/Menu'
}
// menu Component
export const Menu = ({foodType,fooImage})=>{
  return(
    <button className='foodMenu'
    style={{
      backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),
      url(${fooImage})`
    }}
    onClick={()=> setDishTypeLocally(foodType)}
    >{foodType}
    </button>
  )
}
export const openOrCloseUser = (closeOrOpen) =>{
  document.querySelector('.user').open = closeOrOpen === 'open'
    ? true : false
}
function Home({setCart,addFoodToCart,loading,setLoading,dishesAvailable,meals,}) {
  const [foodMenu, setFoodMenu] = useState([])
  useEffect(()=>{
    meals && setLoading(false)
    setTimeout(() => {
      setFoodMenu(meals)
    }, 2500);
    },[meals])
    useEffect(()=>{
      setTimeout(() => {
        setDisplayDishes(dishesAvailable.slice(0,6))
      }, 2000);
    },[dishesAvailable])
  const MenuLoading = ()=>{
    return(
      <button className='foodMenu menu_loading'>
        <img id='menuImg' width='30px' src={logo} alt="chef hat" />
      </button>
    )
  }
  const [displayDishes,setDisplayDishes] = useState([])
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      return array
    }
  };
  return (
    <div>
        <Nav openOrCloseUser={openOrCloseUser}/>
        <section className="carousel">
            {
              loading ?[
                <MenuLoading key='1'/>,
                <MenuLoading key='2'/>,
                <MenuLoading key='3'/>,
                <MenuLoading key='4'/>,
                <MenuLoading key='5'/>
              ]:
              foodMenu.map(menu => (
                <Menu
                  key={menu.sys.id}
                  foodType={menu.fields.dish}
                  fooImage={menu.fields.dishImage.fields.file.url}
                />
              ))
            }
        </section>
            <Ads />
        <section className="subMenu">
          <div className="subDishesContainer">
            {
              loading ?
              [
                <DishesLoading key={Math.random()}/>,
                <DishesLoading key={Math.random()}/>,
                <DishesLoading key={Math.random()}/>,
                <DishesLoading key={Math.random()}/>,
                <DishesLoading key={Math.random()}/>,
                <DishesLoading key={Math.random()}/>
              ]:
              displayDishes.map(dish =>((
                <Dish
                  dishName={dish.fields.dishName}
                  dishPrice={dish.fields.dishPrice}
                  dishImage={dish.fields.dishImage.fields.file.url}
                  discountPrice={dish.fields.dishDiscountPrice}
                  setCart={setCart}
                  addFoodToCart={addFoodToCart}
                  key={dish.sys.id}
                />
              )))}
          </div>
          {
            !loading &&
              <a href="/Menu" style={{margin: 'auto'}}>
                <button>See More</button>
              </a>
          }
        </section>
        <NutritionFacts loading={loading}/>
        <Footer />
    </div>
  )
}
export default Home