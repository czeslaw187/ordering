import Link from 'next/link'
import {connect} from 'react-redux'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import OrderElement from '../../components/admin/orderElement.js'
import axios from 'axios'
import io from 'Socket.IO-client'
const socket = io()

function ManageAccount(props) {
    const [input,setInput] = useState([])
    const router = useRouter()
    !props.state.isLogged ? router.push('/admin/controlPanel') : null

    useEffect(()=>{
        const getUnrealisedOrders = async () => {
            return await axios.get(process.env.NEXT_PUBLIC_URL + '/api/admin/getAllOrders')
        }
        getUnrealisedOrders().then(data=>{setInput(data)})

        const socketInitializer = async () => {
            await fetch('/api/admin/socket');
        
            socket.on('connect', () => {
              console.log('connected')
            })
        
            socket.on('update-input', msg => {
                getUnrealisedOrders().then(data=>{setInput(data)})
            })
          }
          socketInitializer()
    },[])    
    
    console.log(props.state.orderPanel, 'openshop')

    if (props.state.isLogged) {
        return ( 
            <div className="w-full h-screen bg-gradient-to-tr from-sky-400 to-lime-500 px-4 mt-2">
                <div className="w-full h-16 flex flex-row justify-between border-2 py-2">
                    <p className='ml-4 text-3xl'>Open Shop</p>
                    {input?.data ? <button onClick={()=>{setInput([])}} className='w-3/12 h-auto bg-teal-200 rounded-md'>Clear</button> : null}
                    <Link href='/admin/controlPanel'><a className='underline mr-4'>{'<< Back'}</a></Link>
                </div>
                <OrderElement input={input} setInput={setInput}/>
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