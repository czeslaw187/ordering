import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {connect} from 'react-redux'

function Success(props) {
    console.log(props, 'success')

    const router = useRouter()
    
    useEffect(()=>{
        setTimeout(()=>{
            router.push('/')
        }, 5000)
    },[])

    return ( 
        <div className="pt-32 bg-gradient-to-br from-slate-200 to-lime-300 rounded-md h-full w-full m-auto">
                <p className="w-full text-center text-6xl">Payment successful</p>
        </div>
     );
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(Success);