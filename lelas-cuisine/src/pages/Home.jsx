import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import {createClient} from 'contentful'
import logo from '../assets/chef-hat.png'
import Dish from '../components/Dish'
import man from '../assets/man.png'
import NutritiousFacts from '../components/NutritiousFacts'
import DishesLoading from '../components/DishesLoading'
import LoadingFacts from '../components/LoadingFacts'
function Home({dishesAvailable}) {
  const [foodMenu, setFoodMenu] = useState([])
  const [loading,setLoading] = useState('')
  const [menuNames, setMenuNames] = useState([])
  const client = createClient({
    space: 'sn9ofih1jyrk',
    accessToken: 'xOR5f8_K3VNuZwdBAJePPYYj8iHPvIhVUipW8yYW--g'
  })
  useEffect(()=>{
    setLoading('true')
    client.getEntries({
      content_type: 'dishesSections'
    })
      .then(data=> {
        setFoodMenu(shuffleArray(data.items))
        for(const foodType of data.items){
          setMenuNames(previous =>{return[
            ...previous,
            foodType.fields.dish
          ]})
        }
        setTimeout(() => {
          setLoading(false)
        }, 2500);
      })
      .catch(error=> console.error(error));
    },[])
    useEffect(()=>{
      setTimeout(() => {
        setDisplayDishes(dishesAvailable.slice(0,6))
      }, 2000);
    },[dishesAvailable])
    // menu Component
  const Menu = ({foodType,fooImage})=>{
    return(
      <button className='foodMenu' style={{
        backgroundImage: `
        linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),
        url(${fooImage})`
      }}>{foodType}</button>
    )
  }
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
  shuffleArray(displayDishes)
  return (
    <div>
        <Nav menuNames={menuNames[Math.floor(Math.random()*menuNames.length)]}/>
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
        <div className="ads">
          <h1>2% 0ff on all sales</h1>
        </div>
        <section className="subMenu">
          <div className="subDishesContainer">
            {
            loading ?
              [
                <DishesLoading key={1}/>,
                <DishesLoading key={2}/>,
                <DishesLoading key={3}/>,
                <DishesLoading key={4}/>,
                <DishesLoading key={5}/>,
                <DishesLoading key={6}/>
              ]
            :dishesAvailable.length > 1 &&
            <>
              {displayDishes.map(dish =>((
                <Dish
                  dishName={dish.fields.dishName}
                  dishPrice={dish.fields.dishPrice}
                  dishImage={dish.fields.dishImage.fields.file.url}
                  discountPrice={dish.fields.dishDiscountPrice}
                  key={dish.sys.id}
                />
              )))}
            </>
          }
          </div>
          {
            !loading &&
              <a href="/Menu" style={{margin: 'auto'}}>
                <button>See More</button>
              </a>
          }
        </section>
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
    </div>
  )
}

export default Home