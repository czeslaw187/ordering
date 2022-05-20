import axios from 'axios'

function OrderElement({input, realised, realiseOrder, getUnrealisedOrders, setInput}) {
    let dataList = input.data
    console.log(dataList, 'orderEl')

    return (
        <ul className='w-full h-5/6 flex flex-row flex-wrap border-2 border-teal-200 rounded-md mt-5 overflow-y-auto'>
            {
                input?.data ? input.data.map((el,id)=>{
                    if (!el.realised && !realised) {
                        return (
                            <li key={id} className='w-3/12 h-40 my-1 border-2 border-gray-900 rounded-sm bg-teal-200'>
                                <div className='flex flex-row justify-between'>
                                    <p>id {el.order_id}</p>
                                    <button id={el.order_id} onClick={()=>{realiseOrder(el.order_id, true); getUnrealisedOrders().then(data=>{setInput(data)})}} className='mr-2 text-lg'>x</button>
                                </div>
                                <hr/>
                                <ul>
                                    {
                                        el.order && el.order.map((it,id)=>{
                                            console.log(it)
                                            return <li key={id} >{it}</li>
                                        })
                                    }
                                </ul>
                            </li>
                        )
                    } else if (el.realised && realised) {
                        return (
                            <li key={id} className='w-3/12 h-40 my-1 border-2 border-gray-900 rounded-sm bg-teal-200'>
                                <div className='flex flex-row justify-between'>
                                    <p>id {el.order_id}</p>
                                    <button id={el.order_id} onClick={()=>{realiseOrder(el.order_id, false); getUnrealisedOrders().then(data=>{setInput(data)})}} className='mr-2 text-lg'>x</button>
                                </div>
                                <hr/>
                                <ul>
                                    {
                                        el.order && el.order.map((it,id)=>{
                                            console.log(it)
                                            return <li key={id} >{it}</li>
                                        })
                                    }
                                </ul>
                            </li>
                        )
                    }
                }) : null
            }
        </ul>
    )
}

export default OrderElement;