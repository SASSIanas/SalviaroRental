import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const FeaturedAirplanes = () => {
  const navigate = useNavigate()
  const { cars, input, setInput } = useAppContext()

  // 🔹 Filter airplanes
  const filtered = cars.filter(
    (car) => car.category && car.category.toLowerCase().startsWith('airplane')
  )

  if (filtered.length === 0) return null

  return (
    <div className='flex flex-col items-center py-24 px-12 md:px-32 lg:px-40 xl:px-52'>
      <Title
        title='Featured Airplanes'
        subTitle='Experience luxury in the skies with our exclusive airplane rentals.'
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
          setInput('Airplane')
          navigate('/category/airplanes')
          scrollTo(0, 0)
        }}
        className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'
      >
        Explore all airplanes
        <img src={assets.arrow_icon} alt="arrow" />
      </button>
    </div>
  )
}

export default FeaturedAirplanes
