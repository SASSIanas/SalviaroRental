import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const FeaturedYacht = () => {
  const navigate = useNavigate()
  const { cars } = useAppContext()

  const filtered = cars.filter(car => car.category === 'Yacht')
  if (filtered.length === 0) return null

  return (
    <div className='flex flex-col items-center py-24 px-12 md:px-22 lg:px-32 xl:px-40'>
      <Title title='Featured Yachts' subTitle='Luxury yachts available for unforgettable sea experiences.' />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
        {filtered.slice(0, 6).map((car) => (
          <div key={car._id}>
            <CarCard car={car} />
          </div>
        ))}
      </div>
      <button
        onClick={() => { navigate('/cars'); scrollTo(0, 0) }}
        className='flex items-center justify-center gap-2 px-6 py-2 border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>
        Explore all yachts <img src={assets.arrow_icon} alt="arrow" />
      </button>
    </div>
  )
}

export default FeaturedYacht
