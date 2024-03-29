import menu from '../lib/menu.json'
import {connect} from 'react-redux'
import FoodItem from '../components/FoodItem.js';
import * as actionCreator from '../lib/actions.js'
import Location from '../components/Location';
import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar.js'

function Home(props) {
  const [clientCoords,setClientCoords] = useState(null)
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position=>{
      setClientCoords([position.coords.latitude,position.coords.longitude])
    })
  },[])

  useEffect(()=>{
    if (clientCoords) {
      props.getTime(clientCoords)
    }
  },[clientCoords, props.getTime])

  let dateNow = new Intl.DateTimeFormat('en-UK', {year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit'}).format(Date.now())
  return ( 
    <>
      <Navbar />
      <div className="w-screen h-full overflow-y-auto text-xl bg-gradient-to-br from-slate-200 to-lime-300 rounded-md pt-10">
        <Location props={props} />
        <p className='w-full text-center text-3xl mt-14'>Starters</p>
        {menu.starters.map((el, id)=>{      
          return <FoodItem el={el} key={id} menu={menu} props={props} />
        })}
      </div>
    </>
   );
}

function mapStateToProps(state) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addFood: (item)=>{dispatch(actionCreator.addFoodItem(item))},
    upload: (menu)=>{dispatch({type:"UPLOAD_MENU",payload:menu})},
    getTime: (coords)=>{dispatch(actionCreator.getTimeDistance(coords))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);