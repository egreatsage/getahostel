import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {AiOutlinePlus} from 'react-icons/ai'
import {FiUpload} from 'react-icons/fi'
import {FcWiFiLogo} from 'react-icons/fc'
import {TbParking} from 'react-icons/tb'
import {MdOutlineSlideshow,MdPets, MdRadio} from 'react-icons/md'
import {GiOpenGate} from 'react-icons/gi'
export default function () {
  const {action} = useParams();
  
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const[address,setAddress] = useState('')
  const [addedPhotos,setAddedPhotos] = useState([]);
  const[photolink,setPhotoLink] = useState();
  const[perks, setPerks] = useState([]);
  const[extrainfo, setExtrainfo] = useState('');
  const[Checkin, setCheckin] = useState('');
  const[checkout,setCheckout] = useState('');
  const[maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return  ( <h2 className='text-2xl mt-4'>{text}</h2>)
  }
  function inputDescription(text) {
      return (<p className='text-sm text-gray-500'>{text}</p>)
    }
    function preInput(header, description){
      return (
        <>
         {inputHeader(header)}
         {inputDescription(description)}
        </>
      )
       
    }
  return (
    <div>
      {
      action !== 'new' &&(
        <div className="text-center">
        <Link to={'/account/places/new'} className="bg-primary inline-flex gap-2 items-center text-white py-2 rounded-full px-6 ">
            <AiOutlinePlus className='text-white  flex items-center '/>
       Add new place
        </Link>
    </div>
      )}

      {
        action === 'new' &&(
        <div>
           <form>
            {pre}
            <h2 className='text-2xl mt-4'>Title</h2>
            <p className='text-sm text-gray-500'>Title for your place,should be catchy</p>
             <input type='text' placeholder='title, e.g Le Pamus Hostels'/>
             <h2 className='text-2xl mt-4'>Address</h2>
             <p className='text-sm text-gray-500'>Address to your place</p>
             <input type='text' placeholder='address'/>
             <h2 className='text-2xl mt-4'>Photos</h2>
             <p className='text-sm text-gray-500'>the more the better</p>
             <div className='flex gap-2'>
              <input type='text'  placeholder={'Add using a link ...jpg'}/>
              <button className='bg-gray-200 grow text-sm px-4 rounded-2xl'>Add</button>
             </div>
             <div className='mt-4 grid grid-cols-3 md:grid-cols-4l lg:grid-cols-6 ' > 
             <button className='border bg-transparent rounded-2xl p-8 text-xl flex justify-center gap-2 text-gray-600'><FiUpload className='text-3xl font-bold'/>Upload</button>
             </div>
             <h2 className='text-2xl mt-4'>Description</h2>
             <p className='text-sm text-gray-500'>Make it appealing</p>
             <textarea/>

             <h2 className='text-2xl mt-4'>Perks</h2>
             <p className='text-sm text-gray-500'>Select all that applies</p>
             <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-2'>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox'/>
                <FcWiFiLogo className='text-2xl'/>
                <span className='text-gray-600'>Wifi</span>
              </label>
          
           
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox'/>
                <TbParking className='text-2xl'/>
                <span className='text-gray-600'>Free Parking Spot</span>
              </label>
            
             
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox'/>
                <MdOutlineSlideshow className='text-2xl'/>
                <span className='text-gray-600'>Tv</span>
              </label>
             
             
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox'/>
                <MdRadio/>
                <span className='text-gray-600'>Radio</span>
              </label>
             
             
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox'/>
                <MdPets className='text-2xl'/>
                <span className='text-gray-600'>Pets</span>
              </label>
             
             
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox'/>
                <GiOpenGate className='text-2xl'/>
                <span className='text-gray-600'>Private Entrance</span>
              </label>
             </div>
             <h2 className='text-2xl mt-4'>Extra info</h2>
             <p className='text-sm text-gray-500'>house rules ...etc</p>
             <textarea/>

             <h2 className='text-2xl mt-4'>Checkin and Checkout time</h2>
             <p className='text-sm text-gray-500'>add check in and check out times, remember to add a window for other activities</p>
             <div className='grid sm:grid-cols-3 gap-2'>
              
             <div>
              <h3 className='mt-2 -mb-2'>check-in time</h3>
              <input type='text' placeholder='14:00'/>
             </div>
             <div>
             <h3 className='mt-2 -mb-2'>check-out time</h3>
              <input type='text' placeholder='07:00'/>
             </div>
             <div>
             <h3 className='mt-2 -mb-2'>max no of guests</h3>
              <input type='text' placeholder='4'/>
             </div>
             </div>
             <button className="primary my-4"> Save</button>

           </form>      
        </div>
        
        )}
    </div>
  )
}
