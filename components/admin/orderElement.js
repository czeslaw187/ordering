import {useEffect, useState} from 'react'

function OrderElement({input}) {
    return (
        <ul className='w-full h-5/6 flex flex-row flex-wrap border-2 border-teal-200 rounded-md mt-5 overflow-y-auto'>
            {
                input ? input.filter((x, i, a) => a.indexOf(x) == i).map((el,id)=>{
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
    )
}

export default OrderElement;