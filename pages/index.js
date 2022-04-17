import menu from '../lib/menu.json'
import Image from 'next/image';

function Home() {
  console.log(menu)
  return ( 
    <>
      <p className='w-full text-center text-3xl'>Starters</p>
      <div className="w-screen h-full overflow-y-auto text-xl bg-gradient-to-br from-slate-200 to-lime-300 rounded-md">
        {menu.starters.map((el,id)=>{
          return (
            <div key={id}
                 onClick={(e)=>{console.log(e.target.querySelector('div'))}}
                 className='w-7/12 h-auto p-2 mx-auto hover:scale-[1.2] transition-transform 
                                     delay-50 ease-out hover:border-gray-900 my-5 border-gray-300 
                                     border-2 rounded-sm flex flex-row'>
              <Image src={el.image} width={150} height={120}/>
              <div>
                <p className='text-md m-2'>{el.name}</p>
                <p className='text-sm'>{el.description}</p>
                <p className='text-lg mt-5 ml-1'>£{el.price}.00</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
   );
}

export default Home;