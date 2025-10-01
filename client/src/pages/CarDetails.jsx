import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { assets } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const CarDetails = () => {
  const { id } = useParams()
  const { cars, axios: axiosContext, pickupDate, setPickupDate, returnDate, setReturnDate, currency } = useAppContext()
  const navigate = useNavigate()

  const [car, setCar] = useState(null)
  const [bookedDates, setBookedDates] = useState([])
  const [showPickupCalendar, setShowPickupCalendar] = useState(false)
  const [showReturnCalendar, setShowReturnCalendar] = useState(false)

  useEffect(() => {
    setCar(cars.find(car => car._id === id))

    const fetchBookedDates = async () => {
      try {
        const { data } = await axios.get(`/api/bookings/${id}/unavailable-dates`)
        if (data.success) {
          setBookedDates(data.dates.map(d => new Date(d)))
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchBookedDates()
  }, [cars, id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axiosContext.post('/api/bookings/create', {
        car: id,
        pickupDate,
        returnDate
      })
      if (data.success) {
        toast.success(data.message)
        navigate('/my-bookings')
        setPickupDate('')
        setReturnDate('')
       
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  if (!car) return <Loader />

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      <button onClick={() => navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
        <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65' />
        Back to all cars
      </button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
        <div className='lg:col-span-2'>
          <img src={car.image} alt="" className='w-full max-h-60 md:max-h-100 object-cover rounded-xl mb-6 shadow-md' />
          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold'>{car.brand} {car.model}</h1>
              <p className='text-gray-500 text-lg'>{car.category}•{car.year}</p>
              {/* عرض اسم شركة التأجير */}
              {car.rentalBusinessName && (
                <p className='text-primary text-sm mt-1'>Provided by: {car.rentalBusinessName}</p>
              )}
              {car.rentalAddress && (
                <p className='text-gray-500 text-sm mt-1 flex gap-2 items-start'><img src={assets.location_icon} className='w-3' alt="" /> {car.location} | {car.rentalAddress}</p>
              )}
            </div>
            <hr className='border-borderColor my-6' />

            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity}` },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <div key={text} className='flex flex-col items-center bg-light p-4 rounded-lg'>
                  <img src={icon} alt="" className='h-5 mb-2' />
                  {text}
                </div>
              ))}
            </div>
            
            {/* Description */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Description</h1>
              <p className='text-gray-500'>{car.description}</p>
            </div>
            
            {/* Features من الخلفية */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Features</h1>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {car.features && car.features.length > 0 ? (
                  car.features.map((feature, index) => (
                    <li key={index} className='flex items-center'>
                      <img src={assets.check_icon} className='h-4 mr-2' alt="" />
                      {feature}
                    </li>
                  ))
                ) : (
                  <li className='text-gray-500'>No features available</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Right: booking form */}
        <form onSubmit={handleSubmit} className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>
          <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>
            {currency}{car.pricePerDay}<span className='text-base text-gray-400 font-normal'> per day</span>
          </p>
          <hr className='border-borderColor my-6' />

          {/* Pickup Date */}
          <div className='flex flex-col gap-2'>
            <label>Pickup Date</label>
            <button
              type="button"
              onClick={() => setShowPickupCalendar(!showPickupCalendar)}
              className='border border-borderColor px-3 py-2 rounded-lg w-full text-left'
            >
              {pickupDate ? pickupDate : 'Select Pickup Date'}
            </button>
            {showPickupCalendar && (
              <DatePicker
                selected={pickupDate ? new Date(pickupDate) : null}
                onChange={(date) => {
                  const d = new Date(date)
                  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
                  setPickupDate(d.toISOString().split('T')[0])
                  setShowPickupCalendar(false)
                }}
                inline
                excludeDates={bookedDates}
                dayClassName={date =>
                  bookedDates.some(d => d.toDateString() === date.toDateString())
                    ? "bg-black text-white rounded-full"
                    : ""
                }
                minDate={new Date()}
              />
            )}
          </div>

          {/* Return Date */}
          <div className='flex flex-col gap-2'>
            <label>Return Date</label>
            <button
              type="button"
              onClick={() => setShowReturnCalendar(!showReturnCalendar)}
              className='border border-borderColor px-3 py-2 rounded-lg w-full text-left'
            >
              {returnDate ? returnDate : 'Select Return Date'}
            </button>
            {showReturnCalendar && (
              <DatePicker
                selected={returnDate ? new Date(returnDate) : null}
                onChange={(date) => {
                  const d = new Date(date)
                  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
                  setReturnDate(d.toISOString().split('T')[0])
                  setShowReturnCalendar(false)
                }}
                inline
                excludeDates={bookedDates}
                dayClassName={date =>
                  bookedDates.some(d => d.toDateString() === date.toDateString())
                    ? "bg-black text-white rounded-full"
                    : ""
                }
                minDate={new Date()}
              />
            )}
          </div>

          <button className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer'>
            Book Now
          </button>
          <p className='text-center text-sm'>No credit card required to reserve</p>
        </form>
      </div>
    </div>
  )
}

export default CarDetails