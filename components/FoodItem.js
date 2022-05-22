import Image from "next/image";
import {useRef} from 'react'

function FoodItem({el, props, menu}) {
    const ref = useRef(null)
    return ( 
        <div    onClick={()=>{
                    let foodItem = menu.starters.filter(el=>{return el.name == ref.current.childNodes[1].innerHTML})
                    props.addFood(foodItem)
                }}
                className='w-11/12 md:w-7/12 h-auto p-2 mx-auto hover:scale-[1.05] transition-transform 
                                    delay-50 ease-out hover:border-gray-900 my-5 border-gray-300 
                                    border-2 rounded-sm flex flex-row'>
            <div className='my-1 mr-1'>
                <Image src={el.image} alt="" width={150} height={120}/>
            </div>
            <div ref={ref}>
                <p className='invisible'>{el.id}</p>
                <p className='text-md m-2'>{el.name}</p>
                <p className='text-sm'>{el.description}</p>
                <p className='text-lg mt-5 ml-1'>£{el.price}.00</p>
            </div>
        </div>
    );
}

export default FoodItem;