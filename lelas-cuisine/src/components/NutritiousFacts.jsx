import React, { useEffect, useRef, useState } from 'react'
import { createClient } from 'contentful'
import dot from '../assets/dot.png'
function NutritiousFacts() {
  const [facts,setFacts] = useState([])
  const [currentFactCount,setCurrentFactCount] = useState(0)
  const [locallyStoredFacts]= useState(sessionStorage.getItem('localFact'))
  const randomNumber = (number) => ((Math.floor(Math.random() * number)))
  const fact = useRef()
  const client = createClient({
    space: 'sn9ofih1jyrk',
    accessToken: 'xOR5f8_K3VNuZwdBAJePPYYj8iHPvIhVUipW8yYW--g'
  })
  function setLocalFact(menuName,data){
    JSON.parse(data).forEach(item =>{
      menuName(prevFacts => ([
        ...prevFacts,
        item.fields.facts.content[0].content[0].value
      ]))
    })
  }
  useEffect(()=>{
    locallyStoredFacts
    ?
      setLocalFact(setFacts, locallyStoredFacts)
    :
      client.getEntries({
        content_type: 'nutritiousFacts'
      })
      .then(data => {
        data.items.forEach(item =>{
          setFacts(prevFacts => ([
            ...prevFacts,
            item.fields.facts.content[0].content[0].value
          ]))
        })
        sessionStorage.setItem('localFact', JSON.stringify(data.items))
      })
    .catch(error => console.error(error))
  },[])
  useEffect(()=>{
    const intervalId = setInterval(() => {
      fact.current.className = 'facts animateFacts'
      setTimeout(() => {
      setCurrentFactCount(prevNum => ((prevNum === facts.length - 1 ? 0 :prevNum + 1)))
      fact.current.className = 'facts'
      }, 1001);
    }, 10000);
    return ()=> clearInterval(intervalId)
  },[facts])
  return (
    <>
      <p className='facts' ref={fact}>
        {facts[currentFactCount]}
      </p>
      <div className="dots">
        <img
          src={dot}
          onClick={()=>{
            fact.current.className = 'facts animateFacts'
            setCurrentFactCount(prevNum => ((
              currentFactCount < facts.length -1 ?
              prevNum + 1: 0
            )))
            setTimeout(() => {
              setCurrentFactCount(prevNum => ((prevNum === facts.length - 1 ? 0 :prevNum + 1)))
              fact.current.className = 'facts'
            }, 1001);
          }}
          alt="dot"
        />
        <img
          src={dot}
          onClick={()=>{
              fact.current.className = 'facts animateFacts'
            setCurrentFactCount(prevNum => ((
              currentFactCount < facts.length -1 ?
              prevNum + 1: 0
            )))
            setTimeout(() => {
              setCurrentFactCount(prevNum => ((prevNum === facts.length - 1 ? 0 :prevNum + 1)))
              fact.current.className = 'facts'
            }, 1001);
          }}
          alt="dot"
        />
        <img
          src={dot}
          onClick={()=>{
            fact.current.className = 'facts animateFacts'
            setCurrentFactCount(prevNum => ((currentFactCount > 0 ?
              prevNum + -1 :
              currentFactCount < facts.length -1 ?
              prevNum + 1: 0
            )))
            setTimeout(() => {
              setCurrentFactCount(prevNum => ((prevNum === facts.length - 1 ? 0 :prevNum + 1)))
              fact.current.className = 'facts'
            }, 1001);
          }}
          alt="dot"
        />
      </div>
    </>
  )
}

export default NutritiousFacts