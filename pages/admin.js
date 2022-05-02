import AdminLogin from "../components/adminComponents/AdminLogin.js";
import {connect} from 'react-redux'

function Admin(props) {
    console.log(props.state, 'admin')
    return ( 
        <>
            <AdminLogin props={props} />
        </>
     );
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);