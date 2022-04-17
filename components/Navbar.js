import {connect} from 'react-redux'
import Cart from './Cart.js';

function Navbar(props) {
    return ( 
        <div className="w-full h-full py-5 flex flex-row justify-between bg-gradient-to-bl from-lime-100 to-green-300">
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

export default connect(mapStateToProps)(Navbar);