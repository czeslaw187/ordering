import {connect} from 'react-redux'
import {useState} from 'react'
import Link from 'next/link'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js';

function Checkout(props) {
    const [finalOrder, setFinalOrder] = useState({})
    const handleChange = (e) => {
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

    return ( 
        <div className='pt-32 bg-gradient-to-br from-slate-200 to-lime-300 rounded-md h-full w-full'>
            <div className='w-11/12 flex flex-row justify-start'>                
                <Link href='/'><a className='mb-14 ml-7 underline'>{"<< Back"}</a></Link>   
            </div> 
            <form className='w-11/12 md:w-6/12 h-4/6 mx-auto px-auto py-5 border-2 border-teal-400 rounded-md flex flex-col'>
                <label className='w-10/12 mx-auto' htmlFor='name'>Your name</label>
                <input className='w-10/12 mx-auto h-10 rounded-md' type="text" name='name' id='name' onChange={(e)=>{handleChange(e)}} value={finalOrder.name} required />
                <label className='w-10/12 mx-auto' htmlFor='email'>Your email</label>
                <input className='w-10/12 mx-auto h-10 rounded-md' type="email" name='email' id='email' onChange={(e)=>{handleChange(e)}} value={finalOrder.email} required />
                <label className='w-10/12 mx-auto' htmlFor='address1'>Your address line 1</label>
                <input className='w-10/12 mx-auto h-10 rounded-md' type="address" name='address1' id='address1' onChange={(e)=>{handleChange(e)}} value={finalOrder.address1} required />
                <label className='w-10/12 mx-auto' htmlFor='address2'>Your address line 2</label>
                <input className='w-10/12 mx-auto h-10 rounded-md' type="address" name='address2' id='address2' onChange={(e)=>{handleChange(e)}} value={finalOrder.address2} required />
                <label className='w-10/12 mx-auto' htmlFor='postCode'>Post Code</label>
                <input className='w-5/12 ml-8 md:ml-11 h-10 rounded-md' type="text" name='postCode' id='postCode' onChange={(e)=>{handleChange(e)}} value={finalOrder.postCode} required/>
                <label className='w-10/12 mx-auto' htmlFor='city'>City</label>
                <input className='w-5/12 ml-8 md:ml-11 h-10 rounded-md' type="text" name='city' id='city' onChange={(e)=>{handleChange(e)}} value={finalOrder.city} required />
            </form>   
            <p className='text-xl ml-14 mt-8'>Total price with delivery £{props.state?.total}</p>         
            <div className='w-full flex justify-center'>
                <button role="submit" onClick={(e)=>{
                    props.sendTotal(props.state?.total)
                    console.log(finalOrder, 'final')
                    createCheckOutSession()
                }} className='max-w-3/12 bg-indigo-400 hover:bg-indigo-600 rounded-md text-center mx-auto py-2 px-2'>Checkout</button>
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