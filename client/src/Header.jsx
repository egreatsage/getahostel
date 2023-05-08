import React, { useContext } from 'react'
import {FaLaptopHouse, FaUserCircle} from 'react-icons/fa'
import {FcSearch} from 'react-icons/fc'
import {RxHamburgerMenu} from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'
export default function Header() {
  const {user} = useContext(UserContext);
  console.log(user)
  return (
    <div>
          <header className='flex justify-between'>
            <a href="" className='flex gap-2'>
           < FaLaptopHouse className=' text-2xl text-primary'/>
           <span className='font-bold text-xl'>Le Rento</span>
            </a>
            <div className='flex border gap-2 shadow-md shadow-gray-300 border-gray-300 rounded-full py-2 px-4'>
              <div>Anywhere</div>
              <div className="border border-l border-gray-300"></div>
              <div>Anyplace</div>
              <div className="border border-l border-gray-300"></div>
              <div>Anytype</div>
              <button className='bg-none rounded-full'>
              <FcSearch className=''/>
              </button>
            </div>
            <Link to={'/login'} className="flex items-center border gap-2  shadow-gray-300 border-gray-300 rounded-full py-2 px-4">
            <RxHamburgerMenu/>
            <FaUserCircle className='text-gray-400 top-1'/>
           
            {!!user && (
              <div>
                {user.name}
              </div>
            )}
            

            </Link>
           
            
           </header>
    </div>
  )
}
