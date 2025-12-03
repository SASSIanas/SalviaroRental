import React, { useState, useEffect, useCallback } from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Testimonial = () => {
    
    const { user, axios, setShowLogin,backendUrl,fetchUser } = useAppContext()
    const [image, setImage] = useState('')
    const [testimonials, setTestimonials] = useState([]);
    const [displayCount, setDisplayCount] = useState(6);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTestimonial, setNewTestimonial] = useState({
        testimonial: '',
        rating: 1,
    });
    const [expandedTestimonials, setExpandedTestimonials] = useState({});

    
    const updateImage = async () => {
        try {
            const formData = new FormData()
            formData.append('image', image)

            const {data} = await axios.post('/api/owner/update-image',
            formData)

            if (data.success) {
                fetchUser()
                toast.success(data.message)
                setImage('')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchTestimonials = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(backendUrl+`/api/testimonials?page=1&limit=50`);
            const data = await response.json();
            
            if (data.success) {
                setTestimonials(data.testimonials);
            }
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            toast.error('Error loading testimonials');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleShowMore = () => {
        setDisplayCount(prev => prev + 6);
    };

    const handleAddTestimonial = async (e) => {
        e.preventDefault();
        
        if (!user) {
            toast.error('Please login first');
            setShowLogin(true);
            return;
        }

        try {
            const { data } = await axios.post('/api/testimonials', newTestimonial);
            
            if (data.success) {
                toast.success('Testimonial added successfully');
                setNewTestimonial({
                    testimonial: '',
                    rating: 1,
                });
                setShowAddForm(false);
                fetchTestimonials();
                setDisplayCount(6);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error adding testimonial');
        }
    };

    const toggleExpand = (testimonialId) => {
        setExpandedTestimonials(prev => ({
            ...prev,
            [testimonialId]: !prev[testimonialId]
        }));
    };

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => (
            <img 
                className='w-4' 
                key={index} 
                src={assets.star_icon} 
                alt="star-icon"
                style={{ 
                    filter: index < rating ? 'none' : 'grayscale(100%) opacity(0.3)'
                }}
            />
        ));
    };

    const getProfileImage = (testimonial) => {
        if (testimonial.user?.image) {
            return testimonial.user.image;
        }
        if (testimonial.image) {
            return testimonial.image;
        }
        return assets.testimonial_image_1;
    };

    // حساب إذا النص يحتاج أكثر من 3 أسطر
    const needsReadMore = (text) => {
        // تقريباً 200 حرف أو 30-40 كلمة تعطي أكثر من 3 أسطر
        return text.length > 200 || text.split(' ').length > 40;
    };

    const displayedTestimonials = testimonials.slice(0, displayCount);
    const hasMore = displayCount < testimonials.length;

    return (
        <div className="pt-28 px-6 md:px-16 lg:px-24 xl:px-44">

            <Title title="What Our Customers Say" subTitle="Discover why discerning
            travelers choose StayVenture for their luxury accommodations around the
            world."/>

            {/* Add Testimonial Button */}
            <div className="text-center my-12">
                <button
                    onClick={() => {
                        if (!user) {
                            toast.error('Please login first');
                            setShowLogin(true);
                            return;
                        }
                        setShowAddForm(true);
                    }}
                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Add Your Review
                </button>
            </div>

            {/* Add Testimonial Form */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Add Your Review</h2>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="text-gray-500 hover:text-black"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleAddTestimonial} className="space-y-4">

        <div>
  <div className='relative'>
    <div className='group relative'>
      <label htmlFor="image">
        <img 
          src={image ? URL.createObjectURL(image) : user?.image || assets.testimonial_image_1} 
          alt="" 
          className='h-24 w-24 rounded-full object-cover mx-auto border-2 border-gray-200'
        />
        <input 
          type="file" 
          id='image' 
          accept='image/*' 
          hidden 
          onChange={e => setImage(e.target.files[0])} 
        />
        <div className='absolute h-24 w-24 top-0 left-0 right-0 bottom-0 mx-auto bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer hidden'>
          <img src={assets.edit_icon} alt="" className='h-5 w-5'/>
        </div>
      </label>
    </div>

    {image && (
      <button 
        className='absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer'
        onClick={updateImage}
      >
        Save <img src={assets.check_icon} width={13} alt="" />
      </button>
    )}
  </div>

  <label className="block text-sm font-medium text-gray-700 mb-1">
    Rating
  </label>
  <div className="flex space-x-1">
    {Array(5).fill(0).map((_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= newTestimonial.rating;
      
      return (
        <button
          key={index}
          type="button"
          onClick={() => setNewTestimonial(prev => ({ ...prev, rating: starValue }))}
          className="transition-transform hover:scale-110"
        >
          <img 
            className='w-6' 
            src={assets.star_icon} 
            alt="star-icon"
            style={{ filter: isFilled ? 'none' : 'grayscale(100%) opacity(0.3)' }}
          />
        </button>
      );
    })}
  </div>
  <p className="text-sm text-gray-500 mt-1">
    {newTestimonial.rating} out of 5 stars
  </p>
</div>


                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Review
                                </label>
                                <textarea
                                    value={newTestimonial.testimonial}
                                    onChange={(e) => setNewTestimonial(prev => ({
                                        ...prev,
                                        testimonial: e.target.value
                                    }))}
                                    required
                                    rows="4"
                                    maxLength={300}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none"
                                    placeholder="Share your experience with our service..."
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {displayedTestimonials.map((testimonial, index) => {
                    const isExpanded = expandedTestimonials[testimonial._id];
                    const shouldShowReadMore = needsReadMore(testimonial.testimonial);

                    return (
                        <div key={testimonial._id || index} className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">
     <div className="flex items-center gap-3">
  <img 
    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" 
    src={getProfileImage(testimonial)} 
    alt={testimonial.name} 
  />
  <div>
    <p className="text-xl">{testimonial.name}</p>
  </div>
</div>

                            <div className="flex items-center gap-1 mt-4">
                                {renderStars(testimonial.rating)}
                            </div>
                            
                            {/* النص مع line-clamp-3 كـdefault */}
                            <div className="mt-4">
                                <div 
                                    className={`text-gray-500 font-light leading-relaxed break-words whitespace-normal ${
                                        !isExpanded && shouldShowReadMore 
                                            ? 'overflow-hidden' 
                                            : ''
                                    }`}
                                    style={{
                                        display: !isExpanded && shouldShowReadMore ? '-webkit-box' : 'block',
                                        WebkitLineClamp: !isExpanded && shouldShowReadMore ? 3 : 'unset',
                                        WebkitBoxOrient: !isExpanded && shouldShowReadMore ? 'vertical' : 'unset'
                                    }}
                                >
                                    "{testimonial.testimonial}"
                                
                                </div>
                                {/* Read More Button - يظهر فقط إذا النص يحتاج أكثر من 3 أسطر */}
                                {shouldShowReadMore && (
                                    <div
                                        onClick={() => toggleExpand(testimonial._id)}
                                        className="text-gray-500 font-light hover:underline mt-2"
                                    >
                                        {isExpanded ? 'read less' : 'read more "'}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Show More Button */}
            {hasMore && (
                <div className="text-center mt-12">
                    <button
                        onClick={handleShowMore}
                        className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Show More Reviews ({testimonials.length - displayCount} remaining)
                    </button>
                </div>
            )}

            {/* Loading Indicator */}
            {loading && (
                <div className="flex justify-center mt-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                </div>
            )}

            {/* No More Testimonials Message */}
            {!hasMore && testimonials.length > 0 && (
                <div className="text-center mt-8 text-gray-500">
                    All testimonials loaded
                </div>
            )}

            {/* No Testimonials Message */}
            {testimonials.length === 0 && !loading && (
                <div className="text-center mt-8 text-gray-500">
                    No testimonials yet. Be the first to share your experience!
                </div>
            )}
        </div>
    )
}

export default Testimonial