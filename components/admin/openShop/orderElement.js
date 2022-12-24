import SingleOrderItem from "./singleOrderItem.js"

function OrderElement({input, realised, realiseOrder, getUnrealisedOrders, setInput}) {
    console.log(input, 'input')
    return (
        <ul className='w-full h-5/6 flex flex-row flex-wrap border-2 border-teal-200 rounded-md mt-5 overflow-y-auto justify-start'>
            {
                input && input?.length > 0 ? input.map((el,id)=>{
                    if (el.realised == 'unrealised' && realised == 'unrealised' ) {
                        return (
                            <li key={id} className='w-3/12 h-fit border-2 border-gray-900 rounded-sm bg-teal-200 scrollbar-thin overflow-y-auto shadow-xl'>
                                <div className='flex flex-row justify-between'>
                                    <p>id {el.order_id}</p>
                                    <button id={el.order_id} onClick={()=>{realiseOrder(el.order_id, 'realised').then(data=>getUnrealisedOrders()).then(data=>{setInput(data.data)})}} className='mr-2 mb-1 text-2xl'>x</button>
                                </div>
                                <hr/>
                                <ul>
                                    {
                                        el.items && JSON.parse(el.items).map((it,id)=>{
                                            return <SingleOrderItem key={id} it={it} id={id} />
                                        })
                                    }
                                    {el.note ? <p>Note:<p className="text-red-600">{el.note}</p></p> : null}
                                </ul>
                                <div className="flex flex-row justify-between w-full border-t-2 border-slate-400 px-1">
                                    <p>{el.date}</p>
                                    <p>£{el.total}</p>
                                </div>
                            </li>
                        )
                    } else if (el.realised == 'realised' && realised == 'realised') {
                        return (
                            <li key={id} className='w-3/12 h-fit border-2 border-gray-900 rounded-sm bg-teal-200 scrollbar-thin overflow-y-auto shadow-xl'>
                                <div className='flex flex-row justify-between'>
                                    <p>id {el.order_id}</p>
                                    <button onClick={()=>{realiseOrder(el.order_id, 'archive').then(data=>getUnrealisedOrders()).then(data=>{setInput(data.data)})}}  className='mr-2 text-lg'>Archive</button>
                                </div>
                                <hr/>
                                <ul>
                                    <li>{el.name}</li>
                                    <li>{el.email}</li>
                                    <li>{el.mobile}</li>
                                    <li>{el.address1}</li>
                                    <li>{el.address2}</li>
                                    <li>{el.postCode}</li>
                                    <li>{el.city}</li>
                                </ul>
                                <div className="flex flex-row justify-between w-full border-t-2 border-slate-400 px-1">
                                    <p>{el.date}</p>
                                    <button onClick={()=>{realiseOrder(el.order_id, 'unrealised').then(data=>getUnrealisedOrders()).then(data=>{setInput(data.data)})}} className="hover:font-bold">Undo</button>
                                    <p>£{el.total}</p>
                                </div>
                            </li>
                        )
                    }
                }).reverse() : null
            }
        </ul>
    )
}

export default OrderElement;