import menu from '../lib/menu.json'
import {connect} from 'react-redux'
import FoodItem from '../components/FoodItem.js';

function Home(props) {
  let state = props.state
  console.log(props)
  return ( 
    <div className="w-screen h-full overflow-y-auto text-xl bg-gradient-to-br from-slate-200 to-lime-300 rounded-md">
      <p className='w-full text-center text-3xl'>Starters</p>
      {menu.starters.map((el,id)=>{
        return <FoodItem el={el} key={id} menu={menu} props={props} />
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