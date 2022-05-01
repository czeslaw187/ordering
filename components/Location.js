import {useEffect, useState} from 'react'

function Location() {
    const [visual,setVisual] = useState(false)
    useEffect(()=>{
        setVisual(true)
    },[])

    return ( 
        <div className={
            visual ? "w-5/12 h-2/6 opacity-100 rounded-xl absolute z-[10002] bg-gradient-to-br from outline-lime-100 to bg-emerald-300 ml-14 transition-opacity duration-1000 ":
            "w-0 h-0 opacity-0"
        }>
            <div className='w-full flex flex-row flex-end'>
                <button className='ml-auto text-right mr-4 mt-2' onClick={()=>{setVisual(false)}}>x</button>
            </div>
            <p className='w-full my-8 text-center'>We are ? Km away from you</p>
            <p className='w-full mt-10 text-center'>We can deliver your food in ? min</p>
        </div>
     );
}

export default Location;