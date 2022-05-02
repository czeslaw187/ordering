import {useEffect, useState} from 'react'

function Location({props}) {
    const tD = props.state?.timeDist?.data
    const [visual,setVisual] = useState(false)
    useEffect(()=>{
        setVisual(true)
    },[])

    return ( 
        <div className={
            visual ? "w-10/12 lg:w-5/12 h-2/6 opacity-100 rounded-xl absolute z-[10002] ml-8 lg:ml-14 transition-opacity duration-1000 bg-gradient-to-tr from-cyan-400 to-slate-400":
            "w-0 h-0 opacity-0"
        }>            
            <div className='rounded-lg border-2 border-indigo-600 h-5/6 m-3'>
                <div className='w-full flex flex-row flex-end'>
                    <button className='ml-auto text-right mr-4' onClick={()=>{setVisual(false)}}>x</button>
                </div>
                <p className='w-full mt-4 text-center text-2xl'>We are {Math.round(props.state?.timeDist?.data?.length/100)/10} Km away from you</p>
                <p className='w-full mt-4 text-center text-2xl'>We can deliver your food in {Math.round(props.state?.timeDist?.data?.duration/60)} min</p>
            </div>
        </div>
     );
}

export default Location;

