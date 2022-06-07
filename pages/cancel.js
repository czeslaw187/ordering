import {useRouter} from 'next/router'

function cancel() {
    const router = useRouter()
    router.push('/checkout')

    return ( 
        <div>Redirecting to checkout</div>
     );
}

export default cancel;