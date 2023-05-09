import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios';
import PlacesPage from './PlacesPage';
import { FaUserAlt } from 'react-icons/fa';
import {TbBrandBooking} from 'react-icons/tb'
import {BsHouseCheckFill} from 'react-icons/bs'
export default function AccountPage() {
    const {user,ready,setUser}= useContext(UserContext)
    const [redirect,setRedirect]= useState(null)
     
    let {subpage} = useParams();
   if (subpage === undefined){
    subpage = 'profile'
   }
   async function logout() {
    await axios.post('/logout')
    setUser(null)
    setRedirect('/')
   }

    if (!ready){
        return 'loading'
    }

    if(ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }
  
   
       function linkClasses(type = null){
        let classes = 'px-6 py-2 flex items-center gap-2 rounded-full';
        if(type === subpage){
           classes += 'bg-primary text-white '
        }
        else{
            classes += 'bg-gray-200 text-gray-700 '
        }
        return classes
       }
       
       if (redirect){
        return <Navigate to={redirect}/>
       }
  return (
    <div>
        <nav className='w-full flex mt-8 gap-2 justify-center mb-8'>
            <Link className={linkClasses('profile')} to={'/account'}>
                <FaUserAlt/>
                My profile
            </Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                <TbBrandBooking/>
                My Bookings
            </Link>
            <Link className={linkClasses('places')} to={'/account/places'}>
                <BsHouseCheckFill/>
                My accomodation
            </Link>
        </nav>
        
        {
            subpage =='profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name}
                        ({user.email})<br/>
                        <button onClick={logout} className='primary max-w-sm mt-2'>
                            Log out
                        </button>
                    
                </div>
            )
        }
        
        {
            subpage =='places' &&(
                <PlacesPage/>
            )
        }
    </div>
  )
}
