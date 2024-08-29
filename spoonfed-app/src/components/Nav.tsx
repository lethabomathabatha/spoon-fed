// import { useState } from 'react'
import '../App.css'
// import { HeartIcon } from '@heroicons/react/24/outline'

export default function Nav() {

  // const [favourites, setFavourites] = useState([])


  return (
    <>
      <nav className=' flex justify-between items-center pl-2 pr-2 pt-5 pb-2 border-b-2 border-orange-500'>
        <img src="spoonfed-logo.png" alt="Spoonfed logo" width={90}/>

        {/* <div className='flex items-center'>
          <HeartIcon  className="h-7 w-7" />
          { favourites.length == 0 ? <p className='text-orange-500 '>0</p> : <p>{favourites.length}</p> }
        </div> */}
        
      </nav>
    </>
  )}