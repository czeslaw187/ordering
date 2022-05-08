import Link from 'next/link'
import {connect} from 'react-redux'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import io from 'Socket.IO-client'
const socket = io()

function ManageAccount(props) {
    const [input,setInput] = useState(props.state.orderPanel)
    const router = useRouter()
    !props.state.isLogged ? router.push('/admin/controlPanel') : null

    useEffect(()=>{
        const socketInitializer = async () => {
            await fetch('/api/admin/socket');
        
            socket.on('connect', () => {
              console.log('connected')
            })
        
            socket.on('update-input', msg => {
                setInput(input=>[...input,msg])
            })
          }
          socketInitializer()
    },[props.addToPanel])

    

    console.log(props.state.orderPanel, 'openshop')

    if (props.state.isLogged) {
        return ( 
            <div className="w-full h-screen bg-gradient-to-tr from-sky-400 to-lime-500 px-4 mt-2">
                <div className="w-full h-16 flex flex-row justify-between border-2 py-2">
                    <p className='ml-4 text-3xl'>Open Shop</p>
                    <Link href='/admin/controlPanel'><a className='underline mr-4'>{'<< Back'}</a></Link>
                </div>
                <ul className='w-full h-5/6 flex flex-row flex-wrap border-2 border-teal-200 rounded-md mt-5 overflow-y-auto'>
                    {
                        input ? input.map((el,id)=>{
                            return (
                                <li key={id} className='w-3/12 h-40 my-1 border-2 border-gray-900 rounded-sm bg-teal-200'>
                                    <p>{el.id}</p>
                                    <hr/>
                                    <ul>
                                        {
                                            el.order.map((it,id)=>{
                                                return <li key={id} >{it}</li>
                                            })
                                        }
                                    </ul>
                                </li>
                            )
                        }) : null
                    }
                </ul>
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