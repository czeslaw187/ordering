import {connect} from 'react-redux'
import {useRouter} from 'next/router'
import Link from 'next/link'

function ControlPanel(props) {
    const router = useRouter()

    !props.state.isLogged ? router.push('/admin') : null

    console.log(props.state.isLogged, 'adlogin')
    if (props.state.isLogged) {
        return ( 
            <div className="w-full h-screen bg-gradient-to-tr from-sky-400 to-lime-500">
                <div className="w-full h-16 flex flex-row justify-between border-2 py-2">
                    <div className="text-3xl ml-4">ControlPanel</div>
                    <Link href='/admin'><a className="w-1/12 mr-4 flex flex-col text-center justify-center text-lg h-10 rounded-md bg-lime-300" onClick={()=>{props.isLogged(!props.state.isLogged)}}>Log out</a></Link>
                </div>
                <div className="flex flex-row flex-wrap justify-around mt-10">
                    <Link href='/admin/manageOrders'>
                        <a className="w-3/12 flex flex-col justify-center text-center mx-4 mt-10 h-28 border-2 border-slate-500 hover:scale-[1.1] transition-all">Manage Orders</a>
                    </Link>      
                    <Link href='/admin/manageAccount'>
                        <a className="w-3/12 flex flex-col justify-center text-center mx-4 mt-10 h-28 border-2 border-slate-500 hover:scale-[1.1] transition-all">Manage Account</a>
                    </Link>     
                    <Link href='/admin/openShop'>
                        <a className="w-3/12 flex flex-col justify-center text-center mx-4 mt-10 h-28 border-2 border-slate-500 hover:scale-[1.1] transition-all">Open Shop</a>
                    </Link>    
                </div>
            </div>
         )
    } else {
        return <div>No access</div>
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isLogged: (status)=>{dispatch({type:"IS_LOGGED", payload:status})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);