import {useState} from 'react'

function Dropdown({element, items}) {
    console.log(element, 'manageOrders')
    const [dropdown,setDropdown] = useState(false)

    return (
        <div className='w-full text-center border-2 rounded-md border-green-200 my-2'>
            <div className='w-full px-4 flex flex-row justify-between my-2'>
                <p>{element.name}</p>
                <p>{element.order_id}</p>
                <div className='flex flex-row justify-between w-5/12'>
                    <p className='mx-2'>{element.date}</p>    
                    <button onClick={()=>{setDropdown(!dropdown)}} className={dropdown ? 'bg-lime-400 rounded-lg px-2 shadow-xl hover:bg-lime-500 active:shadow-inner' : 'bg-lime-400 rounded-lg px-2 shadow-xl active:shadow-inner hover:bg-lime-500'}>{dropdown ? 'Close' : 'Open'}</button>
                </div>                                                       
            </div>
            <div className={dropdown ? 'w-full max-h-64 transition-all duration-1000 visible' : 'max-h-0'}>
                <div className={dropdown ? 'delay-300 visible text-justify px-4 flex flex-row w-full justify-between' : 'invisible'}>
                    <div>
                        <p>{element.email}</p>
                        <p>{element.address1}</p>
                        <p>{element.address2}</p>
                        <p>{element.postCode}</p>
                        <p>{element.city}</p>
                    </div>
                    <div>
                        <ul>
                            {
                                items && items.map((el, id)=>{
                                    return <li key={id} >{el}</li>
                                })
                            }
                            {element.note ? <p>Note:<p className="text-red-600">{element.note}</p></p> : null}
                        </ul>
                    </div>
                    <div>
                        <p>Total paid £{element.total}</p>
                    </div>
                </div>                
            </div> 
        </div>
    )
}

export default Dropdown;