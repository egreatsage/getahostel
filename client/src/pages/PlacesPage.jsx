import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {AiOutlinePlus} from 'react-icons/ai'
import {FiUpload} from 'react-icons/fi'
import axios from 'axios'
import Perkslabels from './Perkslabels'
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
    async function addPhotoByLink(ev){
      ev.preventDefault();
      const {data:filename} = await axios.post('/upload-by-link',{link:photolink})
      setAddedPhotos(prev=>{
        return [...prev,filename]
      })
      setPhotoLink('')
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
              {preInput('Title', 'Title for your place')}
             <input type='text' placeholder='title, e.g Le Pamus Hostels'
             value={title}
             onChange={ev=>setTitle(ev.target.value)}
             />
           
             {preInput('Address', 'Address of your place')}
             <input type='text' placeholder='address'
              value={address}
              onChange={ev=>setAddress(ev.target.value)}/>
            
             {preInput('Photos', 'the more the better')}
             <div className='flex gap-2'>
              <input type='text'  placeholder={'Add using a link ...jpg'}
               value={photolink}
               onChange={ev=>setPhotoLink(ev.target.value)}/>
              <button onClick={addPhotoByLink} className='bg-gray-200 grow text-sm px-4 rounded-2xl'>Add</button>
             </div>
             <div className='mt-4 grid grid-cols-3 md:grid-cols-4l lg:grid-cols-6 ' >
              {addedPhotos.length > 0 && addedPhotos.map(link=>(
                <div>
                  <img src={'http://localhost:4000/models/uploads/' + link}/>
                </div>
              ))} 
             <button className='border bg-transparent rounded-2xl p-8 text-xl flex justify-center gap-2 text-gray-600'><FiUpload className='text-3xl font-bold'/>Upload</button>
             </div>

             {preInput('Description', 'Make it appealing')}
             <textarea   value={description}
             onChange={ev=>setDescription(ev.target.value)}/>

             {preInput('Perks', 'Select All that Applies')}
             <div className=''>
            <Perkslabels selected={perks} onChange={setPerks}/>
             </div>
             {preInput('Extra Info', 'house rules... etc.')}
             <textarea  value={extrainfo}
             onChange={ev=>setExtrainfo(ev.target.value)}/>

             <h2 className='text-2xl mt-4'>Checkin and Checkout time</h2>
             <p className='text-sm text-gray-500'>add check in and check out times, remember to add a window for other activities</p>
             <div className='grid sm:grid-cols-3 gap-2'>
              
             <div>
              <h3 className='mt-2 -mb-2'>check-in time</h3>
              <input type='text' placeholder='14:00'
               value={Checkin}
               onChange={ev=>setCheckin(ev.target.value)}/>
             </div>
             <div>
             <h3 className='mt-2 -mb-2'>check-out time</h3>
              <input type='text' placeholder='07:00'
              value={checkout}
              onChange={ev=>setCheckout(ev.target.value)}/>
             </div>
             <div>
             <h3 className='mt-2 -mb-2'>max no of guests</h3>
              <input type='number' placeholder='4'
              value={maxGuests}
              onChange={ev=>setMaxGuests(ev.target.value)}/>
             </div>
             </div>
             <button className="primary my-4"> Save</button>

           </form>      
        </div>
        
        )}
    </div>
  )
}
