import menu from '../lib/menu.json'
import {connect} from 'react-redux'
import FoodItem from '../components/FoodItem.js';
import * as actionCreator from '../lib/actions.js'
import Moment from 'react-moment'
import { faYammer } from '@fortawesome/free-brands-svg-icons';

function Home(props) {
  let dateNow = new Intl.DateTimeFormat('en-UK', {year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit'}).format(Date.now())
  return ( 
    <div className="w-screen h-full overflow-y-auto text-xl bg-gradient-to-br from-slate-200 to-lime-300 rounded-md pt-10">
      <p className='w-full text-center text-3xl'>Starters</p>
      {menu.starters.map((el, id)=>{      
        return <FoodItem el={el} key={id} menu={menu} props={props} />
      })}
      <p className='w-full text-center'>{dateNow}</p>
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