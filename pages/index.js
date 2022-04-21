import menu from '../lib/menu.json'
import {connect} from 'react-redux'
import FoodItem from '../components/FoodItem.js';
import * as actionCreator from '../lib/actions.js'

function Home(props) {
  return ( 
    <div className="w-screen h-full overflow-y-auto text-xl bg-gradient-to-br from-slate-200 to-lime-300 rounded-md pt-10">
      <p className='w-full text-center text-3xl'>Starters</p>
      {menu.starters.map((el, id)=>{      
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
    addFood: (item)=>{dispatch(actionCreator.addFoodItem(item))},
    upload: (menu)=>{dispatch({type:"UPLOAD_MENU",payload:menu})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);