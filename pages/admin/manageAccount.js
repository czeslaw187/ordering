import Link from 'next/link'
import {connect} from 'react-redux'
import {useRouter} from 'next/router'

function ManageAccount(props) {
    const router = useRouter()
    !props.state.isLogged ? router.push('/admin/controlPanel') : null

    if (props.state.isLogged) {
        return ( 
            <div className="w-full h-screen bg-gradient-to-tr from-sky-400 to-lime-500">
                <div className="w-full h-16 flex flex-row justify-between border-2 py-2">
                    <p className='ml-4 text-3xl'>Manage Account</p>
                    <Link href='/admin/controlPanel'><a className='underline mr-4'>{'<< Back'}</a></Link>
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