import {connect} from 'react-redux'
import Cart from './Cart.js';
import Link from 'next/link'

function Navbar(props) {
    let total = props.myState?.myState.length > 0 ? props.myState?.myState.reduce((partialSum, a) => partialSum + a.data[0].price, 0) : [0]
    return ( 
        <div className="w-full h-[34] fixed mb-5 py-5 flex flex-row justify-between bg-gradient-to-bl from-lime-100 to-green-300">
            <a className="mx-4" href="#">Order</a>
            <div className='flex flex-row-reverse'>
                <Cart props={props} />                
                <p className='mr-5 text-2xl'>
                    {
                       total > 0 ? `£${total}` : null
                    }
                </p>
                {total > 0 ? <Link href="/checkout"><a onClick={()=>{props.sendTotal(returnTotalFromArray(total) + 5)}} className='w-[52] h-auto bg-indigo-400 hover:bg-indigo-600 rounded-lg px-8 py-2 mx-3'>Pay</a></Link> : null}
            </div>
        </div>
     );
}

function returnTotalFromArray(total) {
    if (total.length > 0) {
        let newTotal;
        console.log(total[-1], 'total')
        return newTotal
    } else {
        return total
    }
    
}

function mapStateToProps(state) {
    return {
        myState: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeFood: (id)=>{dispatch({type:"REMOVE_ITEM", payload:id})},
        sendTotal: (price)=>{dispatch({type:"ADD_TOTAL",payload:price})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);