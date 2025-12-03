// pages/Profiles.jsx
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import Title from '../components/Title'

const Profiles = () => {
    const { axios } = useAppContext()
    const navigate = useNavigate()
    const [owners, setOwners] = useState([])
    const [filteredOwners, setFilteredOwners] = useState([])
    const [loading, setLoading] = useState(true)
    const [input, setInput] = useState('')

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const { data } = await axios.get('/api/user/owners/all')
                if (data.success) {
                    setOwners(data.owners)
                    setFilteredOwners(data.owners)
                }
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchOwners()
    }, [axios])

    // دالة التصفية
    const applyFilter = () => {
        if (input === '') {
            setFilteredOwners(owners)
            return
        }

        const filtered = owners.filter((owner) => {
            return owner.name.toLowerCase().includes(input.toLowerCase()) ||
                (owner.rentalBusinessName && owner.rentalBusinessName.toLowerCase().includes(input.toLowerCase())) ||
                (owner.rentalAddress && owner.rentalAddress.toLowerCase().includes(input.toLowerCase())) ||
                owner.email.toLowerCase().includes(input.toLowerCase())
        })
        setFilteredOwners(filtered)
    }

    useEffect(() => {
        owners.length > 0 && applyFilter()
    }, [input, owners])

    if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>

    return (
        <div>
            {/* Header with Search - نفس تصميم Cars.jsx */}
            <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
                <Title 
                    title='Car Owners & Rental Businesses' 
                    subTitle='Browse our community of trusted car owners and rental providers'
                />

                <div className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'>
                    <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2'/>
                    
                    <input 
                        onChange={(e) => setInput(e.target.value)} 
                        value={input} 
                        type="text" 
                        placeholder='Search by name, business name, location, or email...'
                        className='w-full h-full outline-none text-gray-500'
                    />

                    <img src={assets.filter_icon} alt="" className='w-4.5 h-4.5 ml-2'/>
                </div>
            </div>

            {/* Owners List */}
            <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
                <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto mb-6'>
                    Showing {filteredOwners.length} owner{filteredOwners.length !== 1 ? 's' : ''}
                </p>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:px-20 max-w-7xl mx-auto'>
                    {filteredOwners.map((owner) => (
                        <div 
                            key={owner._id}
                            onClick={() => navigate(`/profiles/${owner._id}`)}
                            className='bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow border border-gray-100'
                        >
                            <div className='flex items-center gap-4'>
                                <img 
                                    src={owner.image || assets.testimonial_image_1} 
                                    alt={owner.name}
                                    className='w-16 h-16 rounded-full object-cover border border-gray-200'
                                />
                                <div className='flex-1'>
                                    <h3 className='font-semibold text-lg text-gray-800'>{owner.name}</h3>
                                    
                                    {owner.rentalBusinessName && (
                                        <p className='text-primary font-medium text-sm mt-1'>
                                            {owner.rentalBusinessName}
                                        </p>
                                    )}
                                    
                                    {owner.rentalAddress && (
                                        <p className='text-gray-600 text-xs mt-1 flex items-center gap-1'>
                                            <img src={assets.location_icon} className='w-3 h-3' alt="" />
                                            {owner.rentalAddress}
                                        </p>
                                    )}
                                    
                                    <p className='text-gray-500 text-xs mt-2'>{owner.email}</p>
                                </div>
                            </div>

                            {/* Badge for business owners */}
                            {owner.rentalBusinessName && (
                                <div className='mt-4 flex justify-between items-center'>
                                    <span className='px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full'>
                                        Business Account
                                    </span>
                                    <span className='text-xs text-gray-400 cursor-pointer hover:text-primary'>
                                        View Cars →
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {filteredOwners.length === 0 && (
                    <div className="text-center py-12 xl:px-20 max-w-7xl mx-auto">
                        <p className="text-gray-500 text-lg">No owners found</p>
                        {input && (
                            <p className="text-gray-400 text-sm mt-2">
                                Try adjusting your search terms
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profiles