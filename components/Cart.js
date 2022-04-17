import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Cart({props}) {
    return ( 
        <div>
            <button className="mx-4"><FontAwesomeIcon icon={faCartShopping}/></button>
            <div className="w-3/12 rounded-full bg-orange-400 relative z-[9999] -top-4 left-7 text-center text-xs m-0">{props.myState?.myState.length}</div>
        </div>
     );
}

export default Cart;