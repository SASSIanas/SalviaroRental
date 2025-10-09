import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Banner = () => {

  const navigate = useNavigate()
  const {isOwner} = useAppContext()

  const handlenavigate = () => {
    if(isOwner){
      navigate('/owner')
    }
    else{
      toast.error('not authorized')
    }
  }
  
  return (
    <div className='flex flex-col md:flex-row md:items-start items-center
    justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-primary to-primary-dull
    max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden'>

        <div className='text-white space-y-6'>
            <h2 className='text-3xl font-medium'>List Your Car & Get More Bookings</h2>
            <p className='mt-2'>
            Own a Car or Rental Business? Reach More Customers!
With SALVIARO, you’ll connect with real clients and boost your rentals —

            </p>
            <p className='max-w-130'>without spending extra on ads or marketing.
Grow your visibility, grow your business!</p>

            <button onClick={handlenavigate} className='px-6 py-2 bg-white hover:bg-slate-100 transition-all
            text-primary rounded-lg text-sm mb-8 cursor-pointer'>List your car</button>
        </div>

        <img src={assets.banner_car_image} alt="car" className='max-h-50 my-10'/>

    </div>
  )
}

export default Banner