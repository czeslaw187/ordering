import Link from 'next/link'
import {connect} from 'react-redux'
import {useRouter} from 'next/router'
import AdminNav from '../../components/admin/adminNav'

function ManageAccount(props) {
    const router = useRouter()
    !props.state.isLogged ? router.push('/admin/controlPanel') : null

    if (props.state.isLogged) {
        return ( 
            <div className="w-full h-screen p-2 bg-gradient-to-tr from-sky-400 to-lime-500">
                <AdminNav urlAdress={'/admin/controlPanel'} title={'Manage Account'}/>
                <div className='w-full flex flex-row flex-wrap justify-around'>
                    <Link href='/admin/manageAccount/changePassword'>
                        <a className="w-3/12 flex flex-col justify-center text-center mx-4 mt-10 h-28 border-2 border-slate-500 hover:scale-[1.1] transition-all">Change password</a>
                    </Link>
                </div>
            </div>
        );
    } else {
        return <p>No access</p>
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(ManageAccount);