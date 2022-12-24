import {useRouter} from 'next/router'
import {useEffect, useCallback, useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios' 

function Success(props) {    
    const router = useRouter()
    const [orderId, setOrderId] = useState(Date.now())

    let myOrder = []
    props.state.myState.map(el=>{
    myOrder.push(el.data[0].name)
    })
    
    const emailOrder = (order, details, total) => {
        return axios.post(process.env.NEXT_PUBLIC_URL + '/api/sendMail', {order:order, details:details, id:orderId, total:total})
    }   

    const sendOrder = useCallback(()=>{
        if (myOrder.length <= 0 || props.state.details.length <= 0 || !props.state.total) {return}
        emailOrder(myOrder, props.state.details, props.state.total)        
    })
    
    useEffect(()=>{    
        const socketInitializer = async () => {
            await axios.post('/api/admin/socket', {message: orderId})
          }          
        
        
        socketInitializer()        
        sendOrder()
        setTimeout(()=>{  
            props.clearData()
            router.push('/')
        }, 5000)
    },[sendOrder])
    
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