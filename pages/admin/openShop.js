import Link from 'next/link'
import {connect} from 'react-redux'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import OrderElement from '../../components/admin/orderElement.js'
import io from 'Socket.IO-client'
const socket = io()

function ManageAccount(props) {
    
    const router = useRouter()
    !props.state.isLogged ? router.push('/admin/controlPanel') : null

    useEffect(()=>{
        const socketInitializer = async () => {
            await fetch('/api/admin/socket');
        
            socket.on('connect', () => {
              console.log('connected')
            })
        
            socket.on('update-input', msg => {
                props.addToPanel(msg)
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
                    <Link href='/admin/controlPanel'><a className='underline mr-4'>{'<< Back'}</a></Link>
                </div>
                <OrderElement props={props} />
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

function mapDispatchToProps(dispatch) {
    return {
        addToPanel: (order)=>{dispatch({type:"ADD_TO_PANEL", payload:order})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);