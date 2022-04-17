import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navbar() {
    return ( 
        <div className="w-full h-full py-5 flex flex-row justify-between bg-gradient-to-bl from-lime-100 to-green-300">
            <a className="mx-4" href="#">Order</a>
            <div>
                <button className="mx-4"><FontAwesomeIcon icon={faCartShopping}/></button>
                <div className="w-3/12 rounded-full bg-orange-400 relative z-[9999] -top-4 left-7 text-center text-xs m-0">1</div>
            </div>
        </div>
     );
}

export default Navbar;