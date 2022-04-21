import {useRouter} from 'next/router'

function Cancel() {
    const router = useRouter()
    setTimeout(()=>{
        router.push('/')
    }, 5000)
    return ( 
        <div className="pt-32 bg-gradient-to-br from-slate-200 to-lime-300 rounded-md h-full w-full m-auto">
                <p className="w-full text-center text-6xl">Payment unsuccessful. Check console</p>
        </div>
     );
}

export default Cancel;