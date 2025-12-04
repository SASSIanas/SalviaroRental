import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
function Navbar() {

    const { setShowLogin, user, logout, isOwner, axios, setIsOwner, input, setInput } = useAppContext()

    const location = useLocation()

    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const changeRole = async () => {
        try {
            const { data } = await axios.post('/api/owner/change-role')
            if (data.success) {
                setIsOwner(true)
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className={`flex items-center justify-between px-6 md:px-16 lg:px-24
    xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all
    ${location.pathname === "/" && "bg-light "}`}>
            <Link to='/'>
                <img src={assets.logo} alt="logo" className='h-8' />
            </Link>
            <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16
        max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row
        items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all
        duration-300 z-50 ${location.pathname === "/" ? "bg-light " : "bg-white"}
        ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"} 
        
        `}>
                {menuLinks.map((link, index) => (
                    <Link onClick={() => setOpen(false)} key={index} to={link.path} >
                        {link.name}
                    </Link>
                ))}

                <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
                    {isOwner && (
                        <Link to="/owner">Dashboard</Link>
                    )}


                    <div>
                        <div className="relative inline-block group">
                            <button
                                onClick={() => { user ? navigate('/profile') : toast.error('please login') }}
                                className="cursor-pointer w-full px-8 py-2 bg-primary  hover:bg-primary-dull transition-all text-white rounded-lg"
                            >
                                Profile
                            </button>
                            <button
                                    onClick={() => { user ? logout() : setShowLogin(true) }}
                                    className="mt-2 w-full bg-primary sm:hidden hover:bg-primary-dull text-white rounded-lg py-2"
                                >
                                    {user ? 'Logout' : 'Login'}
                            </button>

                            <div
                                className="absolute hidden sm:block left-0 w-full sm:opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto"
                            >
                                <button
                                    onClick={() => { user ? logout() : setShowLogin(true) }}
                                    className="mt-2 w-full bg-primary hover:bg-primary-dull text-white rounded-lg py-2"
                                >
                                    {user ? 'Logout' : 'Login'}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <button className='sm:hidden cursor-pointer' aria-label='Menu' onClick={() =>
                setOpen(!open)
            }>
                <img src={open ? assets.close_icon : assets.menu_icon} alt='menu' />
            </button>

        </div>
    )
}

export default Navbar