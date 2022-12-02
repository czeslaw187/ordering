import Link from 'next/link'
import {connect} from 'react-redux'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import OrderElement from '../../components/admin/openShop/orderElement.js'
import axios from 'axios'
import AdminNav from '../../components/admin/adminNav.js'
import Pusher from 'pusher-js'

function ManageAccount(props) {
    const [realised,setRealised] = useState('unrealised')
    const [input,setInput] = useState([])
    const router = useRouter()
    !props.state.isLogged ? router.push('/admin/controlPanel') : null

    const realiseOrder = async(orderId, procedure) =>{
        return await axios.post(process.env.NEXT_PUBLIC_URL + '/api/admin/realiseOrder', {orderId: orderId, procedure: procedure})
    }

    const getUnrealisedOrders = async () => {
        return await axios.get(process.env.NEXT_PUBLIC_URL + '/api/admin/getAllOrders')
    }
    
    useEffect(()=>{
        getUnrealisedOrders().then(data=>{setInput(data)})

        const socketInitializer = async () => {
            const pusher = new Pusher((process.env.NEXT_PUBLIC_KEY), {
                cluster: 'eu'
            })
            const channel = pusher.subscribe('chat')
            channel.bind('chat-event', function(data) {
                getUnrealisedOrders().then(data=>{setInput(data)})
            }
            )}
          socketInitializer()
    },[])    
    console.log(props, 'openShop')
    if (props.state.isLogged) {
        return ( 
            <div className="w-full h-screen p-2 bg-gradient-to-tr from-sky-400 to-lime-500 px-4 mt-2">
                <AdminNav urlAdress={'/admin/controlPanel'} title={'Open Shop'} />
                <div className='w-full flex flex-row justify-around mt-4'>
                    <button onClick={()=>{setRealised('unrealised'); getUnrealisedOrders().then(data=>{setInput(data)})}} className={realised == 'unrealised' ? 'w-2/12 h-10 bg-teal-400 rounded-md shadow-xl  active:shadow-click' : 'w-2/12 h-10 bg-teal-300 rounded-md shadow-xl hover:bg-teal-400 active:shadow-click'}>Unrealised</button>
                    <button onClick={()=>{setRealised('realised'); getUnrealisedOrders().then(data=>{setInput(data)})}} className={realised == 'realised' ? 'w-2/12 h-10 bg-teal-400 rounded-md shadow-xl active:shadow-click' : 'w-2/12 h-10 bg-teal-300 rounded-md shadow-xl hover:bg-teal-400 active:shadow-click'}>Realised</button>
                </div>
                <OrderElement input={input} setInput={setInput} realised={realised} realiseOrder={realiseOrder} getUnrealisedOrders={getUnrealisedOrders}/>
            </div>
        );
    } else {
        return <p>No access</p>
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(ManageAccount);