import {connect} from 'react-redux'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import AdminNav from "../../../components/admin/adminNav";
import axios from 'axios'

function ChangePassword(props) {
    const [error, setError] = useState('')
    const [passw,setPassw] = useState([])
    const [reveal,setReveal] = useState(false)
    const [revealedPass,setRevealedPass] = useState({})
    const router = useRouter()
    !props.state.isLogged ? router.push('/admin/controlPanel') : null

    useEffect(()=>{
       if (reveal) {
            const getMyCredentials = async() => {
                    await axios.get(process.env.NEXT_PUBLIC_URL + '/api/admin/getUsername').then(data=>setRevealedPass(data))
            }
            getMyCredentials()
       }
    },[reveal])
    
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setPassw(values=>({...values,[name]:value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await axios.post(process.env.NEXT_PUBLIC_URL + '/api/admin/chngPwd', {
            username: passw.username,
            pass: passw.passw,
            conf: passw.conf
        })
        .then(message=>setError(message))
        setPassw({
            username: '',
            passw: ''
        })
    }

    console.log(revealedPass, 'password')
    if (props.state.isLogged) {
        return ( 
            <div className="w-full h-screen p-2 bg-gradient-to-tr from-sky-400 to-lime-500 overflow-y-auto">
                <AdminNav urlAdress={'/admin/manageAccount'} title={'Change Password'}/>
                <form className="flex flex-col w-3/12 mx-auto space-y-2 mt-10">
                    <label htmlFor='username'>New Username</label>
                    <input type="text" name="username" id="username" onChange={(e)=>{handleChange(e)}} value={passw.username ?? ''} className='rounded-md h-8' />
                    <label htmlFor="passw">New Password</label>
                    <input type="text" name="passw" id="passw" onChange={(e)=>{handleChange(e)}} value={passw.passw ?? ''} className='rounded-md h-8' />
                    <label htmlFor="conf">Confirm Password</label>
                    <input type="text" name="conf" id="conf" onChange={(e)=>{handleChange(e)}} value={passw.conf ?? ''} className="rounded-md h-8" />
                    <button onClick={e=>handleSubmit(e)} className="w-4/12 bg-teal-400 rounded-md mx-auto mt-4 hover:bg-teal-500 active:shadow-inner">Submit</button>
                </form>
                <p className='w-full text-center text-red-500'>{error && error.data.message}</p>
                <div className='w-full text-center'>
                    <button onClick={()=>{setReveal(!reveal)}} className='w-2/12 h-8 rounded-md bg-teal-400 shadow-lg mt-10 hover:bg-teal-500 active:shadow-inner'>Reveal Credentials</button>
                </div>
                <div className={reveal ? 'w-4/12 h-[15rem] border-2 rounded-md mx-auto flex flex-col text-center justify-around text-xl mt-10 animate-openWindow' : 'invisible animate-closeWindow'}>
                    <p>Username:</p>
                    <p className='underline'>{revealedPass.data ? revealedPass.data[0].login: null}</p>
                    <p>Password:</p>
                    <p className='underline'>{revealedPass.data ? revealedPass.data[0].password: null}</p>
                </div>
            </div>
         );
    } else {
        return <div>No access</div>
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(ChangePassword);