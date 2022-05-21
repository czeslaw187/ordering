import { useState } from "react"
import SingleOrderItem from "./singleOrderItem.js"

function OrderElement({input, realised, realiseOrder, getUnrealisedOrders, setInput}) {
    const [color,setColor] = useState(false)

    return (
        <ul className='w-full h-5/6 flex flex-row flex-wrap border-2 border-teal-200 rounded-md mt-5 overflow-y-auto justify-start'>
            {
                input?.data ? input.data.map((el,id)=>{
                    if (!el.realised && !realised) {
                        return (
                            <li key={id} className='w-3/12 h-fit my-1 border-2 border-gray-900 rounded-sm bg-teal-200 scrollbar-thin overflow-y-auto'>
                                <div className='flex flex-row justify-between'>
                                    <p>id {el.order_id}</p>
                                    <button id={el.order_id} onClick={()=>{realiseOrder(el.order_id, true).then(data=>getUnrealisedOrders()).then(data=>{setInput(data)})}} className='mr-2 mb-1 text-2xl'>x</button>
                                </div>
                                <hr/>
                                <ul>
                                    {
                                        el.items && JSON.parse(el.items).map((it,id)=>{
                                            return <SingleOrderItem it={it} id={id} />
                                        })
                                    }
                                </ul>
                                <p className='w-full text-right pr-2 border-t-2 border-slate-500'>£{el.total}</p>
                            </li>
                        )
                    } else if (el.realised && realised) {
                        return (
                            <li key={id} className='w-3/12 h-fit my-1 border-2 border-gray-900 rounded-sm bg-teal-200 scrollbar-thin overflow-y-auto'>
                                <div className='flex flex-row justify-between'>
                                    <p>id {el.order_id}</p>
                                    <button id={el.order_id} onClick={()=>{realiseOrder(el.order_id, false).then(data=>getUnrealisedOrders()).then(data=>{setInput(data)})}} className='mr-2 text-lg'>x</button>
                                </div>
                                <hr/>
                                <ul>
                                    {
                                        el.items && JSON.parse(el.items).map((it,id)=>{
                                            return <SingleOrderItem it={it} id={id} />
                                        })
                                    }
                                </ul>
                                <div className="flex flex-row justify-between w-full border-t-2 border-slate-400 px-1">
                                    <button className="hover:font-bold">Undo</button>
                                    <p>£{el.total}</p>
                                </div>
                            </li>
                        )
                    }
                }) : null
            }
        </ul>
    )
}

export default OrderElement;