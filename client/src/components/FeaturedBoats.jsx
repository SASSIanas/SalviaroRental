import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const FeaturedBoats = () => {
  const navigate = useNavigate()
  const { cars, input, setInput } = useAppContext()

  // 🔹 Filter boats & watercraft
  const filtered = cars.filter(
    (car) => car.category && car.category.toLowerCase().startsWith('boat')
  )

  if (filtered.length === 0) return null

  return (
    <div className='flex flex-col items-center py-24 px-12 md:px-32 lg:px-40 xl:px-52'>
      <Title
        title='Featured Boats & Yachts'
        subTitle='Sail in style with our collection of boats, yachts, and jetskis.'
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
        {filtered.slice(0, 6).map((car) => (
          <div key={car._id}>
            <CarCard car={car} />
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setInput('Boat')
          navigate('/category/boats')
          scrollTo(0, 0)
        }}
        className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'
      >
        Explore all boats
        <img src={assets.arrow_icon} alt="arrow" />
      </button>
    </div>
  )
}

export default FeaturedBoats
