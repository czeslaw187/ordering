import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useState} from 'react'

function Cart({props}) {
    const [dropdown,setDropdown] = useState(false)
    return ( 
        <div onMouseEnter={()=>{setDropdown(true)}}>
            <button className="mr-12"><FontAwesomeIcon icon={faCartShopping}/></button>
            <div className="w-3/12 rounded-full bg-orange-400 relative -top-4 left-3 text-center text-xs m-0">{props.myState?.myState.length}</div>
            <div className='relative z-[10001]'>
                <div className={dropdown ? "visible w-64 bg-slate-100 absolute -left-52 p-3 opacity-90 max-h-64 overflow-y-auto" : "invisible h-0 absolute"} onMouseLeave={()=>{setDropdown(false)}}>
                    {
                        props.myState?.myState.map((el,id)=>{
                            return (
                                <div key={id} className='flex flex-row justify-between'>
                                    <p className="w-full h-auto my-2 ml-2">{el.data[0].name}</p>
                                    <button onClick={()=>{props.removeFood(el.data[0].id)}}>x</button>
                                    <hr className='text-gray-800'/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
     );
}

export default Cart;