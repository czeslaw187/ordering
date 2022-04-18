import {connect} from 'react-redux'
import {useRouter} from 'next/router'

function Checkout(props) {
    const router = useRouter()
    console.log(props, 'checkout')
    return ( 
        <div className='pt-32 bg-gradient-to-br from-slate-200 to-lime-300 rounded-md h-screen w-full'>
            <div className='w-11/12 flex flex-row justify-start'>                
                <button className='mb-14 ml-7 underline' onClick={()=>{router.push('/')}}>{"<< Back"}</button>   
            </div> 
            <form className='w-6/12 h-4/6 mx-auto px-auto py-5 border-2 border-teal-400 rounded-md flex flex-col'>
                <label className='w-10/12 mx-auto' htmlFor='name'>Your name</label>
                <input className='w-10/12 mx-auto h-10 rounded-md' type="text" name='name' id='name' required />
                <label className='w-10/12 mx-auto' htmlFor='email'>Your email</label>
                <input className='w-10/12 mx-auto h-10 rounded-md' type="email" name='email' id='email' required />
                <label className='w-10/12 mx-auto' htmlFor='address1'>Your address line 1</label>
                <input className='w-10/12 mx-auto h-10 rounded-md' type="address" name='address1' id='address1' required />
                <label className='w-10/12 mx-auto' htmlFor='address2'>Your address line 2</label>
                <input className='w-10/12 mx-auto h-10 rounded-md' type="address" name='address2' id='address2' required />
                <label className='w-10/12 mx-auto' htmlFor='postCode'>Post Code</label>
                <input className='w-5/12 ml-11 h-10 rounded-md' type="text" name='postCode' id='postCode' required />
                <label className='w-10/12 mx-auto' htmlFor='city'>City</label>
                <input className='w-5/12 ml-11 h-10 rounded-md' type="text" name='city' id='city' required />
            </form>   
            <p className='text-xl ml-14 mt-8'>Total price with delivery £{props.state?.total}</p>         
            <div className='w-full flex justify-center'>
                <button onClick={()=>{props.sendTotal(props.state?.total)}} className='w-2/12 bg-indigo-400 hover:bg-indigo-600 rounded-md text-center mx-auto py-2'>Checkout</button>
            </div>
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
        sendTotal: (total)=>{dispatch({type:"ADD_TOTAL",payload:total})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);