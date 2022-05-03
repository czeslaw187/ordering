import Link from 'next/link'

function ManageOrders() {
    return ( 
        <div className="w-full h-screen bg-gradient-to-tr from-sky-400 to-lime-500">
            <div className="w-full h-16 flex flex-row justify-between border-2 py-2">
                <p className='ml-4'>Manage Orders</p>
                <Link href='/admin/controlPanel'><a className='underline mr-4'>{'<< Back'}</a></Link>
            </div>
        </div>
    );
}

export default ManageOrders;