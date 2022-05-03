import {useState} from 'react'
import {connect} from 'react-redux'
import * as actionCreator from '../../lib/actions.js'
import {useRouter} from 'next/router'

function ControlPanel(props) {
    const router = useRouter()
    const [option,setOption] = useState('')
    console.log(props.state.isLogged, 'cp')

    !props.state.isLogged ? router.push('/admin') : null

    console.log(props.state.isLogged, 'adlogin')
    if (props.state.isLogged) {
        return ( 
            <div className="w-full h-screen bg-gradient-to-tr from-sky-400 to-lime-500">
                <div className="w-full h-16 flex flex-row justify-between border-2 py-2 ">
                    <div className="text-3xl ml-4">ControlPanel</div>
                    <button className="w-1/12 mr-4 h-10 rounded-md bg-lime-300" onClick={()=>{props.isLogged(!props.state.isLogged); router.push('/admin')}}>LogOut</button>
                </div>
                <div className="flex flex-row flex-wrap justify-between mt-10">
                    <button className="w-3/12 mx-4 mt-10 h-28 border-2 border-slate-500 hover:scale-[1.1] transition-all">Manage Orders</button>                
                    <button className="w-3/12 mx-4 mt-10 h-28 border-2 border-slate-500 hover:scale-[1.1] transition-all">Manage Account</button>                
                    <button className="w-3/12 mx-4 mt-10 h-28 border-2 border-slate-500 hover:scale-[1.1] transition-all">Open shop</button>                  
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