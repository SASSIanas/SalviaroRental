import React, { useState, useEffect } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const EditCar = () => {
  const { axios, currency } = useAppContext()
  const { carId } = useParams()
  const navigate = useNavigate()

  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [features, setFeatures] = useState([])
  const [newFeature, setNewFeature] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 4,
    location: '',
    description: '',
  })

  // دالة لجلب بيانات السيارة
  const fetchCarDetails = async () => {
    try {
      setIsFetching(true)
      const { data } = await axios.get('/api/owner/cars')
      if (data.success) {
        const carToEdit = data.cars.find(c => c._id === carId)
        if (carToEdit) {
          setCar({
            brand: carToEdit.brand || '',
            model: carToEdit.model || '',
            year: carToEdit.year || new Date().getFullYear(),
            pricePerDay: carToEdit.pricePerDay || 0,
            category: carToEdit.category || '',
            transmission: carToEdit.transmission || '',
            fuel_type: carToEdit.fuel_type || '',
            seating_capacity: carToEdit.seating_capacity || 4,
            location: carToEdit.location || '',
            description: carToEdit.description || '',
          })
          setFeatures(carToEdit.features || [])
          setImagePreview(carToEdit.image || '')
        } else {
          toast.error('Car not found')
          navigate('/owner/manage-cars')
        }
      }
    } catch (error) {
      toast.error(error.message)
      navigate('/owner/manage-cars')
    } finally {
      setIsFetching(false)
    }
  }

  // دالة لإضافة ميزة جديدة
  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature('')
    }
  }

  // دالة لحذف ميزة
  const removeFeature = (featureToRemove) => {
    setFeatures(features.filter(f => f !== featureToRemove))
  }

  // معالجة اختيار الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // دالة تحديث السيارة
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (isLoading) return null

    // التحقق من الحقول المطلوبة
    if (!car.brand || !car.model || !car.category || !car.location) {
      toast.error('Please fill all required fields')
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      if (image) {
        formData.append('image', image)
      }
      formData.append('carData', JSON.stringify({
        carId,
        ...car,
        features: features
      }))

      const { data } = await axios.put('/api/owner/update-car', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (data.success) {
        toast.success(data.message)
        navigate('/owner/manage-cars')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (carId) {
      fetchCarDetails()
    }
  }, [carId])

  if (isFetching) {
    return (
      <div className='px-4 pt-10 md:px-10 w-full flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
      </div>
    )
  }

  return (
    <div className='px-4 py-10 md:py-10 flex-1'>
      <Title
        title='Edit Car'
        subTitle='Update car details, pricing, and specifications.'
      />

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>

        {/* Car Image Upload */}
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor="car-image" className='cursor-pointer'>
            <img
              src={imagePreview || assets.upload_icon}
              alt="Car"
              className='h-20 w-20 object-cover rounded-lg border border-borderColor'
            />
            <input
              type="file"
              id='car-image'
              accept='image/*'
              hidden
              onChange={handleImageChange}
            />
          </label>
          <div>
            <p className='text-sm text-gray-500'>
              {image ? 'New image selected' : 'Click to change image'}
            </p>
            <p className='text-xs text-gray-400'>Leave empty to keep current image</p>
          </div>
        </div>

        {/* Car Brand & Model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label className='font-medium'>Brand *</label>
            <input
              type="text"
              placeholder='e.g. BMW, Mercedes, Audi...'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-colors'
              value={car.brand}
              onChange={e => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-medium'>Model *</label>
            <input
              type="text"
              placeholder='e.g. X5, E-class, A4...'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-colors'
              value={car.model}
              onChange={e => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/* Car Year, Price, Category */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label className='font-medium'>Year *</label>
            <input
              type="number"
              placeholder='2024'
              min="1990"
              max={new Date().getFullYear() + 1}
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-colors'
              value={car.year}
              onChange={e => setCar({ ...car, year: parseInt(e.target.value) || '' })}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-medium'>Daily Price ({currency}) *</label>
            <input
              type="number"
              placeholder='100'
              min="1"
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-colors'
              value={car.pricePerDay}
              onChange={e => setCar({ ...car, pricePerDay: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-medium'>Category *</label>
            <select
              onChange={e => setCar({ ...car, category: e.target.value })}
              value={car.category}
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-colors'
              required
            >
              <option value="" disabled>Select a category</option>
              <optgroup label="Cars">
                <option value="Car-Sedan">Sedan</option>
                <option value="Car-SUV">SUV</option>
                <option value="Car-Hatchback">Hatchback</option>
                <option value="Car-Coupe">Coupe</option>
                <option value="Car-Convertible">Convertible</option>
                <option value="Car-Van">Van</option>
                <option value="Car-Pickup">Pickup Truck</option>
                <option value="Car-Luxury">Luxury</option>
                <option value="Car-Sports">Sports</option>
              </optgroup>

              <optgroup label="Motorcycles">
                <option value="Motorcycle-Sport">Sport</option>
                <option value="Motorcycle-Cruiser">Cruiser</option>
                <option value="Motorcycle-Touring">Touring</option>
                <option value="Motorcycle-Dirt">Dirt Bike</option>
                <option value="Motorcycle-Scooter">Scooter</option>
                <option value="Motorcycle-Adventure">Adventure</option>
              </optgroup>

              <optgroup label="Boats & Watercraft">
                <option value="Boat-Yacht">Yacht</option>
                <option value="Boat-Jetski">Jetski</option>
                <option value="Boat-Speedboat">Speedboat</option>
                <option value="Boat-Fishing">Fishing Boat</option>
                <option value="Boat-Sailing">Sailing Boat</option>
              </optgroup>

              <optgroup label="Airplanes">
                <option value="Airplane-PrivateJet">Private Jet</option>
                <option value="Airplane-Helicopter">Helicopter</option>
                <option value="Airplane-Charter">Charter Plane</option>
                <option value="Airplane-BusinessJet">Business Jet</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Transmission, Fuel Type, Seating Capacity */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label className='font-medium'>Transmission *</label>
            <select
              onChange={e => setCar({ ...car, transmission: e.target.value })}
              value={car.transmission}
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-colors'
              required
            >
              <option value="">Select transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-medium'>Fuel Type *</label>
            <select
              onChange={e => setCar({ ...car, fuel_type: e.target.value })}
              value={car.fuel_type}
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-colors'
              required
            >
              <option value="">Select fuel type</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Plug-in Hybrid">Plug-in Hybrid</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-medium'>Seating Capacity *</label>
            <input
              type="number"
              placeholder='4'
              min="1"
              max="12"
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-colors'
              value={car.seating_capacity}
              onChange={e => setCar({ ...car, seating_capacity: parseInt(e.target.value) || 4 })}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className='flex flex-col w-full'>
          <label className='font-medium'>Features</label>
          <div className='flex gap-2 mt-1'>
            <input
              type="text"
              placeholder="Add feature (e.g. Sunroof, GPS, Heated Seats...)"
              className='px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-colors flex-1'
              value={newFeature}
              onChange={e => setNewFeature(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            />
            <button
              type="button"
              onClick={addFeature}
              className='px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors'
            >
              Add
            </button>
          </div>
          <div className='flex flex-wrap gap-2 mt-2'>
            {features.map((feature, index) => (
              <div key={index} className='flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full'>
                <span className='text-sm'>{feature}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(feature)}
                  className='text-primary hover:text-red-500 text-lg font-bold ml-1'
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Car Location */}
        <div className='flex flex-col w-full'>
          <label className='font-medium'>Location *</label>
          <select
            onChange={e => setCar({ ...car, location: e.target.value })}
            value={car.location}
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-colors'
            required
          >
            <option value="">Select a Location</option>

            {/* matarat/dawlya */}

            <option value="Casablanca Mohammed V International">Casablanca Mohammed V International</option>
            <option value="Marrakech Menara">Marrakech Menara</option>
            <option value="Agadir Al Massira">Agadir Al Massira</option>
            <option value="Fès Saïss">Fès Saïss</option>
            <option value="Tangier Ibn Battouta">Tangier Ibn Battouta</option>
            <option value="Rabat Salé">Rabat Salé</option>
            <option value="Oujda Angad">Oujda Angad</option>
            <option value="Nador Al Aroui">Nador Al Aroui</option>
            <option value="Laayoune Hassan I">Laayoune Hassan I</option>
            <option value="Dakhla">Dakhla</option>
            <option value="Essaouira Mogador">Essaouira Mogador</option>
            <option value="Ouarzazate">Ouarzazate</option>
            <option value="Errachidia Moulay Ali Cherif">Errachidia Moulay Ali Cherif</option>
            
            {/* modon */}

            <option value="Agadir">Agadir</option>
            <option value="Ahfir">Ahfir</option>
            <option value="Aïn Harrouda">Aïn Harrouda</option>
            <option value="Aït Melloul">Aït Melloul</option>
            <option value="Azrou">Azrou</option>
            <option value="Beni Mellal">Beni Mellal</option>
            <option value="Benslimane">Benslimane</option>
            <option value="Berkane">Berkane</option>
            <option value="Berrechid">Berrechid</option>
            <option value="Boujdour">Boujdour</option>
            <option value="Bouznika">Bouznika</option>
            <option value="Casablanca">Casablanca</option>
            <option value="Chefchaouen">Chefchaouen</option>
            <option value="Dakhla">Dakhla</option>
            <option value="Deroua">Deroua</option>
            <option value="El Hajeb">El Hajeb</option>
            <option value="El Jadida">El Jadida</option>
            <option value="El Kelaâ des Sraghna">El Kelaâ des Sraghna</option>
            <option value="Erfoud">Erfoud</option>
            <option value="Errachidia">Errachidia</option>
            <option value="Essaouira">Essaouira</option>
            <option value="Fès">Fès</option>
            <option value="Fnideq">Fnideq</option>
            <option value="Guelmim">Guelmim</option>
            <option value="Guercif">Guercif</option>
            <option value="Ifrane">Ifrane</option>
            <option value="Inezgane">Inezgane</option>
            <option value="Jerada">Jerada</option>
            <option value="Kénitra">Kénitra</option>
            <option value="Khémisset">Khémisset</option>
            <option value="Khénifra">Khénifra</option>
            <option value="Khouribga">Khouribga</option>
            <option value="Ksar El Kebir">Ksar El Kebir</option>
            <option value="Laâyoune">Laâyoune</option>
            <option value="Larache">Larache</option>
            <option value="Marrakech">Marrakech</option>
            <option value="Martil">Martil</option>
            <option value="M'diq">M'diq</option>
            <option value="Meknès">Meknès</option>
            <option value="Midelt">Midelt</option>
            <option value="Mohammédia">Mohammédia</option>
            <option value="Nador">Nador</option>
            <option value="Ouarzazate">Ouarzazate</option>
            <option value="Ouezzane">Ouezzane</option>
            <option value="Oujda">Oujda</option>
            <option value="Rabat">Rabat</option>
            <option value="Safi">Safi</option>
            <option value="Salé">Salé</option>
            <option value="Sefrou">Sefrou</option>
            <option value="Settat">Settat</option>
            <option value="Sidi Bennour">Sidi Bennour</option>
            <option value="Sidi Ifni">Sidi Ifni</option>
            <option value="Sidi Kacem">Sidi Kacem</option>
            <option value="Sidi Slimane">Sidi Slimane</option>
            <option value="Skhirat">Skhirat</option>
            <option value="Tanger">Tanger</option>
            <option value="Tan-Tan">Tan-Tan</option>
            <option value="Taourirt">Taourirt</option>
            <option value="Taounate">Taounate</option>
            <option value="Taroudant">Taroudant</option>
            <option value="Tata">Tata</option>
            <option value="Taza">Taza</option>
            <option value="Temara">Temara</option>
            <option value="Tétouan">Tétouan</option>
            <option value="Tifelt">Tifelt</option>
            <option value="Tinghir">Tinghir</option>
            <option value="Tiznit">Tiznit</option>
            <option value="Youssoufia">Youssoufia</option>
            <option value="Zagora">Zagora</option>
          </select>
        </div>

        {/* Car Description */}
        <div className='flex flex-col w-full'>
          <label className='font-medium'>Description *</label>
          <textarea
            rows={5}
            placeholder='e.g. A luxurious SUV with a spacious interior and a powerful engine. Perfect for family trips and long journeys...'
            required
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-colors resize-vertical'
            value={car.description}
            onChange={e => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-4 mt-4'>
          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md font-medium cursor-pointer transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dull'
              }`}
          >
            <img src={assets.tick_icon} alt="" className='h-4' />
            {isLoading ? 'Updating...' : 'Update Car'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/owner/manage-cars')}
            className='px-6 py-3 border border-borderColor text-gray-600 rounded-md font-medium hover:bg-gray-50 transition-colors'
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  )
}

export default EditCar