import {useRouter} from 'next/router'

function Cancel() {
    const router = useRouter()
    router.push('/checkout')

    return ( 
        <div>Redirecting to checkout</div>
     );
}

export default Cancel;