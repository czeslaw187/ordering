import {useEffect, useState} from 'react'

function Location({props}) {
    const tD = props.state?.timeDist?.data
    console.log(tD['length'])
    const [visual,setVisual] = useState(false)
    useEffect(()=>{
        setVisual(true)
    },[])

    return ( 
        <div className={
            visual ? "w-10/12 lg:w-5/12 h-2/6 opacity-100 rounded-xl absolute z-[10002] ml-8 lg:ml-14 transition-opacity duration-1000 bg-gray-900 border-slate-50 border-2 text-white":
            "w-0 h-0 opacity-0"
        }>            
            <div className='pb-4 mx-4 mb-4 border-2 border-slate-50 rounded-lg'>
                <div className='w-full flex flex-row flex-end'>
                    <button className='ml-auto text-right mr-4' onClick={()=>{setVisual(false)}}>x</button>
                </div>
                <p className='w-full mt-4 text-center'>We are  Km away from you</p>
                <p className='w-full mt-4 text-center'>We can deliver your food in  min</p>
            </div>
        </div>
     );
}

export default Location;
// {Math.round(tD.length/100)/10}
// {Math.round(tD.duration/60)}
