import {connect} from 'react-redux'
import Cart from './Cart.js';

function Navbar(props) {
    return ( 
        <div className="w-full h-[34] fixed mb-5 py-5 flex flex-row justify-between bg-gradient-to-bl from-lime-100 to-green-300">
            <a className="mx-4" href="#">Order</a>
            <Cart props={props} />
        </div>
     );
}

function mapStateToProps(state) {
    return {
        myState: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeFood: (id)=>{dispatch({type:"REMOVE_ITEM", payload:id})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);