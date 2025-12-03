import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Hero = () => {

  const [pickupLocation, setPickupLocation] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } = useAppContext()

  const handleSearch = (e) => {
    e.preventDefault()
    setIsAnimating(true)
    setTimeout(() => {
      navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
    }, 900)
  }

  return (
    <div className='flex flex-col items-center justify-center gap-10 md:gap-12 bg-light text-center overflow-hidden'>
      <h1 className='text-4xl md:text-5xl Aspect p-4'>Luxury cars on Rent</h1>

      <form
        onSubmit={handleSearch}
        className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'
      >
        <div className='flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 min-md:ml-8'>
          
{/* Location */}
<div className='flex flex-col items-start gap-2'>
  <select
    className='min-w-[180px] max-w-[220px] truncate rounded-md px-3 py-2 text-base'
    required
    value={pickupLocation}
    onChange={(e) => setPickupLocation(e.target.value)}
  >
    <option value="">Pickup Location</option>
    {cityList.map((city) => (
      <option key={city} value={city}>
        {city}
      </option>
    ))}
  </select>

  <p className='px-1 text-base text-gray-500 w-[220px] truncate'>
    {pickupLocation ? pickupLocation : 'Please select location'}
  </p>
</div>

          {/* Pickup Date */}
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor="pickup-date">Pick-up Date</label>
            <input
              value={pickupDate}
              onChange={e => setPickupDate(e.target.value)}
              type="date"
              id='pickup-date'
              min={new Date().toISOString().split('T')[0]}
              className='text-sm text-gray-500'
              required
            />
          </div>

          {/* Return Date */}
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor="return-date">Return Date</label>
            <input
              value={returnDate}
              onChange={e => setReturnDate(e.target.value)}
              type="date"
              id='return-date'
              className='text-sm text-gray-500'
              required
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull w-full sm:w-auto text-white rounded-lg md:rounded-full'
        >
          <img src={assets.search_icon} alt="search" className='brightness-300' />
          search
        </button>
      </form>

      {/* Car Animation */}
      <img
        src={assets.main_car}
        alt="car"
        className='max-h-74'
        style={{
          transform: isAnimating ? 'translateX(150vw)' : 'translateX(0)',
          animation: isAnimating ? 'carDrive 1.5s ease-in-out forwards' : 'none',
        }}
      />

      <style>{`
        @keyframes carDrive {
          0% { transform: translateX(0); }
          20% { transform: translateX(-30px); }
          100% { transform: translateX(150vw); }
        }
      `}</style>
    </div>
  )
}

export default Hero
