// pages/OwnerProfile.jsx
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import CarCard from '../components/CarCard'
import { assets } from '../assets/assets'

const OwnerProfile = () => {
    const { ownerId } = useParams()
    const { axios } = useAppContext()
    const navigate = useNavigate()
    const [owner, setOwner] = React.useState(null)
    const [cars, setCars] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchOwnerData = async () => {
            try {
                // نجيب بيانات المالك
                const ownerResponse = await axios.get(`/api/user/${ownerId}`)
                if (ownerResponse.data.success) {
                    setOwner(ownerResponse.data.user)
                }

                // نجيب سيارات المالك
                const carsResponse = await axios.get(`/api/user/owner-cars/${ownerId}`)
                if (carsResponse.data.success) {
                    setCars(carsResponse.data.cars)
                }
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchOwnerData()
    }, [ownerId, axios])

    if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>
    if (!owner) return <div className="flex justify-center items-center h-64">Owner not found</div>

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
            {/* زر الرجوع */}
            <button onClick={() => navigate('/profiles')} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
                ← Back to all profiles
            </button>

            {/* معلومات المالك */}
            <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
                <div className='flex items-center gap-6'>
                    <img 
                        src={owner.image || assets.testimonial_image_1} 
                        alt={owner.name}
                        className='w-20 h-20 rounded-full object-cover'
                    />
                    <div>
                        <h1 className='text-2xl font-bold'>{owner.name}</h1>
                        {owner.rentalBusinessName && (
                            <p className='text-lg text-primary'>{owner.rentalBusinessName}</p>
                        )}
                        {owner.rentalAddress && (
                            <p className='text-gray-600'>{owner.rentalAddress}</p>
                        )}
                        <p className='text-gray-500 text-sm'>Car Owner</p>
                    </div>
                </div>
            </div>

            {/* سيارات المالك */}
            <div>
                <h2 className='text-xl font-semibold mb-6'>
                    Available Cars ({cars.length})
                </h2>
                
                {cars.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {cars.map((car) => (
                            <CarCard key={car._id} car={car} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No cars available from this owner</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OwnerProfile