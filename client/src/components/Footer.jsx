import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20 '>
        <img src={assets.logo} className='' width={150} alt="" />
        <p className='flex-1  border-gray-400 pl-4 border-l text-sm text-gray-500 max-sm:hidden'>Copyright @Kamya.dev | All right reserved. </p>
        <div className='flex gap-2.5'>
            <img className='cursor-pointer' src={assets.facebook_icon } width={35} />
            <img className='cursor-pointer' src={assets.twitter_icon } width={35} />
            <img className='cursor-pointer' src={assets.instagram_icon } width={35} />
        </div> 
    </div>
  )
}

export default Footer
