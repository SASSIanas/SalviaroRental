import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
import CarDetails from './pages/CarDetails'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import AddCar from './pages/owner/AddCar'
import ManageCars from './pages/owner/ManageCars'
import ManageBookings from './pages/owner/ManageBookings'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import HelpCenter from './pages/HelpCenter'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Insurance from './pages/Insurance'

function App() {
  const {showLogin} = useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith('/owner')


  return (
    <>
    <Toaster/>
    {showLogin && <Login/>}
      {!isOwnerPath && <Navbar/>}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/car-details/:id' element={<CarDetails />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/about-us' element={<AboutUs/>} />
        <Route path='/contact-us' element={<ContactUs/>} />
        <Route path='/help-center' element={<HelpCenter/>} />
        <Route path='/terms-of-service' element={<Terms/>} />
        <Route path='/privacy-policy' element={<Privacy/>} />
        <Route path='/insurance' element={<Insurance/>} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/owner' element={<Layout />}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-car' element={<AddCar/>}/>
          <Route path='manage-cars' element={<ManageCars/>}/>
          <Route path='manage-bookings' element={<ManageBookings/>}/>
        </Route>
      </Routes>
      
      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App