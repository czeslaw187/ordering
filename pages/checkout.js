import {connect} from 'react-redux'
import {useState} from 'react'
import Link from 'next/link'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js';

function Checkout(props) {
    const [dropdown,setDropdown] = useState(false)
    const [finalOrder, setFinalOrder] = useState({
        name: '',
        email: '',
        mobile: '',
        address1: '',
        postCode: '',
        city: ''
    })
    const [error,setError] = useState('')
    const handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setFinalOrder(values=>({...values,[name]:value}))
    }
    
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const stripePromise = loadStripe(publishableKey);

    const createCheckOutSession = async () => {
        const stripe = await stripePromise;
        const checkoutSession = await axios.post(process.env.NEXT_PUBLIC_URL + '/api/create-stripe-session', {
          item: finalOrder,
          totalPrice: props.state.total
        })
        const result = await stripe.redirectToCheckout({
          sessionId: checkoutSession.data.id,
        });
        if (result.error) {
          alert(result.error.message);
        }
    };
    
    const validateInput = (input) => {
        for (let i in input) {
            if (i !== 'address2') {
                if (input[i] === '' || !input[i]) {
                    return `enter valid ${i}`
                } 
            }
        }
        return 'ok'
    }
    
    return ( 
        <div className='py-5 bg-gradient-to-br from-slate-200 to-lime-300 rounded-md h-full w-full'>
            <div className='w-11/12 flex flex-row justify-start'>                
                <Link href='/'><a className='mb-14 ml-7 underline'>{"<< Back"}</a></Link>   
            </div> 
            <p className='w-full text-center text-red-500 text-xl'>{error}</p>
            <form className='w-11/12 md:w-6/12 mx-auto px-auto py-5 border-2 border-teal-400 rounded-md flex flex-col shadow-xl'>
                <label className='w-10/12 mx-auto' htmlFor='name'>Your name</label>
                <input className='w-10/12 mx-auto h-10 rounded-md' type="text" name='name' id='name' onChange={(e)=>{handleChange(e)}} value={finalOrder.name ?? ''} required />
                <label className='w-10/12 mx-auto' htmlFor='email'>Your email</label>
                <input className='w-10/12 mx-auto h-10 rounded-md' type="email" name='email' id='email' onChange={(e)=>{handleChange(e)}} value={finalOrder.email ?? ''} required />
                <label className='w-10/12 mx-auto' htmlFor='mobile'>Your mobile</label>
                <input className='w-10/12 mx-auto h-10 rounded-md' type="tel" name='mobile' id='mobile' onChange={(e)=>{handleChange(e)}} value={finalOrder.mobile ?? ''} required />
                <label className='w-10/12 mx-auto' htmlFor='address1'>Your address line 1</label>
                <input className='w-10/12 mx-auto h-10 rounded-md' type="address" name='address1' id='address1' onChange={(e)=>{handleChange(e)}} value={finalOrder.address1 ?? ''} required />
                <label className='w-10/12 mx-auto' htmlFor='address2'>Your address line 2</label>
                <input className='w-10/12 mx-auto h-10 rounded-md' type="address" name='address2' id='address2' onChange={(e)=>{handleChange(e)}} value={finalOrder.address2 ?? ''} required />
                <label className='w-10/12 mx-auto' htmlFor='postCode'>Post Code</label>
                <input className='w-5/12 ml-8 s:ml-12 lg:ml-11 xl:ml-16 h-10 rounded-md' type="text" name='postCode' id='postCode' onChange={(e)=>{handleChange(e)}} value={finalOrder.postCode ?? ''} required/>
                <label className='w-10/12 mx-auto' htmlFor='city'>City</label>
                <input className='w-5/12  ml-8 s:ml-12 lg:ml-11 xl:ml-16 h-10 rounded-md' type="text" name='city' id='city' onChange={(e)=>{handleChange(e)}} value={finalOrder.city ?? ''} required />
                
                <button onClick={(e)=>{e.preventDefault(); setDropdown(!dropdown)}} className='w-2/12 text-center ml-8 s:ml-12 lg:ml-11 xl:ml-16 my-2 bg-teal-400 shadow-button rounded-md hover:bg-teal-500 active:shadow-click'><label htmlFor='myNote'>Add note</label></button>
                <textarea name="myNote" id="myNote" onChange={(e)=>{handleChange(e)}} value={finalOrder.myNote ?? ''} className={dropdown ? "w-[25rem] h-52 ml-8 s:ml-12 lg:ml-11 xl:ml-16 animate-openWindow mb-auto" : 'ml-8 s:ml-12 lg:ml-11 xl:ml-16 animate-closeWindow h-0'}></textarea>
            </form>   
            <p className='text-xl ml-14 mt-8'>Total price with delivery £{props.state?.total}</p>         
            <div className='w-full flex justify-center'>
                <button role="submit" onClick={()=>{
                    setError('')
                    props.sendTotal(props.state?.total)
                    props.sendDetails(finalOrder)
                    let valid = validateInput(finalOrder)
                    console.log(finalOrder, 'valid')
                    if (valid === 'ok') {
                        createCheckOutSession()
                    } else {
                        setError(valid)
                    }
                }} className='max-w-3/12 bg-indigo-400 hover:bg-indigo-500 shadow-button active:shadow-click rounded-md text-center mx-auto py-2 px-2'>Checkout</button>
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
        sendTotal: (total)=>{dispatch({type:"ADD_TOTAL",payload:total})},
        sendDetails: (details)=>{dispatch({type:"CUSTOMER",payload:details})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);