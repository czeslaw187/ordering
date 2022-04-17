import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {connect} from 'react-redux'

function Navbar(props) {
    console.log(props.myState)
    return ( 
        <div className="w-full h-full py-5 flex flex-row justify-between bg-gradient-to-bl from-lime-100 to-green-300">
            <a className="mx-4" href="#">Order</a>
            <div>
                <button className="mx-4"><FontAwesomeIcon icon={faCartShopping}/></button>
                <div className="w-3/12 rounded-full bg-orange-400 relative z-[9999] -top-4 left-7 text-center text-xs m-0">{props.myState?.myState.length}</div>
            </div>
        </div>
     );
}

function mapStateToProps(state) {
    return {
        myState: state
    }
}

export default connect(mapStateToProps)(Navbar);