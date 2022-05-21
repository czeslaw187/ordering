import Link from 'next/link'
import {useRouter} from 'next/router'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Dropdown from '../../components/admin/manageOrders/dropForOrders.js'

function ManageOrders(props) {
    const [myOrders,setMyOrders] = useState([])    
    const router = useRouter()
    
    !props.state.isLogged ? router.push('/admin/controlPanel') : null
        
    useEffect(()=>{
        const handleOrders = async () => {
            return await axios.get(process.env.NEXT_PUBLIC_URL + '/api/admin/getAllOrders')
        }
        handleOrders().then(data=>{setMyOrders(data)})
    },[setMyOrders])
    if (props.state.isLogged) {return ( 
            <div className="w-full h-screen p-2 bg-gradient-to-tr from-sky-400 to-lime-500 overflow-y-auto">
                <div className="w-full h-16 flex flex-row justify-between border-2 py-2">
                    <p className='ml-4 text-3xl'>Manage Orders</p>
                    <Link href='/admin/controlPanel'><a className='underline mr-4'>{'<< Back'}</a></Link>
                </div>
                <div className='w-full h-5/6 translate-y-10 flex flex-col text-center'>
                    <div>
                        {
                            myOrders?.data ? 
                            myOrders?.data.map((el,id)=>{
                                let itemList = el.items ? el.items.replace(/"/g, '').slice(1,-1).split(',') : el.items
                                console.log(itemList, 'items')
                                return (
                                    <Dropdown key={id} element={el} items={itemList}/>
                                )
                            }).reverse()
                            : null
                        }
                    </div>
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

export default connect(mapStateToProps)(ManageOrders);

