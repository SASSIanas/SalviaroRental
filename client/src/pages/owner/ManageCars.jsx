import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { 
  Edit, 
  Eye, 
  EyeOff, 
  Trash2,
  PlusCircle
} from 'lucide-react' // أضف استيراد الأيقونات من Lucide

const ManageCars = () => {

  const {isOwner, axios , currency} = useAppContext()
  const navigate = useNavigate()

  const [cars, setCars] = useState([])

  const fetchOwnerCars = async ()=>{
    try {
      const {data} = await axios.get('/api/owner/cars')
      if (data.success) {
        setCars(data.cars)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability = async (carId)=>{
    try {
      const {data} = await axios.post('/api/owner/toggle-car',{carId})
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteCar = async (carId)=>{
    try {
      const confirm = window.confirm('Are you sure you want to delete this car?')
      if (!confirm) return null

      const {data} = await axios.post('/api/owner/delete-car',{carId})
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // دالة للذهاب إلى صفحة التعديل
  const editCar = (carId) => {
    navigate(`/owner/edit-car/${carId}`)
  }

  useEffect(()=>{
    isOwner && fetchOwnerCars()
  },[isOwner])

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title 
        title='Manage Cars' 
        subTitle='View all listed cars, update their details, or remove them from the booking platform.'
      />
      
      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500 bg-gray-50'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-md:hidden'>Category</th>
              <th className='p-3 font-medium'>Price</th>
              <th className='p-3 font-medium max-md:hidden'>Status</th>
              <th className='p-3 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car,index)=>(
              <tr key={index} className='border-t border-borderColor hover:bg-gray-50 transition-colors'>
                <td className='p-3 flex items-center gap-3'>
                  <img 
                    src={car.image} 
                    alt={`${car.brand} ${car.model}`} 
                    className='h-12 w-12 aspect-square rounded-md object-cover border border-gray-200'
                  />
                  <div className='max-md:hidden'>
                    <p className='font-medium text-gray-800'>{car.brand} {car.model}</p>
                    <p className='text-xs text-gray-500'>{car.seating_capacity} seats • {car.transmission}</p>
                  </div>
                  {/* عرض للموبايل */}
                  <div className='md:hidden'>
                    <p className='font-medium text-gray-800'>{car.brand} {car.model}</p>
                    <p className='text-xs text-gray-500'>{car.seating_capacity} seats • {car.pricePerDay}{currency}/day</p>
                  </div>
                </td>

                <td className='p-3 max-md:hidden'>
                  <span className='px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full'>
                    {car.category}
                  </span>
                </td>
                <td className='p-3 font-medium text-gray-800'>
                  {currency}{car.pricePerDay}<span className='text-xs text-gray-500'>/day</span>
                </td>

                <td className='p-3 max-md:hidden'>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${car.isAvaliable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {car.isAvaliable ? 'Available' : 'Unavailable'}
                  </span>
                </td>

                <td className='p-3'>
                  <div className='flex items-center gap-3'>
                    {/* زر التعديل */}
                    <button 
                      onClick={() => editCar(car._id)} 
                      className='p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors'
                      title="Edit Car"
                    >
                      <Edit className='h-4 w-4' />
                    </button>
                    
                    {/* زر تبديل التوفر */}
                    <button 
                      onClick={()=> toggleAvailability(car._id)} 
                      className={`p-1.5 rounded-md transition-colors ${car.isAvaliable ? 'text-green-600 hover:text-green-800 hover:bg-green-50' : 'text-red-600 hover:text-red-800 hover:bg-red-50'}`}
                      title={car.isAvaliable ? "Mark as Unavailable" : "Mark as Available"}
                    >
                      {car.isAvaliable ? (
                        <Eye className='h-4 w-4' />
                      ) : (
                        <EyeOff className='h-4 w-4' />
                      )}
                    </button>

                    {/* زر الحذف */}
                    <button 
                      onClick={()=> deleteCar(car._id)} 
                      className='p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors'
                      title="Delete Car"
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* رسالة عند عدم وجود سيارات */}
        {cars.length === 0 && (
          <div className='text-center py-12 px-4'>
            <div className='mx-auto w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4'>
              <PlusCircle className='h-8 w-8 text-gray-400' />
            </div>
            <p className='text-gray-500 text-lg mb-2'>No cars listed yet</p>
            <p className='text-gray-400 text-sm mb-6'>Start by adding your first car to the platform</p>
            <button 
              onClick={() => navigate('/owner/add-car')}
              className='inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-md hover:bg-primary-dull transition-colors font-medium'
            >
              <PlusCircle className='h-4 w-4' />
              Add Your First Car
            </button>
          </div>
        )}

        {/* رسالة عند وجود سيارات */}
        {cars.length > 0 && (
          <div className='px-4 py-3 bg-gray-50 border-t border-borderColor text-sm text-gray-500'>
            <div className='flex justify-between items-center'>
              <span>Total: {cars.length} car{cars.length !== 1 ? 's' : ''}</span>
              <button 
                onClick={() => navigate('/owner/add-car')}
                className='inline-flex items-center cursor-pointer gap-2 text-primary hover:text-primary-dull transition-colors'
              >
                <PlusCircle className='h-4 w-4' />
                Add Another Car
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageCars