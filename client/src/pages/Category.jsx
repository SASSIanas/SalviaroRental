import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Title from '../components/Title'
import CarCard from '../components/CarCard'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Category = () => {
  const { type } = useParams() // cars, motorcycles, boats, airplanes
  const navigate = useNavigate()
  const { cars } = useAppContext()
  const [filteredCars, setFilteredCars] = useState([])

  // 🔹 Function li tconverti category field l main type
  const getMainCategory = (category) => {
    if (!category) return null

    if (category.toLowerCase().startsWith('car')) return 'Car'
    if (category.toLowerCase().startsWith('motorcycle')) return 'Motorcycle'
    if (category.toLowerCase().startsWith('boat')) return 'Boat'
    if (category.toLowerCase().startsWith('airplane')) return 'Airplane'

    return 'Other'
  }

  useEffect(() => {
    if (!type) return

    const prefixMap = {
      cars: 'Car',
      motorcycles: 'Motorcycle',
      boats: 'Boat',
      airplanes: 'Airplane'
    }

    const mainType = prefixMap[type.toLowerCase()]
    if (!mainType) {
      setFilteredCars([])
      toast.error('Invalid category')
      return
    }

    const filtered = cars.filter(car => getMainCategory(car.category) === mainType)
    setFilteredCars(filtered)
  }, [type, cars])

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-24 flex flex-col items-center">
      <Title
        title={`Category ${type ? type.charAt(0).toUpperCase() + type.slice(1) : ''}`}
        subTitle={`Browse all available ${type} in our fleet.`}
      />

      {filteredCars.length === 0 ? (
        <p className="text-gray-500 mt-8">No vehicles found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full max-w-7xl">
          {filteredCars.map(car => (
            <div key={car._id}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/cars')}
        className="mt-12 px-6 py-2 border border-borderColor rounded-md hover:bg-gray-50 transition"
      >
        Back to all vehicles
      </button>
    </div>
  )
}

export default Category
