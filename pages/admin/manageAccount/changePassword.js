import {connect} from 'react-redux'
import {useRouter} from 'next/router'
import {useState} from 'react'
import AdminNav from "../../../components/admin/adminNav";
import axios from 'axios'

function ChangePassword(props) {
    const [error, setError] = useState('')
    const [passw,setPassw] = useState([])
    const router = useRouter()
    !props.state.isLogged ? router.push('/admin/controlPanel') : null

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setPassw(values=>({...values,[name]:value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await axios.post(process.env.NEXT_PUBLIC_URL + '/api/admin/chngPwd', {
            pass: passw.passw,
            conf: passw.conf
        })
        .then(message=>setError(message))
    }

    console.log(error, 'password')
    if (props.state.isLogged) {
        return ( 
            <div className="w-full h-screen p-2 bg-gradient-to-tr from-sky-400 to-lime-500 overflow-y-auto">
                <AdminNav urlAdress={'/admin/manageAccount'} title={'Change Password'}/>
                <form className="flex flex-col w-3/12 mx-auto space-y-2 mt-10">
                    <label htmlFor="passw">New Password</label>
                    <input type="text" name="passw" id="passw" onChange={(e)=>{handleChange(e)}} value={passw.passw ?? ''} className='rounded-md h-8' />
                    <label htmlFor="conf">Confirm Password</label>
                    <input type="text" name="conf" id="conf" onChange={(e)=>{handleChange(e)}} value={passw.conf ?? ''} className="rounded-md h-8" />
                    <button onClick={e=>handleSubmit(e)} className="w-4/12 border-2 border-teal-400 rounded-md mx-auto mt-4 hover:bg-teal-400">Submit</button>
                </form>
                <p className='w-full text-center text-red-500'>{error && error.data.message}</p>
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