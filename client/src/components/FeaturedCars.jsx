import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const FeaturedCars = () => {
  const navigate = useNavigate()
  const { cars, setInput } = useAppContext()

  const filtered = cars.filter(
    car => car.category && car.category.toLowerCase().startsWith('car')
  )

  if (filtered.length === 0) return null

  return (
    <div className='flex flex-col items-center py-24 px-12 md:px-32 lg:px-40 xl:px-52'>
      <Title
        title='Featured Cars'
        subTitle='Explore our selection of premium cars available for your next adventure.'
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
        {filtered.slice(0, 6).map(car => (
          <div key={car._id} className="h-full">
            <CarCard car={car}/>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setInput('Car')
          navigate('/category/cars')
          scrollTo(0, 0)
        }}
        className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'
      >
        Explore all cars
        <img src={assets.arrow_icon} alt="arrow"/>
      </button>
    </div>
  )
}

export default FeaturedCars
