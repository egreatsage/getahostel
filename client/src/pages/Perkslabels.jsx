import React from 'react'
import {FcWiFiLogo} from 'react-icons/fc'
import {TbParking} from 'react-icons/tb'
import {MdOutlineSlideshow,MdPets, MdRadio} from 'react-icons/md'
import {GiOpenGate} from 'react-icons/gi'
export default function Perkslabels({selected, onChange}) {
  return (
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
  )
}
