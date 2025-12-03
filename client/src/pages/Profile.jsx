import React, { useState, useEffect } from 'react'
import Title from '../components/owner/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { assets } from '../assets/assets'

const Profile = () => {
  const { user, axios, setUser } = useAppContext()
  const [name, setName] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setImagePreview(user.image || '')
    }
  }, [user])

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // Upload profile image
  const handleImageUpload = async () => {
    if (!image) {
      toast.error('Please select an image')
      return
    }

    setImageLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)

      const response = await axios.post('/api/owner/update-image', formData)
      if (response.data.success) {
        const updatedUser = { ...user, image: response.data.imageUrl || imagePreview }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
        toast.success('Profile image updated successfully')
        setImage(null)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating image')
    } finally {
      setImageLoading(false)
    }
  }

  const handleNameUpdate = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      toast.error('Name is required')
      return
    }

    setLoading(true)
    try {
      const response = await axios.put('/api/user/update-name', { name })
      if (response.data.success) {
        const updatedUser = { ...user, name }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
        toast.success('Name updated successfully')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating name')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('All fields are required')
      return
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const response = await axios.put('/api/user/update-password', {
        currentPassword,
        newPassword
      })
      
      if (response.data.success) {
        toast.success('Password updated successfully')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='ppx-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>
      <Title title={'Profile Settings'} subTitle={'Manage your personal information'}/>
      <div className='py-10'>
        
        {/* Profile Image Upload */}
        <div className='flex flex-col gap-4 py-4 border-b border-gray-200 pb-6'>
          <h1 className='text-lg font-semibold text-gray-800'>Profile Image</h1>
          <div className='flex items-center gap-6'>
            <div className='relative'>
              <img 
                src={imagePreview || assets.testimonial_image_1} 
                alt="Profile" 
                className='h-24 w-24 rounded-full object-cover border-2 border-gray-200'
              />
              <label htmlFor="profile-image" className='absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer hover:bg-primary-dull transition-colors'>
                <img src={assets.edit_icon} alt="Edit" className='h-4 w-4' />
              </label>
              <input 
                type="file" 
                id="profile-image" 
                accept='image/*' 
                hidden 
                onChange={handleImageChange}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-sm text-gray-600'>Upload a profile picture</p>
              <button 
                onClick={handleImageUpload}
                disabled={!image || imageLoading}
                className='px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed w-max'
              >
                {imageLoading ? 'Uploading...' : 'Update Image'}
              </button>
            </div>
          </div>
        </div>

        {/* Edit Name */}
        <div className='flex flex-col gap-4 py-4 border-b border-gray-200 pb-6'>
          <h1 className='text-lg font-semibold text-gray-800'>Edit Your Name</h1>
          <form onSubmit={handleNameUpdate} className='flex gap-2 items-center flex-wrap'>
            <input 
              type="text" 
              placeholder='Your full name' 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border border-slate-300 px-3 py-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-slate-500' 
            />
            <button 
              type="submit"
              disabled={loading}
              className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400'
            >
              {loading ? 'Updating...' : 'Update Name'}
            </button>
          </form>
        </div>
        
        {/* Edit Password */}
        <div className='flex flex-col gap-4 py-4'>
          <h1 className='text-lg font-semibold text-gray-800'>Change Your Password</h1>
          <form onSubmit={handlePasswordUpdate} className='flex flex-col gap-4 max-w-md'>
            <div className='flex flex-col gap-1'>
              <label className='text-sm text-gray-600'>Current Password</label>
              <input 
                type="password" 
                placeholder='Enter current password' 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className='border border-slate-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500' 
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-sm text-gray-600'>New Password</label>
              <input 
                type="password" 
                placeholder='Enter new password' 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='border border-slate-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500' 
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-sm text-gray-600'>Confirm New Password</label>
              <input 
                type="password" 
                placeholder='Confirm new password' 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='border border-slate-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500' 
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 self-start'
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile