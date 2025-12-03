// components/Banner2.jsx - تصميم متجاوب مع صورة AboutUs
import React from 'react'
import { useNavigate } from 'react-router'
import { Users, ArrowRight, ShieldCheck, Star, Car } from 'lucide-react'
import { assets } from '../assets/assets'

const Banner2 = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/profiles')
  }
  
  return (
    <div className='px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-900 via-black to-gray-800
    w-full overflow-hidden border border-gray-700 shadow-2xl'>

      <div className='relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10'>
        
        {/* المحتوى النصي */}
        <div className='flex-1 text-center lg:text-left'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-600 mb-4 lg:mb-6'>
            <ShieldCheck className='w-4 h-4 text-white' />
            <span className='text-sm font-medium text-gray-200'>Trusted Network</span>
          </div>

          {/* العنوان */}
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4'>
            Meet Our <span className='bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>Car Owners</span>
          </h2>
          
          {/* الوصف */}
          <p className='text-gray-300 text-base sm:text-lg mb-6 lg:mb-8 max-w-2xl leading-relaxed'>
            Connect directly with verified car owners and rental businesses from our community. 
            Browse detailed profiles and find your perfect vehicle with complete confidence.
          </p>

          {/* المميزات */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0'>
            {[
              { icon: ShieldCheck, text: 'Verified Owners' },
              { icon: Star, text: 'Rated Providers' },
              { icon: Car, text: '100+ Vehicles' },
              { icon: Users, text: '50+ Owners' }
            ].map((item, index) => (
              <div key={index} className='flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-gray-700'>
                <div className='p-2 bg-white/10 rounded-lg'>
                  <item.icon className='w-4 h-4 text-white' />
                </div>
                <p className='text-white text-sm font-medium'>{item.text}</p>
              </div>
            ))}
          </div>

          {/* زر الاكتشاف */}
          <div className='mt-6 lg:mt-8'>
            <button 
              onClick={handleNavigate}
              className='group flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 
              bg-white hover:bg-gray-100 transition-all text-black rounded-xl 
              font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl 
              cursor-pointer transform hover:-translate-y-0.5 w-full sm:w-auto justify-center lg:justify-start'
            >
              <Users className='w-5 h-5 sm:w-6 sm:h-6' />
              Visit Profiles
              <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform' />
            </button>
          </div>
        </div>

        {/* الصورة من AboutUs */}
        <div className='w-full lg:w-96 flex-shrink-0'>
          <div className='relative rounded-xl overflow-hidden border border-gray-600 shadow-lg'>
            <img 
              src={assets.tswira1 || assets.tiwtiw} 
              alt="Our Car Owners Community"
              className='w-full h-48 sm:h-56 lg:h-64 object-cover'
            />
            {/* Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
            
            {/* نص على الصورة */}
            <div className='absolute bottom-4 left-4 right-4'>
              <p className='text-white text-sm font-medium'>Join Our Growing Community</p>
              <p className='text-gray-300 text-xs'>Trusted car owners across Morocco</p>
            </div>
          </div>
        </div>

      </div>

      {/* خط فاصل مع إحصائيات */}
      <div className='relative mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-800'>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-gray-400 text-sm'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-green-400 rounded-full'></div>
            <span>Verified Owners</span>
          </div>
          <div className='hidden sm:block w-px h-4 bg-gray-600'></div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-blue-400 rounded-full'></div>
            <span>Secure Booking</span>
          </div>
          <div className='hidden sm:block w-px h-4 bg-gray-600'></div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-purple-400 rounded-full'></div>
            <span>Direct Contact</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Banner2