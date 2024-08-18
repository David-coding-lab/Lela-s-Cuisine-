import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import {createClient} from 'contentful'
import logo from '../assets/chef-hat.png'
function Home() {
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
        setFoodMenu(data.items)
        for(const foodType of data.items){
          setMenuNames(previous =>{return[
            ...previous,
            foodType.fields.dish
          ]})
        }
        setTimeout(() => {
          setLoading(false)
        }, 2000);
      })
      .catch(error=> console.log(error));
    },[])
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
  return (
    <div>
        <Nav menuNames={menuNames}/>
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
        
    </div>
  )
}

export default Home