import Link from 'next/link'
import {connect} from 'react-redux'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import io from 'Socket.IO-client'
let socket;

function ManageAccount(props) {
    const [input,setInput] = useState({})
    const router = useRouter()
    !props.state.isLogged ? router.push('/admin/controlPanel') : null

    useEffect(()=>{
        const socketInitializer = async () => {
            await fetch('/api/admin/socket');
            socket = io()
        
            socket.on('connect', () => {
              console.log('connected')
            })
        
            socket.on('update-input', msg => {
              setInput(msg)
            })
          }
          socketInitializer()
    },[])
    console.log(input, 'openshop')

    if (props.state.isLogged) {
        return ( 
            <div className="w-full h-screen bg-gradient-to-tr from-sky-400 to-lime-500">
                <div className="w-full h-16 flex flex-row justify-between border-2 py-2">
                    <p className='ml-4 text-3xl'>Open Shop</p>
                    <Link href='/admin/controlPanel'><a className='underline mr-4'>{'<< Back'}</a></Link>
                </div>
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