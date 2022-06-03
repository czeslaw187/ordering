import Link from 'next/link'

function AdminNav({urlAdress, title}) {
    return ( 
        <div className="w-full h-16 flex flex-row justify-between border-2 py-2">
            <p className='ml-4 text-3xl'>{title}</p>
            <Link href={urlAdress}><a className='underline mr-4'>{'<< Back'}</a></Link>
        </div>
     );
}

export default AdminNav;