import menu from '../lib/menu.json'
import Image from 'next/image';

function Home() {
  console.log(menu)
  return ( 
    <div className="w-screen h-full text-xl bg-gradient-to-br from-slate-200 to-lime-300 rounded-md">
      {menu.starters.map((el,id)=>{
        return (
          <div key={id} className='w-7/12 h-auto mx-auto my-5 border-gray-300 border-2 rounded-sm'>
            <p>{el.name}</p>
            <Image src={el.image} width={150} height={120}/>
          </div>
        )
      })}
    </div>
   );
}

export default Home;