import menu from '../lib/menu.json'
import Image from 'next/image';
import {useRef} from 'react'
import {connect} from 'react-redux'

function Home(props) {
  let state = props.state
  console.log(props)
  return ( 
    <div className="w-screen h-full overflow-y-auto text-xl bg-gradient-to-br from-slate-200 to-lime-300 rounded-md">
      <p className='w-full text-center text-3xl'>Starters</p>
      {menu.starters.map((el,id)=>{
        const ref = useRef(null)
        return (
          <div  key={id}         
                onClick={()=>{
                  let foodItem = menu.starters.filter(el=>{return el.id == ref.current.childNodes[0].innerHTML[0]})
                  props.addFood(foodItem)
                }}
                className='w-7/12 h-auto p-2 mx-auto hover:scale-[1.2] transition-transform 
                                    delay-50 ease-out hover:border-gray-900 my-5 border-gray-300 
                                    border-2 rounded-sm flex flex-row'>
            <div className='my-1 mr-1'><Image src={el.image} width={150} height={120}/></div>
            <div ref={ref}>
              <p className='invisible'>{el.id}</p>
              <p className='text-md m-2'>{el.name}</p>
              <p className='text-sm'>{el.description}</p>
              <p className='text-lg mt-5 ml-1'>£{el.price}.00</p>
            </div>
          </div>
        )
      })}
    </div>
   );
}

function mapStateToProps(state) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addFood: (item)=>{dispatch({type:"ADD_ITEM",payload:item})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);