import {useState} from 'react'

function SingleOrderItem({it, id}) {
    const [color,setColor] = useState(false)
    return (
        <li key={id} onClick={()=>setColor(!color)} className={color ? 'text-lg my-2 flex flex-col bg-yellow-300' : 'text-lg my-2 flex flex-col'}>
            <p>{it}</p>
        </li>
    )
}

export default SingleOrderItem;