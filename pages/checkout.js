import {connect} from 'react-redux'
import {useRouter} from 'next/router'

function Checkout(props) {
    const router = useRouter()
    console.log(props.state.total, 'checkout')
    return ( 
        <div className='relative top-22 bg-gradient-to-br from-slate-200 to-lime-300 rounded-md h-full'>
            <div className='absolute top-5 left-5'>
                <p>£{props.state?.total}</p>
                <button onClick={()=>{router.push('/')}}>Back</button>
            </div>
        </div>
        
     );
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(Checkout);