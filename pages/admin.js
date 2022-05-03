import {useRouter} from 'next/router'
import {connect} from 'react-redux'
import {useState} from 'react'
import * as actionCreator from '../lib/actions.js'

function Admin(props) {
    const router = useRouter()
    const [creden,setCreden] = useState({})
    console.log(props, 'admin')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.checkCreden(creden)
        setCreden({login:'',password:''})
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setCreden(values=>({...values,[name]:value}))
    }

    props.state.isLogged ? router.push('/admin/controlPanel') : null

    return (
        <div className="bg-gradient-to-tr from-sky-400 to-lime-500 w-screen h-screen flex-row">
            <>
                <form className="flex flex-col w-3/12 h-2/6 justify-center mx-auto">
                    <label className="font-serif text-lg mt-5" htmlFor="login">Login</label>
                    <input className="pl-2 h-10 rounded-md" type="text" name="login" id="name" onChange={(e)=>handleChange(e)} value={creden.login} required={true} />
                    <label className="font-serif text-lg mt-5" htmlFor="password">Password</label>
                    <input className="pl-2 h-10 rounded-md" type="password" name="password" id="password" onChange={(e)=>handleChange(e)} value={creden.password} required={true} />
                    <input type="submit" onClick={(e)=>{handleSubmit(e)}} value={'Submit'} className="w-4/12 h-10 rounded-md text-center text-lg bg-lime-300 mx-auto mt-7" />
                </form>
                {
                    props.state.logginErr && <p className="w-full text-center text-lg text-red-600">{props.state.logginErr}</p>
                }
            </>  
        </div>
     );
}

function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isLogged: (status)=>{dispatch({type:"IS_LOGGED", payload:status})},
        checkCreden: (credentials)=>{dispatch(actionCreator.getCreds(credentials))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);