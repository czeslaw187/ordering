import Link from 'next/link'
import {useRouter} from 'next/router'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Dropdown from '../../components/admin/manageOrders/dropForOrders.js'
import AdminNav from '../../components/admin/adminNav.js'

function ManageOrders(props) {
    const [myOrders,setMyOrders] = useState([])  
    const [search,setSearch] = useState('') 
    const [count,setCount] = useState(0)
    const router = useRouter()
    
    !props.state.isLogged ? router.push('/admin/controlPanel') : null
    
    const handleSeacrh = (e) => {
        setSearch(e.target.value)
    }   

    useEffect(()=>{
        const handleOrders = async() => {
            return await axios.get(process.env.NEXT_PUBLIC_URL + '/api/admin/getAllOrders').then(resp=>{console.log(resp, 'orders'); setMyOrders(resp)})
        }
        handleOrders()
    },[])

    useEffect(()=>{
        if (myOrders.data) {
            setCount(myOrders.data.length)
        }
    },[myOrders])

    if (props.state.isLogged) {return ( 
            <div className="w-full h-screen p-2 bg-gradient-to-tr from-sky-400 to-lime-500 overflow-y-auto">
                <AdminNav urlAdress={'/admin/controlPanel'} title={'Manage Orders'} />
                <form className='w-full flex justify-center my-5 align-baseline'>
                    <p className='text-left text-xl h-fit my-auto'>Count: {count}</p>
                    <label htmlFor='filter' className='h-fit my-auto text-center text-xl mr-3'>Order ID:</label>
                    <input type="search" id="filter" name="filter" onChange={(e)=>handleSeacrh(e)} placeholder='order id, customer name or email' value={search ?? ''} className='w-4/12 h-10 pl-2 rounded-md shadow-xl'  />
                </form>
                <div className='w-full h-5/6 flex flex-col text-center'>
                    <div>
                        {
                            myOrders?.data ?
                            myOrders.data.filter(el=>{
                                if (!search) {                                    
                                    return el
                                } else {
                                    return search === el.order_id || search === el.name || search === el.email
                                }
                            })
                                .map((el,id)=>{
                                let itemList = el.items ? el.items.replace(/"/g, '').slice(1,-1).split(',') : el.items
                                return (
                                    <Dropdown key={id} element={el} items={itemList}/>
                                )
                            }).reverse() : null
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

export default connect(mapStateToProps,)(ManageOrders);

