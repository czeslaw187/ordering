import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios' 

function Success(props) {
    console.log(props, 'success')
    const router = useRouter()

    async function emailOrder(order, details, id, total) {
        await axios.post(process.env.NEXT_PUBLIC_URL + '/api/sendMail', {order:order, details:details, id:id, total:total})
    }    

    const orderId = Date.now()
    let myOrder = []
          props.state.myState.map(el=>{
            myOrder.push(el.data[0].name)
          })

    useEffect(()=>{    
        emailOrder(myOrder, props.state.details, orderId, props.state.total)
        setTimeout(()=>{   
            props.clearData()
            router.push('/')
        }, 5000)
    },[])

    return ( 
        <div className="pt-32 bg-gradient-to-br from-slate-200 to-lime-300 rounded-md h-screen w-full m-auto">
                <p className="w-full text-center text-6xl">Payment of £{props.state.total} successful</p>
                <p className="w-full text-center text-xl mt-14">Order No {orderId} is being prepared</p>
                <p className="w-full text-center text-xl mt-14">We have sent your order confirmation on  {props.state.details.email}</p>
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
        clearData: ()=>{dispatch({type:"CLEAR_STORE"})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);